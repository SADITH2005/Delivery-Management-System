<template>
  <q-layout view="lHh LpR lFf" class="bg-dark-page font-sans text-white">
    <!-- Header -->
    <q-header bordered class="bg-dark-glass-nav text-white backdrop-blur-md">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <q-icon name="admin_panel_settings" class="q-mr-sm" size="md" />
          Admin Portal
        </q-toolbar-title>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <div class="text-subtitle2 q-mr-md gt-xs">Welcome, Admin</div>
          <q-btn flat round dense icon="logout" @click="handleLogout" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Drawer) -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-dark-glass-sidebar">
      <div class="q-pa-md row justify-center">
        <div class="text-h6 text-bold text-primary tracking-wide">DMS ADMIN</div>
      </div>
      
      <q-list padding class="text-grey-4">
        <q-item clickable v-ripple :active="activeTab === 'overview'" @click="activeTab = 'overview'" active-class="text-primary bg-white-5">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Overview</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="activeTab === 'employees'" @click="activeTab = 'employees'" active-class="text-primary bg-white-5">
          <q-item-section avatar>
            <q-icon name="badge" />
          </q-item-section>
          <q-item-section>Staff & Admins</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="activeTab === 'customers'" @click="activeTab = 'customers'" active-class="text-primary bg-white-5">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>Customers</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="activeTab === 'shipments'" @click="activeTab = 'shipments'" active-class="text-primary bg-white-5">
          <q-item-section avatar>
            <q-icon name="local_shipping" />
          </q-item-section>
          <q-item-section>Shipments</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="activeTab === 'settings'" @click="activeTab = 'settings'" active-class="text-primary bg-white-5">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <q-page class="q-pa-md">
        
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="q-gutter-y-md">
          <div class="row q-col-gutter-md">
            <!-- Stat Cards -->
            <div class="col-12 col-md-3" v-for="(stat, index) in stats" :key="index">
              <q-card class="bg-glass-card text-white no-shadow border-glass">
                <q-card-section class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle2 text-grey-4">{{ stat.title }}</div>
                    <div class="text-h4 text-weight-bold q-my-sm">{{ stat.value }}</div>
                    <div class="text-caption" :class="stat.trend > 0 ? 'text-green-4' : 'text-red-4'">
                      <q-icon :name="stat.trend > 0 ? 'trending_up' : 'trending_down'" />
                      {{ stat.trend }}% vs last month
                    </div>
                  </div>
                  <div class="col-auto">
                    <q-avatar size="md" :color="stat.color" text-color="white" :icon="stat.icon" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Charts / Recent Section -->
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <q-card class="bg-glass-card text-white fit no-shadow border-glass">
                <q-card-section>
                  <div class="text-h6">Recent Activity</div>
                </q-card-section>
                <q-card-section>
                    <!-- Placeholder using a list for now -->
                     <q-list separator dark>
                        <q-item v-for="n in 5" :key="n" clickable>
                            <q-item-section avatar>
                                <q-avatar color="primary" text-color="white" icon="local_shipping" size="sm" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Order #100{{n}} Delivered</q-item-label>
                                <q-item-label caption class="text-grey-5">To Colombo, Sri Lanka</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <span class="text-grey-4">2 mins ago</span>
                            </q-item-section>
                        </q-item>
                     </q-list>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
               <q-card class="bg-glass-card text-white fit no-shadow border-glass">
                <q-card-section>
                  <div class="text-h6">System Status</div>
                </q-card-section>
                 <q-card-section class="q-gutter-y-sm">
                    <div v-for="system in ['Server Logic', 'Database', 'API Gateway']" :key="system">
                        <div class="row justify-between text-caption">
                            <span>{{ system }}</span>
                            <span class="text-green-4">Operational</span>
                        </div>
                        <q-linear-progress value="1.0" color="green-5" class="q-mt-xs" rounded />
                    </div>
                 </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

             <div class="row items-center justify-between">
                <div class="text-h5 text-bold">Staff & Admin Management</div>
                <div class="row q-gutter-sm">
                    <q-btn color="primary" icon="refresh" flat round @click="fetchValidIds" :loading="loadingIds" />
                    <q-btn color="secondary" icon="admin_panel_settings" label="New Admin ID" no-caps class="shadow-2" @click="openAddIdDialog('admin')" />
                    <q-btn color="primary" icon="add" label="New Employee ID" no-caps class="shadow-2" @click="openAddIdDialog('employee')" />
                </div>
             </div>

             <!-- Valid Employee IDs Management -->
             <q-card class="bg-glass-card text-white no-shadow border-glass">
                <q-card-section>
                    <div class="text-h6 q-mb-md">Pre-approved IDs for Registration</div>
                    <div class="text-caption text-grey-4 q-mb-md">Create IDs here. Give the ID to the user (Admin or Staff) so they can self-register.</div>
                    <q-table
                        dark
                        flat
                        :rows="validIds"
                        :columns="validIdColumns"
                        row-key="id"
                        class="bg-transparent text-white"
                        :filter="filter"
                        :loading="loadingIds"
                    >
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" dark color="white">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                            </q-input>
                        </template>
                         <template v-slot:body-cell-status="props">
                            <q-td :props="props">
                                <q-chip :color="props.row.status === 'registered' ? 'green-9' : 'orange-9'" text-color="white" size="sm">
                                    {{ props.row.status }}
                                </q-chip>
                            </q-td>
                        </template>
                         <template v-slot:body-cell-actions="props">
                            <q-td :props="props" align="right">
                                <q-btn flat round color="red-4" icon="delete" size="sm" @click="deleteId(props.row)" />
                            </q-td>
                        </template>
                    </q-table>
                </q-card-section>
             </q-card>


        <!-- Customers Tab -->
        <div v-if="activeTab === 'customers'" class="q-gutter-y-md">
             <div class="row items-center justify-between">
                <div class="text-h5 text-bold">Customer Management</div>
                <q-btn color="primary" icon="refresh" flat round @click="fetchCustomers" :loading="loadingCustomers" />
             </div>

             <q-card class="bg-glass-card text-white no-shadow border-glass">
                <q-card-section>
                    <q-table
                        dark
                        flat
                        :rows="customers"
                        :columns="customerColumns"
                        row-key="uid"
                        class="bg-transparent text-white"
                        :filter="customerFilter"
                        :loading="loadingCustomers"
                    >
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="customerFilter" placeholder="Search" dark color="white">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                            </q-input>
                        </template>
                         <template v-slot:body-cell-actions="props">
                            <q-td :props="props" align="right">
                                <q-btn flat round color="primary" icon="visibility" size="sm" />
                                <q-btn flat round color="red-4" icon="delete" size="sm" />
                            </q-td>
                        </template>
                    </q-table>
                </q-card-section>
             </q-card>
        </div>
        
         <!-- Shipments Tab (Placeholder) -->
        <div v-if="activeTab === 'shipments'" class="q-gutter-y-md">
             <div class="text-h5 text-bold">Shipment Management</div>
             <div class="text-grey-4">Shipment management interface coming soon...</div>
        </div>

      </q-page>
    </q-page-container>
    
    <!-- Add ID Dialog -->
    <q-dialog v-model="addIdDialogOpen">
        <q-card class="bg-dark-glass-card text-white border-glass" style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">
                    {{ newEmployeeRole === 'admin' ? 'Create New Admin ID' : 'Create New Employee ID' }}
                </div>
                <div class="text-caption text-grey-4">
                     {{ newEmployeeRole === 'admin' ? 'This ID grants FULL SYSTEM ACCESS.' : 'This ID grants staff access.' }}
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input dark filled v-model="newEmployeeId" :label="newEmployeeRole === 'admin' ? 'Admin ID (e.g. ADM-01)' : 'Employee ID (e.g. EMP-01)'" autofocus hint="Unique ID" />
                <q-select 
                    v-if="newEmployeeRole !== 'admin'"
                    dark 
                    filled 
                    v-model="newEmployeeRole" 
                    :options="['employee', 'driver', 'logistics']" 
                    label="Role" 
                    class="q-mt-md" 
                />
                 <div v-else class="q-mt-md text-secondary text-weight-bold">
                    <q-icon name="security" /> Role: System Administrator
                </div>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup color="white" />
                <q-btn flat label="Create ID" @click="addEmployeeId" :color="newEmployeeRole === 'admin' ? 'secondary' : 'primary'" :loading="modifying" />
            </q-card-actions>
        </q-card>
    </q-dialog>

  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { db } from 'src/firebase/config'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore'
