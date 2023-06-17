import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue';
import MainPage from '../components/MainPage.vue'
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/main',
    name: 'mainPage',
    component: MainPage,
    meta: { requiresAuth: true } // Set meta field for protected route
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isUserAuthenticated;// Check if the user is authenticated
  if ((to.path === '/' || to.path.toLocaleLowerCase() === "/signup") && isAuthenticated) {
    // User is already authenticated, redirect to another page
    next('/main');
  }else if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login or unauthorized page
    next('/');
  } else {
    // Proceed to the requested route
    next();
  }
});
export default router
