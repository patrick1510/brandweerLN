import Vue from 'vue'
export function SET_POLL(state, poll) {
  if (!state.polls[poll.pollId]) {
    state.polls[poll.pollId] = poll;
  }
}
export function NEW_POLL(state, returndata) {
  const currentPolls = state.polls;
  const newPolls = {
    ...currentPolls,
    [returndata.pollId]: {
      pollId: returndata.pollId,
      titel: returndata.titel,
      vindtPlaatsOp: returndata.vindtPlaatsOp,
      omschrijving: returndata.omschrijving,
      userId: returndata.userId,
      antwoorden: {}
    }
  };
  state.polls = newPolls;
}
export function DEL_POLL(state, pollId) {
  const newPolls = state.polls;
  Vue.delete(newPolls,pollId);
  state.polls = newPolls;
}
export function DEL_ANSWER(state, { pollId, answerId }) {
  const newAnswers = state.polls[pollId].antwoorden;
  Vue.delete(newAnswers, answerId);
  state.polls[pollId].antwoorden = newAnswers;
}
export function SET_ANSWER(state, { pollId, answer }) {
  const currentAnswers = state.polls[pollId].antwoorden;
  const newAnswers = {
    ...currentAnswers,
    [answer.antwoordId]: answer
  };
  state.polls[pollId].antwoorden = newAnswers;
}

export function SET_POLLS(state, polls) {
  state.polls = polls.reduce((pollAcc, poll) => {
    return {
      [poll.pollId]: poll,
      ...pollAcc
    };
  }, {});
}
