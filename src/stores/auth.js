import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', () => {
    // --- State ---
    const user = ref(null); // Current user object
    const userProfile = ref(null); // Additional profile data from Firestore
    const loading = ref(false);
    const error = ref(null);

    // --- Actions ---

    /**
     * Initializes Auth Listener to keep user session synced
     */
    const initAuth = () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                user.value = currentUser;
                // Fetch extra profile data
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    userProfile.value = docSnap.data();
                }
            } else {
                user.value = null;
                userProfile.value = null;
            }
        });
    };

    /**
     * Verify if an Employee ID is valid.
     * In a real backend, this would check a pre-populated 'allowed_employees' collection
     * where Admin has already saved the IDs.
     */
    const verifyEmployeeId = async (id) => {
        try {
            // For MVP (and since we don't have Admin panel yet to add IDs), 
            // we will simulate a check OR check a collection if it existed.
            // Let's assume there is a collection 'valid_employee_ids' 
            // But since the user wants Manual ID assignment, we can allow ANY ID 
            // as long as it's not taken by another Registered User.
            
            // Check if this ID is already assigned to a user profile
            const q = query(collection(db, "users"), where("employeeId", "==", id));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                return { valid: false, message: 'Employee ID is already registered.' };
            }
            
            // If we want to strictly only allow IDs that Admin Created beforehand:
            // const idRef = doc(db, 'allowed_ids', id);
            // const idSnap = await getDoc(idRef);
            // if (!idSnap.exists()) return { valid: false, message: 'Invalid Employee ID.' };

            return { valid: true };
        } catch (e) {
            console.error(e);
            return { valid: false, message: 'Verification failed.' };
        }
    };

    /**
     * Register a new user
     */
    const register = async (userData) => {
        loading.value = true;
        error.value = null;

        try {
            // HARDCODED ADMIN FOR SETUP
            if (userData.email === 'sadithrashmika05@gmail.com') {
                userData.role = 'admin';
            }

            // 1. Create Auth User
            const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            
            // 2. Prepare Profile Data
            const profileData = {
                uid: res.user.uid,
                email: userData.email,
                displayName: userData.name,
                role: userData.role,
                phone: userData.phone || '',
                createdAt: new Date()
            };

            // Employee Specifics
            if (userData.role === 'employee') {
                profileData.employeeId = userData.employeeId;
                profileData.department = userData.department;
                profileData.status = "active";
            }

            // 3. Save to Firestore
            await setDoc(doc(db, 'users', res.user.uid), profileData);
            
            userProfile.value = profileData;
            loading.value = false;
            return { success: true };

        } catch (e) {
            loading.value = false;
            error.value = e.message;
            // Handle common firebase errors
            if (e.code === 'auth/email-already-in-use') {
                return { success: false, message: 'Email is already in use.' };
            }
            return { success: false, message: e.message };
        }
    };

    /**
     * Login logic
     */
    const login = async (email, password) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            user.value = res.user;
            
            // Fetch Role
            const docRef = doc(db, 'users', res.user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                userProfile.value = docSnap.data();
                loading.value = false;
                return { success: true, role: userProfile.value.role };
            } else {
                loading.value = false;
                return { success: true, role: 'customer' }; // Default fallback
            }

        } catch (e) {
            loading.value = false;
            error.value = e.message;
            if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
                return { success: false, message: "Invalid credentials" };
            }
            return { success: false, message: e.message };
        }
    };

    const logout = async () => {
        await signOut(auth);
        user.value = null;
        userProfile.value = null;
    };

    return {
        user,
        userProfile,
        loading,
        error,
        initAuth,
        register,
        login,
        logout,
        verifyEmployeeId
    };
});
