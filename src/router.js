import { createRouter, createWebHistory } from "vue-router";
import store from "./store/store";
import { IS_USER_AUTHENTICATE_GETTER } from "./store/storeconstants";
const Login = () => import("./pages/login.vue");
const Signup = () => import("./pages/signup.vue");
const Home = () => import("./pages/home.vue");

const routes = [
  {
    path: "/home",
    component: Home,
    meta: { auth: true },
  },
  {
    path: "/signup",
    component: Signup,
    meta: { auth: false},
  },
  {
    path: "/",
    name: Login,
    component: Login,
    
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]) {
    next("/");
  } else if (
    !to.meta.auth &&
    store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
    next("/home");
  } 
  
  else {
    next();
  }
});

export default router;
