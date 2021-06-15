import axios from "axios";

export function login({ commit }, { username, password }) {
  commit("AUTH_REQUEST");
  return axios
    .post(
      "https://brandweer-userservice.azurewebsites.net/login",
      {
        username,
        password
      },
      {
        headers: {
          Accept: "application/json",
          allow: "POST,OPTIONS"
        }
      }
    )
    .then(response => {
      const { name, role, userId, expires_in } = response.data;
      const token = `Bearer ${response.data.access_token}`;
      // set the role for permissions
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      const expireTime = Date.now() + expires_in * 1000;
      localStorage.setItem("expiresIn", expireTime);

      // set the user variables in the store
      commit("AUTH_SUCCESS", {
        name,
        token,
        role,
        userId,
        username,
        expiresIn: expireTime
      });

      axios.defaults.headers.common["Authorization"] = token;

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

    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
}
