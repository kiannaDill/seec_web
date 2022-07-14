import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "index",
    redirect: 'login',
  },
  {
    path: "/home",
    name: "home",
    redirect: '/home/index',
    component: HomeView,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'document',
        name: 'document',
        component: () => import('../views/Document.vue')
      },
      {
        path: 'lead',
        name: 'lead',
        component: () => import('../views/Lead.vue')
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    // 登录界面不设权限
    next()
  } else {
    const token = localStorage.getItem("token")
    // 非登录界面设置权限
    if (token) {
      next()
    } else {
      next({
        name: "login"
      })
    }
  }
})

export default router;