import { useQuasar } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const leftDrawerOpen = ref(false)
const activeTab = ref('overview')
const addIdDialogOpen = ref(false)
const newEmployeeId = ref('')
const newEmployeeRole = ref('employee')
const filter = ref('')
const loadingIds = ref(false)
const loadingCustomers = ref(false)
const modifying = ref(false)

const validIds = ref([])
const customers = ref([])
const customerFilter = ref('')

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleLogout = async () => {
    await authStore.logout()
    router.push('/login')
}

// --- Customer Logic ---
const fetchCustomers = async () => {
    loadingCustomers.value = true
    try {
        const q = query(collection(db, "users"), where("role", "==", "customer"));
        const querySnapshot = await getDocs(q);
        customers.value = querySnapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        }))
    } catch (e) {
        console.error("Error fetching customers", e)
        $q.notify({ type: 'negative', message: 'Failed to load customers' })
    } finally {
        loadingCustomers.value = false
    }
}

// --- Firestore Logic for Employee IDs ---

const fetchValidIds = async () => {
    loadingIds.value = true
    try {
        const q = query(collection(db, "valid_employee_ids"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        validIds.value = querySnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }))
    } catch (e) {
        console.error("Error fetching IDs", e)
        $q.notify({ type: 'negative', message: 'Failed to load employee IDs' })
    } finally {
        loadingIds.value = false
    }
}

