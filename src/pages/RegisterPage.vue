<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-dark text-white relative-position overflow-hidden">
         
         <!-- Three.js Background -->
         <ThreeBackground class="fixed-full z-0" />
         <!-- Dark Overlay -->
         <div class="fixed-full z-0" style="background: radial-gradient(circle at center, transparent 0%, #0a192f 90%); pointer-events: none;"></div>
         
         <div class="row justify-center items-center full-height z-10 w-full">
             <transition appear enter-active-class="animated fadeInRight">
                 <q-card class="bg-dark-glass q-pa-lg shadow-24 relative-position" style="width: 100%; max-width: 500px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    
                    <!-- Home Button (Inside Card) -->
                    <q-btn round flat icon="home" color="white" class="absolute-top-right q-ma-md z-top" to="/" />

                    <div class="text-center q-mb-lg">
                        <q-icon name="person_add" size="3em" color="secondary" class="q-mb-md" />
                        <div class="text-h4 text-weight-bold text-white">Create Account</div>
                        <div class="text-grey-4 q-mt-sm">Join the network today</div>
                    </div>

                    <!-- Toggle User Type - Clean (No Box) -->
                     <div class="q-mb-lg flex no-wrap justify-center q-gutter-x-md">
                        <q-btn 
                            class="q-px-xl q-py-sm text-weight-bold transition-all" 
                            :class="userType === 'customer' ? 'bg-secondary text-white shadow-glow' : 'text-grey-5 bg-transparent'" 
                            label="Customer" 
                            @click="userType = 'customer'"
                            unelevated
                            rounded
                            no-caps
                        />
                         <q-btn 
                            class="q-px-xl q-py-sm text-weight-bold transition-all" 
                            :class="userType === 'employee' ? 'bg-secondary text-white shadow-glow' : 'text-grey-5 bg-transparent'" 
                            label="Employee" 
                            @click="userType = 'employee'"
                            unelevated
                            rounded
                            no-caps
                        />
                     </div>

                    <q-form @submit="onSubmit" class="q-gutter-md">
                        
                        <!-- Common Fields -->
                        <div class="row q-col-gutter-sm">
                            <div class="col-12 col-md-6">
                                <q-input dark filled v-model="form.firstName" label="First Name" color="secondary" label-color="grey-4" />
                            </div>
                             <div class="col-12 col-md-6">
                                <q-input dark filled v-model="form.lastName" label="Last Name" color="secondary" label-color="grey-4" />
                            </div>
                        </div>

                        <!-- Employee Specific -->
                        <div v-if="userType === 'employee'" class="animated fadeIn">
                            <q-input 
                                dark 
                                filled 
                                v-model="form.employeeId" 
                                label="Employee ID *" 
                                hint="Required for verification"
                                color="secondary"
                                label-color="grey-4"
                                :rules="[val => !!val || 'Employee ID is required']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="badge" color="grey-5" />
                                </template>
                            </q-input>
                             <q-input dark filled v-model="form.department" label="Department" color="secondary" label-color="grey-4" class="q-mt-md" />
                        </div>

                        <!-- Customer Specific -->
                        <div v-if="userType === 'customer'" class="animated fadeIn">
                            <q-input 
                                dark 
                                filled 
                                v-model="form.email" 
                                label="Email Address" 
                                type="email"
                                color="secondary"
                                label-color="grey-4"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="email" color="grey-5" />
                                </template>
                            </q-input>
                            <q-input 
                                dark 
                                filled 
                                v-model="form.phone" 
                                label="Phone Number" 
                                type="tel"
                                color="secondary"
                                label-color="grey-4"
                                class="q-mt-md"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="phone" color="grey-5" />
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
                            color="secondary"
                            label-color="grey-4"
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
                         <q-input 
                            dark 
                            filled 
                            v-model="form.confirmPassword" 
                            :type="showConfirmPassword ? 'text' : 'password'"
                            label="Confirm Password" 
                            color="secondary"
                            label-color="grey-4"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock_clock" color="grey-5" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                                    class="cursor-pointer"
                                    @click="showConfirmPassword = !showConfirmPassword"
                                    color="grey-5"
                                />
                            </template>
                        </q-input>

                        <q-btn 
                            label="Register Account" 
                            type="submit" 
                            color="secondary" 
                            size="lg" 
                            class="full-width q-mt-lg text-bold shadow-10" 
                            rounded 
                            no-caps 
                            :loading="loading"
                        />
                    </q-form>

                    <div class="text-center q-mt-lg text-grey-4">
                        Already have an account? 
                        <router-link to="/login" class="text-secondary text-weight-bold hover-underline" style="text-decoration: none">Login Here</router-link>
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

const router = useRouter()
const userType = ref('customer')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    password: '',
    confirmPassword: ''
})

const onSubmit = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        console.log('Registered as:', userType.value, form)
        router.push('/login')
    }, 1500)
}
</script>

<style scoped>
.bg-dark-glass {
    background: rgba(16, 26, 43, 0.85);
    backdrop-filter: blur(20px);
}
.z-top { z-index: 1000; }
.z-10 { z-index: 10; }
.shadow-glow { box-shadow: 0 0 15px rgba(38, 166, 154, 0.5); }
.transition-all { transition: all 0.3s ease; }
.hover-underline:hover { text-decoration: underline !important; }
.w-full { width: 100%; }
</style>
