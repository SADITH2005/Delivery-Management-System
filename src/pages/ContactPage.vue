<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="bg-dark text-white relative-position overflow-hidden">
        
        <!-- Three.js Background -->
        <ThreeBackground class="fixed-full z-0" />
        
        <!-- Content Overlay -->
        <div class="absolute-full z-1 " style="background: radial-gradient(circle at center, transparent 0%, #0a192f 90%); pointer-events: none;"></div>

         <!-- Back to Home -->
         <q-btn flat icon="arrow_back" label="Home" color="white" class="absolute-top-left q-ma-md z-top" to="/" no-caps />

        <div class="row items-center justify-center full-height full-width relative-position z-10 q-pa-md" style="min-height: 100vh">
             <div class="col-12 col-md-10 col-lg-8">
                 <div class="row q-col-gutter-xl items-center">
                     
                     <!-- Left Side: Info -->
                     <div class="col-12 col-md-6 text-center text-md-left">
                         <transition appear enter-active-class="animated fadeInLeft">
                             <div>
                                 <div class="text-primary text-uppercase text-bold tracking-widest q-mb-md">Get in touch</div>
                                 <div class="text-h2 text-weight-bolder q-mb-lg">We'd love to <br> hear from you</div>
                                 <p class="text-grey-4 text-h6 text-weight-regular q-mb-xl" style="line-height: 1.6">
                                     Have a question about our services? Our team is ready to help you scale your logistics operations.
                                 </p>

                                 <div class="q-gutter-y-lg q-mb-xl">
                                     <div class="row items-center justify-center justify-md-start no-wrap">
                                         <div class="icon-box bg-dark-glass q-mr-md flex-shrink-0">
                                             <q-icon name="email" color="primary" size="24px" />
                                         </div>
                                         <div class="text-h6">contact@dms-logistics.com</div>
                                     </div>
                                     <div class="row items-center justify-center justify-md-start no-wrap">
                                         <div class="icon-box bg-dark-glass q-mr-md flex-shrink-0">
                                             <q-icon name="phone" color="secondary" size="24px" />
                                         </div>
                                         <div class="text-h6">+1 (555) 123-4567</div>
                                     </div>
                                      <div class="row items-center justify-center justify-md-start no-wrap">
                                         <div class="icon-box bg-dark-glass q-mr-md flex-shrink-0">
                                             <q-icon name="location_on" color="accent" size="24px" />
                                         </div>
                                         <div class="text-h6">123 Logistics Way, Tech City</div>
                                     </div>
                                 </div>
                             </div>
                         </transition>
                     </div>

                     <!-- Right Side: Form -->
                     <div class="col-12 col-md-6">
                         <transition appear enter-active-class="animated fadeInRight">
                             <q-card class="bg-dark-glass q-pa-xl shadow-24" style="border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                                <div class="text-h4 text-weight-bold q-mb-lg">Send Message</div>
                                
                                <q-form @submit="onSubmit" class="q-gutter-md">
                                    <q-input dark filled v-model="form.name" label="Your Name" color="primary">
                                        <template v-slot:prepend><q-icon name="person" color="grey-5" /></template>
                                    </q-input>
                                    <q-input dark filled v-model="form.email" label="Email Address" type="email" color="primary">
                                        <template v-slot:prepend><q-icon name="email" color="grey-5" /></template>
                                    </q-input>
                                    <q-input dark filled v-model="form.subject" label="Subject" color="primary">
                                        <template v-slot:prepend><q-icon name="tag" color="grey-5" /></template>
                                    </q-input>
                                    <q-input dark filled v-model="form.message" label="Message" type="textarea" rows="4" color="primary" />

                                    <q-btn label="Send Message" type="submit" color="primary" size="lg" rounded no-caps class="full-width q-mt-md shadow-10" :loading="loading" />
                                </q-form>
                             </q-card>
                         </transition>
                     </div>
                 </div>
             </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ThreeBackground from 'components/ThreeBackground.vue'

// Form Logic
const loading = ref(false)
const form = reactive({ name: '', email: '', subject: '', message: '' })

const onSubmit = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        alert('Message Sent!')
        form.name = ''; form.email = ''; form.subject = ''; form.message = '';
    }, 1500)
}
</script>

<style scoped>
.bg-dark-glass {
    background: rgba(16, 26, 43, 0.7);
    backdrop-filter: blur(20px);
}
.z-top { z-index: 1000; }
.z-10 { z-index: 10; }
.icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.1);
}
.tracking-widest { letter-spacing: 3px; }
.flex-shrink-0 { flex-shrink: 0; }
</style>