const openAddIdDialog = (roleType) => {
    newEmployeeId.value = ''
    newEmployeeRole.value = roleType || 'employee'
    addIdDialogOpen.value = true
}

const addEmployeeId = async () => {
    if (!newEmployeeId.value) return
    modifying.value = true
    
    try {
        // Check for duplicate in local list (simple check) or DB
        // We will trust the UI list for now to save a read
        const exists = validIds.value.find(x => x.id === newEmployeeId.value)
        if (exists) {
            $q.notify({ type: 'warning', message: 'ID already exists' })
            modifying.value = false
            return
        }

        await addDoc(collection(db, "valid_employee_ids"), {
            id: newEmployeeId.value,
            role: newEmployeeRole.value,
            status: 'pending',
            createdAt: new Date().toISOString()
        })
        
        $q.notify({ type: 'positive', message: 'ID added successfully' })
        addIdDialogOpen.value = false
        fetchValidIds() // Refresh
    } catch (e) {
        console.error(e)
        $q.notify({ type: 'negative', message: 'Failed to add ID' })
    } finally {
        modifying.value = false
    }
}

const deleteId = async (row) => {
    try {
        await deleteDoc(doc(db, "valid_employee_ids", row.firestoreId))
        $q.notify({ type: 'positive', message: 'ID removed' })
        // validIds.value = validIds.value.filter(x => x.firestoreId !== row.firestoreId) // Optimistic update
        fetchValidIds()
    } catch (e) {
        console.error(e)
        $q.notify({ type: 'negative', message: 'Failed to delete ID' })
    }
}

onMounted(() => {
    fetchValidIds()
    fetchCustomers()
})

// Stats Data (Still mock for now)
const stats = [
    { title: 'Total Revenue', value: '$45,230', trend: 12.5, color: 'blue', icon: 'attach_money' },
    { title: 'Active Drivers', value: '24', trend: -2.4, color: 'orange', icon: 'directions_bike' },
    { title: 'Completed Deliveries', value: '1,205', trend: 8.1, color: 'green', icon: 'done_all' },
    { title: 'Pending Issues', value: '5', trend: -1.2, color: 'red', icon: 'report_problem' }
]

const validIdColumns = [
    { name: 'id', required: true, label: 'Employee/Admin ID', align: 'left', field: 'id', sortable: true },
    { name: 'role', align: 'left', label: 'Assigned Role', field: 'role', sortable: true },
    { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
    { name: 'createdAt', align: 'left', label: 'Created At', field: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-', sortable: true },
    { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
]

const customerColumns = [
    { name: 'displayName', align: 'left', label: 'Name', field: 'displayName', sortable: true },
    { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
    { name: 'phone', align: 'left', label: 'Phone', field: 'phone' },
    { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
]

</script>

<style lang="css">
/* Add these styles to your app for the glassmorphism look */
.bg-dark-page {
    background-color: #0f172a; /* Slate 900 */
    background-image: 
        radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
        radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
        radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
    background-size: cover;
    background-attachment: fixed;
}
.bg-dark-glass-nav {
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-dark-glass-sidebar {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-glass-card {
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.bg-dark-glass-card {
     background: #1e293b; 
     border: 1px solid rgba(255, 255, 255, 0.1);
}
.border-glass {
    border: 1px solid rgba(255, 255, 255, 0.08);
}
.bg-white-5 {
    background: rgba(255, 255, 255, 0.05);
}
</style>
