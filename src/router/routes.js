import store from "../store";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/Home.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "login",
        name: "Login",
        component: () => import("pages/Login.vue"),
        meta: {
          title: "Log-in",
          requiresAuth: false
        }
      },
      {
        path: "polls",
        name: "PollsOverview",
        component: () => import("pages/Polls.vue"),
        meta: {
          title: "Polls overzicht",
          requiresAuth: true
        }
      },
      {
        path: "polls/:id",
        name: "ViewPoll",
        props: true,
        component: () => import("pages/Poll.vue"),
        meta: {
          title: "Poll",
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
