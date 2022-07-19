import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Create from "../views/Create.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blog/:id",
      name: "blog",
      component: () => import("../views/Blog.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: Create,
      meta: {
        auth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
    },
    { path: "/:catchAll(.*)", component: () => import("../views/404.vue") },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isAuthenticated) {
    localStorage.setItem("pathToLoadAfterLogin", to.path);
    next("/login");
  } else {
    next();
  }
});
export default router;
