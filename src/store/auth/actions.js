import axios from "axios";

export function login({ commit }, { username, password }) {
  commit("AUTH_REQUEST");
  return axios
    .post("/login", {
      username,
      password
    })
    .then(response => {
      const token = response.data.access_token;
      localStorage.setItem("user-token", token);

      axios.defaults.headers.common["Authorization"] = token;
      commit("AUTH_SUCCESS", { username, token });
      // you have your token, now log in your user
      return response.data;
    })
    .catch(err => {
      commit("AUTH_ERROR");
      console.error(err);
    });
}

export function logout({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    commit("AUTH_LOGOUT");
    localStorage.removeItem("user-token");
    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
}
