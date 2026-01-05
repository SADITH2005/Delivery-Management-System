<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="bg-dark text-white relative-position overflow-hidden flex flex-center">
        
        <!-- Three.js Background -->
        <ThreeBackground class="fixed-full z-0" />
        
        <!-- Content Overlay -->
        <div class="absolute-full z-1 " style="background: radial-gradient(circle at center, transparent 0%, #0a192f 90%); pointer-events: none;"></div>

         <!-- Back to Home -->
         <q-btn flat icon="arrow_back" label="Home" color="white" class="absolute-top-left q-ma-md z-top" to="/" no-caps />

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
import ThreeBackground from 'components/ThreeBackground.vue'
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
</style>
