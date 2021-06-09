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
        path: "sign-in",
        name: "Login",
        component: () => import("pages/Login.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "polls",
        name: "PollsOverview",
        component: () => import("pages/Polls.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "create-poll",
        name: "CreatePoll",
        component: () => import("pages/CreatePoll.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "poll",
        name: "ViewPoll",
        component: () => import("pages/Poll.vue"),
        children: [
          {
            path: ":id",
            name: "ViewPollSection",
            component: () => import("components/ViewPollSection.vue")
          }
        ],
        meta: {
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
