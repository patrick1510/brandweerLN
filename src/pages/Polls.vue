<template>
  <q-inner-loading v-if="isLoading" :showing="isLoading">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md"
    />
  </q-inner-loading>
  <q-page v-else>
    <section class="main_panel">
      <header class="col-12 text-center text-weight-bold">
        <h1>{{ $route.meta.title }}</h1>
      </header>
      <section class="row q-col-gutter-lg mainsection">
        <h1 v-if="polls.length === 0">Geen polls gevonden</h1>
        <div
          v-else
          v-for="poll of polls"
          :key="poll.pollId"
          class="col-sm-12"
          :class="
            (polls.length > 1 ? ' col-md-6' : 'col-md-12') +
              (polls.length > 2
                ? ' col-lg-4'
                : polls.length > 1
                ? ' col-lg-6'
                : ' col-lg-12')
          "
        >
          <PollCard
            :title="poll.titel"
            :eventdatetime="poll.vindtPlaatsOp"
            :description="poll.omschrijving"
            :pollanswers="poll.antwoorden"
            :id="poll.pollId"
          />
        </div>
      </section>
    </section>
  </q-page>
</template>

<script>
import PollCard from "../components/PollCard.vue";
export default {
  name: "Polls",
  components: {
    PollCard: PollCard
  },
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    this.isLoading = true;
    this.$store
      .dispatch("polls/getPolls")
      .then(response => {
        console.log("received polls");
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    polls() {
      return this.$store.state.polls.polls;
    }
  }
};
</script>

<style lang="sass" scoped>
.main_panel
  margin-left: 0
  background-color: $primary
  border-radius: 20px
header
  padding-top: 30px
.mainsection
  padding: 20px
</style>
