export default function() {
  return {
    username: null,
    token: localStorage.getItem("user-token") || ""
  };
}
