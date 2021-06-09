export function AUTH_REQUEST(state) {
  state.status = "loading";
}
export function AUTH_SUCCESS(
  state,
  { expiresIn, name, role, token, userId, username }
) {
  console.log("expireTime in store set at: ", expiresIn);
  state.name = name;
  state.role = role;
  state.status = "success";
  state.token = token;
  state.userId = userId;
  state.expiresIn = expiresIn;
  state.username = username;
}
export function AUTH_ERROR(state) {
  state.status = "error";
}
export function AUTH_LOGOUT(state) {
  // Very ugly way to do this, but I cant get the persisted stated to work JM - 9-6-21
  state.status = "logged_out";
  state.expiresIn = null;
  state.name = null;
  state.role = null;
  state.token = null;
  state.userId = null;
  state.username = null;
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("sessionstorage");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("expiresIn");
}

export function TOKEN_EXPIRED(state) {
  state.expired = true;
}
