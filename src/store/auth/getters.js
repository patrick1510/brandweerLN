export function isAuthenticated(state) {
  return !!state.token;
}

export function authStatus(state) {
  return state.status;
}

export function name(state) {
  return state.name;
}

export function userID(state) {
  return state.userId;
}

export function isTokenExpired(state) {
  if (state.expiresIn) {
    return state.expiresIn < Date.now();
  }
  return false;
}
