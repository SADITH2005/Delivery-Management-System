<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-dark text-white relative-position overflow-hidden">
         
         <!-- Three.js Background -->
         <ThreeBackground class="fixed-full z-0" />
         <!-- Dark Overlay -->
         <div class="fixed-full z-0" style="background: radial-gradient(circle at center, transparent 0%, #0a192f 90%); pointer-events: none;"></div>
         
         <div class="row justify-center items-center full-height z-10 w-full">
             <transition appear enter-active-class="animated fadeInLeft">
                 <q-card class="bg-dark-glass q-pa-lg shadow-24 relative-position" style="width: 100%; max-width: 450px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    
                    <!-- Home Button (Inside Card) -->
                    <q-btn round flat icon="home" color="white" class="absolute-top-left q-ma-md z-top" to="/" />

                    <div class="text-center q-mb-xl">
                        <!-- Icon Color Changed to WHITE as requested -->
                        <q-icon name="local_shipping" size="3em" color="white" class="q-mb-md" />
                        <div class="text-h4 text-weight-bold text-white">Welcome Back</div>
                        <div class="text-grey-4 q-mt-sm">Sign in to continue</div>
                    </div>

                    <!-- Toggle User Type - Clean (No Box) -->
                     <div class="q-mb-lg flex no-wrap justify-center q-gutter-x-md">
                        <q-btn 
                            class="q-px-xl q-py-sm text-weight-bold transition-all" 
                            :class="userType === 'customer' ? 'bg-primary text-white shadow-glow' : 'text-grey-5 bg-transparent'" 
                            label="Customer" 
                            @click="userType = 'customer'"
                            unelevated
                            rounded
                            no-caps
                        />
                         <q-btn 
                            class="q-px-xl q-py-sm text-weight-bold transition-all" 
                            :class="userType === 'employee' ? 'bg-primary text-white shadow-glow' : 'text-grey-5 bg-transparent'" 
                            label="Employee" 
                            @click="userType = 'employee'"
                            unelevated
                            rounded
                            no-caps
                        />
                     </div>

                    <q-form @submit="onSubmit" class="q-gutter-md">
                        
                        <!-- Employee Login -->
                        <div v-if="userType === 'employee'" class="animated fadeIn">
                            <q-input 
                                dark 
                                filled 
                                v-model="form.employeeId" 
                                label="Employee ID (e.g. EMP-1001)" 
                                color="primary"
                                label-color="grey-4"
                                class="text-weight-medium"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="badge" color="grey-5" />
                                </template>
                            </q-input>
                        </div>

                        <!-- Customer Login -->
                        <div v-if="userType === 'customer'" class="animated fadeIn">
                            <q-input 
                                dark 
                                filled 
                                v-model="form.identifier" 
                                label="Email or Phone Number" 
                                color="primary"
                                label-color="grey-4"
                                class="text-weight-medium"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" color="grey-5" />
                                </template>
                            </q-input>
                        </div>

                        <!-- Password (Common) -->
                         <q-input 
                            dark 
                            filled 
                            v-model="form.password" 
                            :type="showPassword ? 'text' : 'password'"
                            label="Password" 
                            color="primary"
                            label-color="grey-4"
                             class="text-weight-medium"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" color="grey-5" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="showPassword ? 'visibility' : 'visibility_off'"
                                    class="cursor-pointer"
                                    @click="showPassword = !showPassword"
                                    color="grey-5"
                                />
                            </template>
                        </q-input>

                        <div class="row justify-between items-center text-caption q-mt-sm">
                            <q-checkbox v-model="rememberMe" label="Remember me" dark color="primary" dense />
                            <a href="#" class="text-primary text-weight-bold hover-underline" style="text-decoration: none">Forgot Password?</a>
                        </div>

                        <q-btn 
                            label="Login" 
                            type="submit" 
                            color="primary" 
                            size="lg" 
                            class="full-width q-mt-lg text-bold shadow-10" 
                            rounded 
                            no-caps 
                            :loading="loading"
                        />
                    </q-form>

                    <div class="text-center q-mt-lg text-grey-4">
                        Don't have an account? 
                        <router-link to="/register" class="text-primary text-weight-bold hover-underline" style="text-decoration: none">Register Now</router-link>
                    </div>
                 </q-card>
             </transition>
         </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ThreeBackground from 'components/ThreeBackground.vue'
import { useAuthStore } from 'stores/auth'
import { useQuasar } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

// State
const userType = ref('customer') // 'customer' | 'employee'
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

// Form
const form = reactive({
    identifier: '', // Email or Phone for Customer
    employeeId: '', // For Employee
    password: ''
})

const onSubmit = async () => {
    loading.value = true
    
    // Employee Login
    if (userType.value === 'employee') {
        // In a real app, Employee ID might map to an email, or we sign in with (ID + @dms.com).
        // For this system, let's assume the Auth Store handles the logic of finding the email via ID,
        // OR the user enters Email for login even if they are an employee (but the UI asks for ID?).
        
        // CORRECTION based on common firebase patterns:
        // You generally need Email/Pass. 
        // User Requirement: "Role-Based... based solely on the format or value of the assigned Employee ID during login."
        // This implies they LOGIN with the ID. 
        // Strategy: Append a domain to ID to make it an email -> `EMP001@dms.internal` (Hidden from user).
        
        const fakeEmail = `${form.employeeId}@dms.internal`
        const result = await authStore.login(fakeEmail, form.password)
        handleLoginResult(result)

    } else {
        // Customer Login (Email or Phone)
        // If phone, simulate email lookup or use phone auth. For now assume Email.
        const result = await authStore.login(form.identifier, form.password)
        handleLoginResult(result)
    }
}

const handleLoginResult = (result) => {
    loading.value = false
    if (result.success) {
        $q.notify({ type: 'positive', message: `Welcome back!` })
        if (result.role === 'admin') router.push('/admin')
        else if (result.role === 'employee') router.push('/employee-dashboard')
        else router.push('/')
    } else {
        $q.notify({ type: 'negative', message: result.message })
    }
}
</script>

<style scoped>
.bg-dark-glass {
    background: rgba(16, 26, 43, 0.85);
    backdrop-filter: blur(20px);
}
.z-top { z-index: 1000; }
.z-10 { z-index: 10; }
.shadow-glow { box-shadow: 0 0 15px rgba(33, 150, 243, 0.5); }
.transition-all { transition: all 0.3s ease; }
.hover-underline:hover { text-decoration: underline !important; }
.w-full { width: 100%; }
</style>
