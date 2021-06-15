import axios from "axios";

export function getPolls(store) {
  return axios
    .get("https://brandweer-pollqueryservice.azurewebsites.net/polls")
    .then(response => {
      const polls = response.data;
      store.commit("SET_POLLS", polls);
      return polls;
    });
}

export function getPoll(store, pollId) {
  return (
    store.state.polls[pollId] ??
    axios
      .get(
        `https://brandweer-pollqueryservice.azurewebsites.net/polls/${pollId}`
      )
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
export function createPoll(store, { title, description, datetimeISO }) {
  return axios
    .post(`https://brandweer-pollcommandservice.azurewebsites.net/polls/`, {
      titel: title,
      omschrijving: description,
      vindtPlaatsOp: datetimeISO
    })
    .then(response => {
      const returndata = response.data;
      store.commit("NEW_POLL", returndata);
    });
}
export function removePoll(store, id) {
  return axios
    .delete(
      `https://brandweer-pollcommandservice.azurewebsites.net/polls/${id}`
    )
    .then(response => {
      store.commit("DEL_POLL", id);
    });
}
export function setAnswer(store, { pollId, answer }) {
  return axios
    .post(
      `https://brandweer-pollcommandservice.azurewebsites.net/polls/${pollId}/antwoorden`,
      {
        antwoord: answer
      }
    )
    .then(response => {
      console.log("got a response");
      const newAnswer = response.data;
      store.commit("SET_ANSWER", { pollId, answer: newAnswer });
      return newAnswer;
    });
}
export function removeAnswer(store, { pollId, answerId }) {
  return axios
    .delete(
      `https://brandweer-pollcommandservice.azurewebsites.net/polls/${pollId}/antwoorden/${answerId}`
    )
    .then(response => {
      store.commit("DEL_ANSWER", { pollId, answerId });
    });
}
