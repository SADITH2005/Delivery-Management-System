<template>
  <q-page class="bg-dark text-white">
    
    <!-- Navbar - Made Transparent & Centered -->
    <div class="row items-center justify-between q-px-xl q-py-md fixed-top z-top transition-bg" :class="{'bg-dark': scroll > 50, 'bg-transparent': scroll <= 50}">
      
      <!-- Logo (Left) -->
      <div class="col-auto row items-center cursor-pointer" @click="$router.push('/')">
        <q-icon name="local_shipping" size="2.8em" color="white" class="q-mr-sm" />
        <div class="text-h5 text-bold text-white tracking-wide">DMS</div>
      </div>

      <!-- Navigation Items (Centered) -->
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

      <!-- Empty spacer or secondary actions (Right) - Keeping it simple for now, utilizing 'justify-between' on parent -->
       <div class="col-auto gt-sm" style="width: 120px"> <!-- Spacer to balance logo width for perfect centering --> </div>

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

    <!-- Hero Section -->
    <div class="hero-section relative-position flex flex-center overflow-hidden" style="min-height: 100vh; padding-top: 80px;">
        <!-- Full Width Background Image -->
        <q-img 
            src="~assets/hero-bg.png" 
            class="absolute-full hero-bg-img" 
            fit="cover" 
            position="center"
        />
        
        <!-- Gradient Overlay for readability -->
        <div class="absolute-full bg-black-overlay z-1"></div>
        <!-- Centered Content -->
        <div class="z-2 relative-position text-center q-px-md" style="max-width: 900px;">
            <transition appear enter-active-class="animated fadeInDown">
                <div>
                     <div class="row justify-center q-mb-md">
                         <!-- Next Gen Logistics Badge -->
                         <div class="q-px-md q-py-sm bg-blue-9 rounded-borders text-white text-bold text-uppercase text-caption tracking-wider shadow-2 glow-badge">
                            Next Gen Logistics
                         </div>
                    </div>
                    
                    <div class="text-h1 text-weight-bolder q-mb-md text-white main-title">
                        Smart <span class="text-gradient">Delivery</span> <br />
                        Management System
                    </div>
                    
                    <p class="text-grey-3 text-h6 text-weight-regular q-mb-xl q-mx-auto" style="max-width: 700px; line-height: 1.6;">
                        Streamline your entire supply chain. From automated dispatch to real-time fleet tracking, we optimize every mile.
                    </p>
                    
                    <div class="row justify-center q-gutter-md q-mb-xl">
                        <q-btn unelevated color="primary" label="Get Started Now" icon-right="arrow_forward" padding="14px 40px" size="lg" no-caps class="text-bold shadow-10 btn-hover-lift" rounded to="/register" />
                        <q-btn outline color="white" label="Watch Demo" icon="play_circle" padding="14px 40px" size="lg" no-caps class="text-bold btn-hover-lift" rounded />
                    </div>

                     <div class="row justify-center q-gutter-x-xl q-gutter-y-lg text-center items-center">
                         <div class="stat-item">
                             <div class="text-h3 text-weight-bolder q-mb-xs stat-val">10k+</div>
                             <div class="text-caption text-uppercase tracking-wide text-bold stat-label">Daily Deliveries</div>
                         </div>
                         <div class="q-separator vertical bg-grey-7 gt-xs" style="height: 40px"></div>
                         <div class="stat-item">
                             <div class="text-h3 text-weight-bolder q-mb-xs stat-val">99%</div>
                             <div class="text-caption text-uppercase tracking-wide text-bold stat-label">On-Time Rate</div>
                         </div>
                         <div class="q-separator vertical bg-grey-7 gt-xs" style="height: 40px"></div>
                         <div class="stat-item">
                             <div class="text-h3 text-weight-bolder q-mb-xs stat-val">24/7</div>
                             <div class="text-caption text-uppercase tracking-wide text-bold stat-label">Real-time Support</div>
                         </div>
                     </div>
                </div>
            </transition>
        </div>
    </div>

    <!-- Features Section -->
    <div class="q-px-xl q-py-xl bg-dark-page relative-position z-1">
        <div class="text-center q-mb-xl z-1 relative-position">
            <q-intersection transition="scale" once>
                <div class="text-primary text-uppercase q-mb-sm text-bold tracking-widest">Power & Control</div>
                <div class="text-h3 text-weight-bolder text-white">Why Choose DMS?</div>
            </q-intersection>
        </div>

        <div class="row q-col-gutter-lg z-1 relative-position">
            <!-- Feature 1 -->
            <div class="col-12 col-md-4">
                <q-intersection transition="slide-up" once class="full-height">
                    <q-card class="bg-dark glass-card no-shadow q-pa-none hover-effect full-height display-flex column">
                        <q-img src="~assets/tracking.png" height="240px" class="rounded-top-borders" />
                        <div class="q-pa-lg flex-1">
                            <div class="row items-center q-mb-md">
                                <q-icon name="gps_fixed" color="primary" size="2em" />
                                <div class="text-h5 text-bold q-ml-sm">Real-time Tracking</div>
                            </div>
                            <div class="text-grey-5 text-body1" style="line-height: 1.6;">Monitor your fleet with precision tracking. Give your customers live updates and reduce support calls.</div>
                        </div>
                    </q-card>
                </q-intersection>
            </div>
            <!-- Feature 2 -->
             <div class="col-12 col-md-4">
                 <q-intersection transition="slide-up" delay="100" once class="full-height">
                    <q-card class="bg-dark glass-card no-shadow q-pa-none hover-effect full-height display-flex column">
                         <q-img src="~assets/analytics.png" height="240px" class="rounded-top-borders" />
                        <div class="q-pa-lg flex-1">
                             <div class="row items-center q-mb-md">
                                <q-icon name="insights" color="secondary" size="2em" />
                                <div class="text-h5 text-bold q-ml-sm">Smart Analytics</div>
                            </div>
                            <div class="text-grey-5 text-body1" style="line-height: 1.6;">Make data-driven decisions with our advanced AI analytics. Optimize routes to save fuel and time.</div>
                        </div>
                    </q-card>
                </q-intersection>
            </div>
            <!-- Feature 3 -->
             <div class="col-12 col-md-4">
                  <q-intersection transition="slide-up" delay="200" once class="full-height">
                    <q-card class="bg-dark glass-card no-shadow q-pa-none hover-effect full-height display-flex column">
                         <div class="row flex-center bg-gradient-purple rounded-top-borders" style="height: 240px">
                             <q-icon name="rocket_launch" size="90px" color="white" class="floating-icon" />
                         </div>
                        <div class="q-pa-lg flex-1">
                             <div class="row items-center q-mb-md">
                                <q-icon name="speed" color="accent" size="2em" />
                                <div class="text-h5 text-bold q-ml-sm">Instant Deployment</div>
                            </div>
                            <div class="text-grey-5 text-body1" style="line-height: 1.6;">Get up and running in minutes. Our cloud-based solution requires no complex hardware installation.</div>
                        </div>
                    </q-card>
                </q-intersection>
            </div>
        </div>
    </div>

    <!-- CTA Section - Enhanced Background -->
    <div class="q-pa-xl text-center relative-position overflow-hidden" style="background: linear-gradient(rgba(10, 25, 45, 0.9), rgba(10, 25, 45, 0.9)), url('https://cdn.quasar.dev/img/parallax2.jpg') center/cover fixed;">
         <div class="z-1 relative-position q-py-xl">
             <q-intersection transition="flip-right" once>
                 <div class="text-h3 text-weight-bolder q-mb-md text-white">Ready to Scale?</div>
                 <p class="text-grey-4 text-h6 text-weight-light q-mb-xl">Join the future of logistics management today.</p>
                 <q-btn color="white" text-color="dark" label="Create Free Account" size="lg" no-caps rounded unelevated class="text-bold btn-hover-scale" to="/register" />
             </q-intersection>
         </div>
    </div>
    
    <!-- Footer -->
    <div class="q-pa-xl bg-black text-grey-5">
        <div class="row q-col-gutter-xl">
            <div class="col-12 col-md-4">
                <div class="row items-center q-mb-md">
                    <q-icon name="local_shipping" size="2em" color="white" class="q-mr-sm" />
                    <div class="text-h5 text-bold text-white">DMS</div>
                </div>
                <p>Empowering logistics with smart technology. <br>Delivering success, one package at a time.</p>
                
                <!-- Open Hours Added -->
                <div class="q-mt-md">
                    <div class="text-white text-subtitle2 text-bold q-mb-sm">Open Hours</div>
                     <div class="row items-center q-mb-xs">
                         <q-icon name="schedule" size="xs" class="q-mr-sm text-primary" />
                         <span class="text-caption">Mon - Fri: 8:00 AM - 6:30 PM</span>
                     </div>
                     <div class="row items-center">
                         <q-icon name="schedule" size="xs" class="q-mr-sm text-primary" />
                         <span class="text-caption">Saturday: 8:00 AM - 1:30 PM</span>
                     </div>
                </div>
            </div>
            <div class="col-6 col-md-2">
                <div class="text-white text-subtitle1 text-bold q-mb-md">Product</div>
                <div class="q-gutter-y-sm flex column">
                    <a href="#" class="footer-link">Features</a>
                    <a href="#" class="footer-link">Pricing</a>
                    <a href="#" class="footer-link">API</a>
                </div>
            </div>
             <div class="col-6 col-md-2">
                <div class="text-white text-subtitle1 text-bold q-mb-md">Company</div>
                <div class="q-gutter-y-sm flex column">
                    <a href="#" class="footer-link">About Us</a>
                    <a href="#" class="footer-link">Careers</a>
                    <a href="#" class="footer-link">Contact</a>
                </div>
            </div>
             <div class="col-12 col-md-4">
                 <div class="text-white text-subtitle1 text-bold q-mb-md">Newsletter</div>
                 <q-input dark filled v-model="email" placeholder="Enter your email" dense color="primary">
                     <template v-slot:append>
                         <q-btn round dense flat icon="send" color="primary" />
                     </template>
                 </q-input>
            </div>
        </div>
        <div class="q-mt-xl pt-lg border-top-gray row justify-between items-center">
            <div class="text-caption">&copy; 2026 Delivery Management System. All rights reserved.</div>
            <div class="q-gutter-sm">
                 <q-btn round flat size="sm" icon="facebook" />
                 <q-btn round flat size="sm" icon="work" /> <!-- Linkedin alternative -->
            </div>
        </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const email = ref('')
