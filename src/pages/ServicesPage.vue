<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="bg-dark text-white relative-position overflow-hidden flex flex-center">
        
        <!-- Three.js Background -->
        <ThreeBackground class="fixed-full z-0" />
        
        <!-- Content Overlay -->
        <div class="absolute-full z-1 " style="background: radial-gradient(circle at center, transparent 0%, #0a192f 90%); pointer-events: none;"></div>

         <!-- Navbar -->
        <div class="row items-center justify-between q-px-xl q-py-md fixed-top z-top bg-dark-glass-nav">
          <div class="col-auto row items-center cursor-pointer" @click="$router.push('/')">
            <q-icon name="local_shipping" size="2.8em" color="white" class="q-mr-sm" />
            <div class="text-h5 text-bold text-white tracking-wide">DMS</div>
          </div>

          <div class="col gt-sm row justify-center">
              <div class="row items-center q-gutter-x-lg q-px-lg q-py-sm">
                <q-btn flat label="Home" color="white" no-caps class="text-weight-medium nav-link" to="/" />
                <q-btn flat label="Services" color="white" no-caps class="text-weight-medium nav-link" to="/services" />
                <q-btn flat label="Pricing" color="white" no-caps class="text-weight-medium nav-link" to="/pricing" />
                <q-btn flat label="Contact Us" color="white" no-caps class="text-weight-medium nav-link" to="/contact" />
                
                <div class="q-mx-sm bg-grey-7" style="width: 1px; height: 20px"></div>
                
                <q-btn flat label="Login" color="white" no-caps class="text-weight-bold" to="/login" />
                <q-btn unelevated label="Register" color="primary" text-color="white" no-caps class="text-weight-bold shadow-2 btn-glow" padding="6px 20px" rounded to="/register" />
              </div>
          </div>

           <div class="col-auto gt-sm" style="width: 120px"></div>

           <!-- Mobile Menu Button -->
           <div class="lt-md col-auto">
               <q-btn flat icon="menu" color="white" @click="mobileMenuOpen = !mobileMenuOpen" />
           </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <transition name="fade">
            <div v-if="mobileMenuOpen" class="fixed-full bg-dark z-max flex flex-center column">
                <q-btn icon="close" flat color="white" size="lg" class="absolute-top-right q-ma-md" @click="mobileMenuOpen = false" />
                
                <div class="q-gutter-y-lg text-center flex column">
                    <div class="text-h4 text-bold q-mb-xl">Menu</div>
                    <q-btn flat label="Home" color="white" size="xl" no-caps to="/" @click="mobileMenuOpen = false" />
                    <q-btn flat label="Services" color="white" size="xl" no-caps to="/services" @click="mobileMenuOpen = false" />
                    <q-btn flat label="Pricing" color="white" size="xl" no-caps @click="mobileMenuOpen = false" />
                    <q-btn flat label="Contact Us" color="white" size="xl" no-caps to="/contact" @click="mobileMenuOpen = false" />
                    <q-btn flat label="Login" color="primary" size="xl" no-caps to="/login" @click="mobileMenuOpen = false" />
                    <q-btn outline label="Register" color="white" size="lg" rounded no-caps to="/register" @click="mobileMenuOpen = false" />
                </div>
            </div>
        </transition>

        <div class="row items-center justify-center full-height full-width relative-position z-10 q-pa-md" style="min-height: 100vh">
             <div class="col-12 text-center q-mb-xl">
                 <transition appear enter-active-class="animated fadeInDown">
                     <div>
                        <div class="text-primary text-uppercase text-bold tracking-widest q-mb-md">Our Expertise</div>
                        <div class="text-h2 text-weight-bolder text-white q-mb-md">Premuim Logistics Services</div>
                        <p class="text-grey-4 text-h6 text-weight-regular q-mx-auto" style="max-width: 700px;">
                            Tailored solutions for businesses of all sizes.
                        </p>
                     </div>
                 </transition>
             </div>

             <div class="col-12 col-lg-10">
                 <div class="row q-col-gutter-lg justify-center">
                     <!-- Service 1 -->
                     <div class="col-12 col-md-4">
                         <transition appear enter-active-class="animated fadeInUp" delay="100">
                             <q-card class="bg-dark-glass full-height hover-effect">
                                 <q-card-section class="text-center q-py-xl">
                                     <div class="icon-circle bg-primary q-mb-lg q-mx-auto shadow-glow">
                                         <q-icon name="local_shipping" color="white" size="40px" />
                                     </div>
                                     <div class="text-h5 text-bold q-mb-sm">Fleet Management</div>
                                     <p class="text-grey-4">Complete visibility and control over your entire fleet operations in real-time.</p>
                                 </q-card-section>
                             </q-card>
                         </transition>
                     </div>

                     <!-- Service 2 -->
                      <div class="col-12 col-md-4">
                         <transition appear enter-active-class="animated fadeInUp" delay="200">
                             <q-card class="bg-dark-glass full-height hover-effect">
                                 <q-card-section class="text-center q-py-xl">
                                     <div class="icon-circle bg-secondary q-mb-lg q-mx-auto shadow-glow">
                                         <q-icon name="route" color="white" size="40px" />
                                     </div>
                                     <div class="text-h5 text-bold q-mb-sm">Route Optimization</div>
                                     <p class="text-grey-4">AI-powered routing to minimize fuel costs and maximize delivery efficiency.</p>
                                 </q-card-section>
                             </q-card>
                         </transition>
                     </div>

                     <!-- Service 3 -->
                      <div class="col-12 col-md-4">
                         <transition appear enter-active-class="animated fadeInUp" delay="300">
                             <q-card class="bg-dark-glass full-height hover-effect">
                                 <q-card-section class="text-center q-py-xl">
                                     <div class="icon-circle bg-accent q-mb-lg q-mx-auto shadow-glow">
                                         <q-icon name="warehouse" color="white" size="40px" />
                                     </div>
                                     <div class="text-h5 text-bold q-mb-sm">Warehouse Control</div>
                                     <p class="text-grey-4">Seamless inventory management and automated dispatching systems.</p>
                                 </q-card-section>
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
import { ref } from 'vue'
import ThreeBackground from 'components/ThreeBackground.vue'
const mobileMenuOpen = ref(false)
</script>

<style scoped>
.bg-dark-glass {
    background: rgba(16, 26, 43, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    transition: transform 0.3s ease, background 0.3s ease;
}
.hover-effect:hover {
    transform: translateY(-10px);
    background: rgba(16, 26, 43, 0.8);
    border-color: rgba(64, 196, 255, 0.3);
}
.z-top { z-index: 1000; }
.z-max { z-index: 9999; }
.z-10 { z-index: 10; }
.icon-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shadow-glow { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
.tracking-widest { letter-spacing: 3px; }

/* Nav Styles */
.bg-dark-glass-nav {
    background: rgba(16, 26, 43, 0.85); /* Slightly darker/opaque for readability on all pages */
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.nav-link {
    font-size: 0.95rem;
    transition: color 0.3s ease, background-color 0.3s ease;
    border-radius: 4px;
}
.nav-link:hover {
    color: #40c4ff;
    background: rgba(255,255,255,0.05);
}
.btn-glow {
    box-shadow: 0 0 15px rgba(33, 150, 243, 0.4);
    transition: box-shadow 0.3s ease;
}
.btn-glow:hover {
    box-shadow: 0 0 25px rgba(33, 150, 243, 0.6);
}

/* Menu Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
