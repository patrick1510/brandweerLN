export default function() {
  return {
    admin: {
      poll: ["view", "create", "update", "delete"],
      answer: ["view", "create", "update", "delete"],
      answerstats: ["view"]
    },
    user: {
      poll: ["view"],
      answer: ["view", "create"],
      answerstats: []
    }
  };
}