const scroll = ref(0)
const mobileMenuOpen = ref(false)

const onScroll = () => {
  scroll.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Navbar Transitions */
.transition-bg {
    transition: background-color 0.3s ease;
}

/* Badge Glow */
.glow-badge {
    box-shadow: 0 0 15px rgba(33, 150, 243, 0.5);
}

/* Glass Effect Navbar - Blur Removed for clarity */
.glass-effect {
    background: rgba(10, 38, 71, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Main Title Highlight - Solid Color for maximum readability */
.text-gradient {
    color: #40c4ff;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.9);
}

.bg-gradient-purple {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Statistics Text - Made brighter */
.stat-val {
    color: #4fc3f7 !important; /* Bright light blue */
}
.stat-label {
    color: #e0e0e0 !important; /* Light grey */
}

/* Overlay removed as requested to show sharp background */
.bg-black-overlay {
    background: rgba(0,0,0,0.2); 
    display: none; 
}
.hero-bg-img {
    filter: none;
}
.main-title {
    text-shadow: 0 4px 12px rgba(0,0,0,1); /* Maximum shadow for readability */
}
.text-h1 {
    font-size: 3.5rem;
    line-height: 1.1;
}
@media (max-width: 599px) {
    .text-h1 {
        font-size: 2.5rem;
    }
}

/* Animations & Transitions */
.btn-hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-hover-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(44, 116, 179, 0.3);
}

.btn-hover-scale {
    transition: transform 0.2s ease;
}
.btn-hover-scale:hover {
    transform: scale(1.05);
}

.hover-effect {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
}
.hover-effect:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}
.glass-card {
    background: rgba(26, 26, 26, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.05);
}

/* Glass Effect Navbar Container */
.bg-dark-glass-nav {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

.floating-img {
    animation: float 6s ease-in-out infinite;
}
.floating-icon {
    animation: float 4s ease-in-out infinite;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
}

/* Utilities */
.tracking-wide { letter-spacing: 1px; }
.tracking-wider { letter-spacing: 2px; }
.tracking-widest { letter-spacing: 3px; }

.glow-effect {
    box-shadow: 0 0 50px rgba(44, 116, 179, 0.3);
}
.rounded-top-borders {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.footer-link {
    color: #9e9e9e;
    text-decoration: none;
    transition: color 0.3s;
}
.footer-link:hover {
    color: white;
}
.border-top-gray {
    border-top: 1px solid rgba(255,255,255,0.1);
}
.z-top { z-index: 1000; }
.z-max { z-index: 9999; }
.z-0 { z-index: 0; }
.z-1 { z-index: 1; }
.main-title {
    line-height: 1.1;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
