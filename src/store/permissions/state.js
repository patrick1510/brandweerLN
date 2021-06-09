export default function() {
  return {
    admin: {
      poll: ["view", "create", "update", "delete"],
      answer: ["view", "create", "update", "delete"]
    },
    user: {
      poll: ["view"],
      answer: ["view", "create"]
    }
  };
}
