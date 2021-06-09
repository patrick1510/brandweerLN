import axios from "axios";
import { Notify } from "quasar";

export default ({ store }) => {
  axios.interceptors.request.use(
    function(config) {
      // TODO check if user is logged in for too long
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      // handle error
      if (!error.response.isOk) {
        Notify.create({
          message: "Something went wrong!",
          icon: "warning",
          color: "primary",
          textColor: "white"
        });
      }
    }
  );
};
