export default function() {
  return {
    name: localStorage.getItem("name") || null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    username: localStorage.getItem("username") || null,
    expiresIn: localStorage.getItem("expiresIn") || null
  };
}
