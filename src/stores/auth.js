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
            // 1. Check if this ID is already assigned to a registered user
            const qUser = query(collection(db, "users"), where("employeeId", "==", id));
            const userSnapshot = await getDocs(qUser);
            
            if (!userSnapshot.empty) {
                return { valid: false, message: 'Employee ID is already registered.' };
            }
            
            // 2. Check if the ID exists in the 'valid_employee_ids' whitelist
            // We search where 'id' field matches the input ID (assuming documents are not named by ID, but have an ID field)
            // Or we can assume document ID IS the employee ID. Let's assume field 'id' for flexibility.
            const qValid = query(collection(db, "valid_employee_ids"), where("id", "==", id));
            const validSnapshot = await getDocs(qValid);

            if (validSnapshot.empty) {
                return { valid: false, message: 'Invalid Employee ID (Not found in system).' };
            }
            
            // Optional: Check if the valid ID is marked as 'used' (though step 1 covers registered users)
            const idData = validSnapshot.docs[0].data();
            if (idData.status === 'used') {
                 return { valid: false, message: 'Employee ID has already been used.' };
            }

            return { valid: true, role: idData.role || 'employee' };
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
            
            // 4. If Employee, mark the ID as used in the whitelist
            // We need to find the doc id first because we stored it with auto-id or custom-id
            if (userData.role === 'employee' || userData.role === 'driver' || userData.role === 'logistics') {
                 // We query by the 'id' field
                 const qValid = query(collection(db, "valid_employee_ids"), where("id", "==", userData.employeeId));
                 const validSnapshot = await getDocs(qValid);
                 if (!validSnapshot.empty) {
                     const validDocId = validSnapshot.docs[0].id;
                     await setDoc(doc(db, "valid_employee_ids", validDocId), { status: 'used' }, { merge: true });
                 }
            }
            
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
