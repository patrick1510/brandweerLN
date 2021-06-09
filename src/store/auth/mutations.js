export function AUTH_REQUEST(state) {
  state.status = "loading";
}
export function AUTH_SUCCESS(state, { username, token }) {
  state.status = "success";
  state.username = username;
  state.token = token;
}
export function AUTH_ERROR(state) {
  state.status = "error";
}
export function AUTH_LOGOUT(state) {
  console.log("logging out");
  state.status = "logged_out";
  state.username = null;
  state.token = null;
}
