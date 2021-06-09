import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth/index.js";
import permissions from "./permissions/index.js";
import polls from "./polls/index.js";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      permissions,
      polls
    },

    // mutations: {
    //   initializeLocalStorage(state) {
    //     if (localStorage.getItem("sessionstore")) {
    //       console.log("setstate");
    //       const newState = Object.assign(
    //         state,
    //         JSON.parse(localStorage.getItem("sessionstore"))
    //       );
    //       this.replaceState(newState);
    //     }
    //   }
    // },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  // Store.subscribe((mutation, state) => {
  //   localStorage.setItem("sessionstore", JSON.stringify(state));
  // });

  return Store;
}
