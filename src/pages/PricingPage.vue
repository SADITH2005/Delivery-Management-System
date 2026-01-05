<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="bg-dark text-white relative-position overflow-hidden">
        
        <!-- Three.js Background -->
        <ThreeBackground class="fixed-full z-0" />
        <div class="fixed-full z-0" style="background: radial-gradient(circle at center, transparent 0%, #0a192f 95%); pointer-events: none;"></div>

        <!-- Navbar & Header -->
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

        <div class="row justify-center q-pt-xl q-pb-xl relative-position z-10 full-width" style="margin-top: 60px;">
            <div class="col-12 col-xl-10 q-px-md">
                
                <!-- Main Header Text -->
                <div class="text-center q-mb-xl animated fadeInDown">
                    <div class="text-primary text-uppercase text-bold tracking-widest q-mb-sm">Transparent Pricing</div>
                    <div class="text-h3 text-weight-bolder">Calculate Your Delivery Costs</div>
                    <p class="text-grey-4 q-mt-md text-subtitle1">Real-time rates for domestic and international shipping needs.</p>
                </div>

                <div class="row q-col-gutter-xl">
                    
                    <!-- CALCULATOR SECTION (Left/Top) -->
                    <div class="col-12 col-md-5">
                        <q-card class="bg-dark-glass full-height shadow-24 animated fadeInLeft delay-100">
                            <q-card-section class="q-pa-lg">
                                <div class="row items-center q-mb-lg">
                                    <q-icon name="calculate" color="secondary" size="2em" class="q-mr-sm" />
                                    <div class="text-h5 text-bold">Cost Calculator</div>
                                </div>

                                <q-form class="q-gutter-md">
                                    <!-- Country / Currency Selector -->
                                    <q-select 
                                        dark filled 
                                        v-model="selectedCountry" 
                                        :options="countryOptions"
                                        label="Your Location (Currency)"
                                        color="secondary"
                                        bg-color="dark-input"
                                        emit-value
                                        map-options
                                    >
                                        <template v-slot:prepend><q-icon name="public" color="grey-5" /></template>
                                    </q-select>

                                    <!-- Region Selector (Sri Lanka) -->
                                    <q-select 
                                        dark filled 
                                        v-model="selectedRegion" 
                                        :options="regionOptions"
                                        label="Delivery Region (Sri Lanka)"
                                        color="secondary"
                                        bg-color="dark-input"
                                        emit-value
                                        map-options
                                        hint="Where is the package going?"
                                    >
                                        <template v-slot:prepend><q-icon name="place" color="grey-5" /></template>
                                    </q-select>

                                    <!-- Weight Input -->
                                    <q-input 
                                        dark filled 
                                        v-model.number="weight" 
                                        type="number" 
                                        label="Package Weight (kg)"
                                        color="secondary"
                                        bg-color="dark-input"
                                        :rules="[val => val > 0 || 'Weight must be positive']"
                                    >
                                        <template v-slot:prepend><q-icon name="scale" color="grey-5" /></template>
                                    </q-input>

                                    <!-- Special Services -->
                                    <div class="q-mt-lg">
                                        <div class="text-subtitle2 text-grey-4 q-mb-sm">Extra Services</div>
                                        <div class="row q-gutter-sm">
                                            <q-checkbox dark v-model="services.cod" label="Cash On Delivery" color="secondary" />
                                            <q-checkbox dark v-model="services.fragile" label="Fragile Handling" color="secondary" />
                                            <q-checkbox dark v-model="services.express" label="Same Day Express" color="secondary" v-if="selectedRegion === 'colombo'" />
                                            <q-checkbox dark v-model="services.insurance" label="Insurance (1% Value)" color="secondary" />
                                        </div>
                                    </div>

                                    <!-- Insurance Value Input -->
                                    <transition name="fade">
                                        <q-input 
                                            v-if="services.insurance"
                                            dark filled dense
                                            v-model.number="itemValue" 
                                            type="number" 
                                            label="Declared Item Value (LKR)"
                                            color="secondary"
                                            class="q-mt-sm"
                                        />
                                    </transition>

                                    <q-separator dark class="q-my-md" />

                                    <!-- Total Display -->
                                    <div class="bg-secondary-soft rounded-borders q-pa-md text-center">
                                        <div class="text-caption text-uppercase text-bold text-secondary">Estimated Total</div>
                                        <div class="text-h3 text-weight-bolder text-white q-my-xs">
                                            {{ formattedTotal }}
                                        </div>
                                        <div class="text-caption text-grey-4" v-if="selectedCountry !== 'LK'">
                                            (Approx. {{ totalLKR.toLocaleString() }} LKR)
                                        </div>
                                        <div class="text-caption text-grey-5 q-mt-xs">
                                            *Excludes taxes and remote surcharges if applicable.
                                        </div>
                                    </div>

                                </q-form>
                            </q-card-section>
                        </q-card>
                    </div>

                    <!-- PRICING TABLES & INFO (Right/Bottom) -->
                    <div class="col-12 col-md-7">
                        <div class="column q-gutter-y-lg animated fadeInRight delay-200">
                            
                            <!-- Standard Rates Table -->
                            <q-card class="bg-dark-glass">
                                <q-card-section>
                                    <div class="text-h6 text-bold q-mb-md text-primary">Standard Delivery Rates</div>
                                    <q-markup-table dark flat bordered class="bg-transparent text-grey-3">
                                        <thead>
                                            <tr>
                                                <th class="text-left">Region</th>
                                                <th class="text-right">1st KG</th>
                                                <th class="text-right">Add. KG</th>
                                                <th class="text-right">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="rate in standardRates" :key="rate.region">
                                                <td class="text-left text-weight-medium">{{ rate.name }}</td>
                                                <td class="text-right">{{ rate.base }} LKR</td>
                                                <td class="text-right">{{ rate.extra }} LKR</td>
                                                <td class="text-right text-caption">{{ rate.time }}</td>
                                            </tr>
                                        </tbody>
                                    </q-markup-table>
                                </q-card-section>
                            </q-card>

                            <!-- Weight Based Slab Info -->
                            <q-card class="bg-dark-glass">
                                <q-card-section>
                                    <div class="text-h6 text-bold q-mb-md text-accent">Weight-Based Slabs (Discounted)</div>
                                    <div class="row q-col-gutter-sm text-center">
                                         <div class="col-6 col-md-3" v-for="(slab, i) in slabDisplay" :key="i">
                                             <div class="bg-dark-input rounded-borders q-pa-sm full-height">
                                                 <div class="text-bold text-white">{{ slab.range }}</div>
                                                 <div class="text-caption text-grey-4">{{ slab.colombo }}</div>
                                             </div>
                                         </div>
                                    </div>
                                    <div class="text-caption text-grey-5 q-mt-sm text-center">
                                        * Bulk rates apply automatically when weight falls into these ranges.
                                    </div>
                                </q-card-section>
                            </q-card>

                             <!-- Additional Services List -->
                             <q-card class="bg-dark-glass">
                                <q-card-section>
                                    <div class="text-h6 text-bold q-mb-sm text-white">Surcharges & Services</div>
                                    <q-list dark dense>
                                        <q-item>
                                            <q-item-section avatar><q-icon name="payments" color="grey-4"/></q-item-section>
                                            <q-item-section>
                                                <q-item-label>Cash on Delivery</q-item-label>
                                                <q-item-label caption>1.5% - 2.0% (Min Rs. 50)</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section avatar><q-icon name="broken_image" color="grey-4"/></q-item-section>
                                            <q-item-section>
                                                <q-item-label>Fragile Handling</q-item-label>
                                                <q-item-label caption>Rs. 100 per parcel (Bubble wrap + Label)</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section avatar><q-icon name="rocket" color="grey-4"/></q-item-section>
                                            <q-item-section>
                                                <q-item-label>Same Day Express</q-item-label>
                                                <q-item-label caption>Rs. 800 (Colombo only, up to 1kg)</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-card-section>
                            </q-card>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import ThreeBackground from 'components/ThreeBackground.vue'

