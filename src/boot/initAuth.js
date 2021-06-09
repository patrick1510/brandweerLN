import axios from "axios";

export default ({ store }) => {
  if (store.getters["auth/isTokenExpired"]) {
    // User has been logged in more than one hour ago, the token is expired
    console.log("the token is expired");
    store.commit("auth/AUTH_LOGOUT");
  }

  if (store.state.auth.token) {
    axios.defaults.headers.common["Authorization"] = store.state.auth.token;
  }
};
