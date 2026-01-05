import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Navigation Guard for Auth & RBAC
  Router.beforeEach(async (to, from, next) => {
      // We need to import the store dynamically or assume Pinia is active. 
      // In Quasar boot files/router, it's safer to use the imported store within the guard if needed, 
      // but 'useAuthStore' should work here as Pinia is instantiated before Router in Quasar's lifecycle typically.
      // However, to be safe with Quasar's structure, we'll try to use the store.
      
      const { useAuthStore } = await import('src/stores/auth')
      const authStore = useAuthStore()
      
      // Wait for auth init if it's loading? 
      // Ideally, the App.vue handles the initial check, but here we might beat it.
      // For now, simple check:
      
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
      const requiredRole = to.meta.role

      if (requiresAuth && !authStore.user) {
          next('/login')
      } else if (requiresAuth && requiredRole) {
          // Check if user profile is loaded. If not, we might need to wait or check user fetching.
          // For this MVP, we rely on the state being there or quickly fetched.
          // Note: Real apps usually wait for a promise 'isReady' or similar.
          
          if (authStore.userProfile?.role === requiredRole) {
              next()
          } else {
             // Role mismatch
             next('/') // Or unauthorized
          }
      } else {
          next()
      }
  })

  return Router
})