// --- Data Constants ---
const USD_RATE = 300 // 1 USD = 300 LKR (Mock Rate)

const countryOptions = [
    { label: 'Sri Lanka (LKR)', value: 'LK' },
    { label: 'United States (USD)', value: 'US' },
    { label: 'United Kingdom (USD)', value: 'UK' },
    { label: 'Australia (USD)', value: 'AU' },
    { label: 'Other (USD)', value: 'OT' }
]

const regionOptions = [
    { label: 'Colombo & Suburbs', value: 'colombo' },
    { label: 'Greater Colombo', value: 'greater_colombo' },
    { label: 'Outstation (Main Cities)', value: 'outstation' },
    { label: 'Remote Areas', value: 'remote' }
]

const standardRates = [
    { region: 'colombo', name: 'Colombo & Suburbs', base: 350, extra: 100, time: '1-2 Days' },
    { region: 'greater_colombo', name: 'Greater Colombo', base: 400, extra: 120, time: '2 Days' },
    { region: 'outstation', name: 'Outstation', base: 500, extra: 150, time: '2-3 Days' },
    { region: 'remote', name: 'Remote Areas', base: 650, extra: 200, time: '3-5 Days' }
]

const slabDisplay = [
    { range: '0-1 kg', colombo: 'Rs. 350 / 500' },
    { range: '1-2 kg', colombo: 'Rs. 450 / 650' },
    { range: '2-5 kg', colombo: 'Rs. 750 / 1100' },
    { range: '5-10 kg', colombo: 'Rs. 1250 / 1850' }
]

