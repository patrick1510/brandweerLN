export function SET_POLL(state, poll) {
  if (!state.polls[poll.pollId]) {
    state.polls[poll.pollId] = poll;
  }
}

export function SET_POLLS(state, polls) {
  state.polls = polls.reduce((pollAcc, poll) => {
    return {
      [poll.pollId]: poll,
      ...pollAcc
    };
  }, {});
}
