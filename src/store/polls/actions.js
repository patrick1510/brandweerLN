import axios from "axios";

export function getPolls(store) {
  axios.get("api/polls/").then(response => {
    const polls = response.data;
    store.commit("SET_POLLS", polls);
  });
}

export function getPoll(store, pollId) {
  // Check if the token is expired

  return (
    store.state.polls[pollId] ??
    axios
      .get(`api/polls/${pollId}`)
      .then(response => {
        const poll = response.data;
        store.commit("SET_POLL", poll);
        return poll;
      })
      .catch(err => {
        return err.response;
      })
  );
}

export function setAnswer(store, { pollId, answer }) {
  axios
    .post(`api/polls/${pollId}/antwoorden`, {
      antwoord: answer
    })
    .then(response => {
      console.log("antwoord", response);
    });
}