// --- Reactive State ---
// --- Reactive State ---
const selectedCountry = ref('LK') // Default Sri Lanka
const selectedRegion = ref('colombo')
const weight = ref(1)
const itemValue = ref(0)
const services = ref({
    cod: false,
    fragile: false,
    express: false,
    insurance: false
})
const mobileMenuOpen = ref(false)

// --- Calculation Logic ---
const totalLKR = computed(() => {
    let total = 0
    let w = weight.value || 0
    let r = selectedRegion.value

    // 1. Base Shipping Cost
    // We will use the SLAB logic for consistency if < 10kg, else Linear fallback?
    // User provided two tables. Let's strictly follow the "Standard Rates" linear logic for the calculator 
    // BUT checking if it matches the Slab table. 
    // Slab Table: 
    // 0-1kg: 350 (Col) / 500 (Out)
    // 1-2kg: 450 (Col) / 650 (Out) -> Corresponds to 350+100 / 500+150. MATCHES Linear Model!
    // 2-5kg: 750 (Col) / 1100 (Out). 5kg Linear would be 350 + 4*100 = 750. MATCHES Linear Model!
    // So the Linear Model (Base + (Weight-1)*Extra) fully explains the Slab table up to 5kg.
    // Let's check 5-10kg: 1250 (Col). 10kg Linear: 350 + 9*100 = 1250. MATCHES!
    // CONCLUSION: The Slab table is just a simplified view of the Linear Model.
    // We can confidently use the Linear Model for calculation.
    
    // Find rate for region
    const rateProfile = standardRates.find(rn => rn.region === r) || standardRates[0]
    
    if (w <= 1) {
        total += rateProfile.base
    } else {
        total += rateProfile.base + ((Math.ceil(w) - 1) * rateProfile.extra)
    }

    // 2. Special Services
    // Express (Colombo Only)
    if (services.value.express && r === 'colombo') {
        // "Flat rate up to 1kg" - implies standard shipping is replaced? Or added? 
        // Typically express overrides standard. "Rs. 800.00 (Flat rate up to 1kg)".
        // If > 1kg? Let's assume express implies the base rate is 800.
        // Or if it's an add-on. "Rs 800 flat rate". Let's assume it replaces the Base Rate.
        // If w > 1kg, let's just add the extra kg cost on top of 800? 
        // For safety, let's treat it as a Replacement Base Cost.
        if (w <= 1) total = 800
        else {
             // 800 + extra
             // Base logic was: base + (w-1)*extra
             // New logic: 800 + (w-1)*extra
             total = 800 + ((Math.ceil(w) - 1) * rateProfile.extra)
        }
    }

    // Fragile
    if (services.value.fragile) {
        total += 100
    }

    // Insurance
    if (services.value.insurance) {
        total += (itemValue.value || 0) * 0.01
    }

    // COD
    // "1.5% - 2.0% ... Minimum Rs. 50". Let's take 2% for safety.
    // COD applies to "Total Invoice Value". Is that Item Value + Shipping? Or just Item Value?
    // Usually COD collects the Item Value too. But here we don't know the Item Value unless declared.
    // Let's assume COD fee is based on Shipping Cost if no item value, OR assume just the min fee if unchecked.
    // Prompt: "1.5% - 2.0% of the total invoice value".
    // If Item Value is 0, we can't calc percentage. We'll verify min Rs 50.
    if (services.value.cod) {
         const invoiceValue = (itemValue.value || 0) + total // assuming total invoice
         let codFee = invoiceValue * 0.02
         if (codFee < 50) codFee = 50
         total += codFee
    }

    return Math.ceil(total)
})

const formattedTotal = computed(() => {
    if (selectedCountry.value === 'LK') {
        return `Rs. ${totalLKR.value.toLocaleString()}`
    } else {
        // Conversion
        const usdVal = (totalLKR.value / USD_RATE).toFixed(2)
        return `$ ${usdVal}`
    }
})

</script>

<style scoped>
.bg-dark-glass {
    background: rgba(16, 26, 43, 0.75);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
}
.bg-secondary-soft {
    background: rgba(38, 166, 154, 0.15);
    border: 1px solid rgba(38, 166, 154, 0.3);
}
.bg-dark-input {
    background: rgba(0,0,0,0.3);
    border-radius: 8px;
}
.z-top { z-index: 1000; }
.z-max { z-index: 9999; }
.z-10 { z-index: 10; }
.tracking-widest { letter-spacing: 3px; }

/* Custom Scrollbar for list if needed */
/* Custom Scrollbar for list if needed */
.q-markup-table {
    overflow-x: auto; /* Allow horizontal scroll on mobile */
}

/* Responsive adjustments */
@media (max-width: 599px) {
    .text-h3 {
        font-size: 2rem;
        line-height: 2.2rem;
    }
    .q-pa-lg {
        padding: 16px !important;
    }
    .q-px-xl {
        padding-left: 16px !important;
        padding-right: 16px !important;
    }
}

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
