<template>
  <q-inner-loading v-if="isLoading" :showing="isLoading">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md"
    />
  </q-inner-loading>

  <q-page
    v-else-if="poll"
    class="page-container flex column justify-start items-stretch"
  >
    <q-btn
      @click="goTo('PollsOverview')"
      class="text-body1 bg-primary text-white"
      >&lt; Terug naar polls overzicht</q-btn
    >

    <q-card class="bg-primary q-pa-lg flex column flex-center items-stretch">
      <header class="col-12 text-center text-weight-bold">
        <h2 class="poll__title">{{ poll.titel }}</h2>
      </header>
      <q-card-section
        class="poll__field bg-white text-center text-body1 no-border-radius"
        >{{ poll.omschrijving }}</q-card-section
      >
      <q-card-section
        class="poll__field bg-white text-center text-body1 no-border-radius"
        >{{ convertDateLocal(poll.vindtPlaatsOp) }}</q-card-section
      >
      <q-card-section
        class="poll__field flex column bg-white text-center text-body1 no-border-radius"
      >
        <p>Mijn aanwezigheid</p>
        <div
          class="answer-buttons flex justify-center"
          :class="{ 'q-mb-md': isAnswerSet }"
        >
          <q-btn
            @click="answer('ja')"
            class="answer-button answer-button--yes q-mr-md"
            :class="{ chosen: isUserAttending }"
            :disable="isLoading || isAnswerSet"
            >Ja</q-btn
          ><q-btn
            @click="answer('nee')"
            class="answer-button answer-button--no"
            :disable="isLoading || isAnswerSet"
            :class="{ chosen: isUserNotAttending }"
            >Nee</q-btn
          >
        </div>
        <p class="text-caption" v-if="isAnswerSet">
          Verwijder het antwoord hieronder om het aan te passen
        </p>
      </q-card-section>
    </q-card>

    <q-card
      v-if="can('update', 'poll') && answers.length > 0"
      class="bg-primary q-pa-lg"
    >
      <h2 class="poll__title">Aanwezigheidslijst</h2>
      <div v-for="answer of answers" :key="answer.antwoordId">
        <q-card-section
          class="bg-white text-center no-border-radius flex justify-between"
        >
          <div>{{ answer.name }}</div>
          <div>{{ answer.antwoord }}</div>
          <q-btn
            @click="removeAnswer(answer.antwoordId)"
            round
            color="primary"
            icon="delete"
            dense
          />
        </q-card-section>
      </div>
    </q-card>
  </q-page>

  <h1 v-else>Geen poll gevonden</h1>
</template>

<script>
import { ConvertDateTime } from "../helpers.js";
export default {
  name: "PollView",
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.isLoading = true;
    this.$store
      .dispatch("polls/getPoll", this.id)
      .then(poll => {})
      .catch(err => {
        console.log("Something went wrong getting the poll", err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    poll() {
      // return this.$store.state.polls.polls[this.id] ?? {};
      const polls = this.$store.getters["polls/getPolls"];
      return polls[this.id];
    },
    answers() {
      return Object.values(this.poll.antwoorden);
    },
    myAnswer() {
      if (!this.poll) {
        return "";
      }
      return this.answers.find(answer => {
        return answer.userId === this.$store.state.auth.userId;
      })?.antwoord;
    },
    isAnswerSet() {
      return !!this.myAnswer;
    },
    isUserAttending() {
      return this.isAnswerSet && this.myAnswer === "ja";
    },
    isUserNotAttending() {
      return this.isAnswerSet && this.myAnswer === "nee";
    }
  },
  methods: {
    convertDateLocal(date) {
      const cdt = new ConvertDateTime(date);
      return cdt.ISOtoNL();
    },
    answer(response) {
      if (
        confirm("Weet u het zeker? Het antwoord kan niet meer worden aangepast")
      ) {
        this.isLoading = true;
        this.$store
          .dispatch("polls/setAnswer", {
            pollId: this.id,
            answer: response
          })
          .then(() => {
            Notify.create({
              title: "Antwoord ingevuld!",
              icon: "success",
              color: "green",
              textColor: "white"
            });
          })
          .catch(() => {
            Notify.create({
              title: "Het zetten van het antwoord ging mis",
              icon: "error",
              color: "primary",
              textColor: "white"
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    removeAnswer(answerId) {
      this.$store
        .dispatch("polls/removeAnswer", {
          pollId: this.id,
          answerId: answerId
        })
        .then(() => {});
    },
    goTo(e) {
      this.$router.push({ name: e });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 24rem;
  gap: 3rem;
  @media (max-width: 24em) {
    width: 100%;
  }
}
.poll {
  &__title {
    text-align: center;
    color: white;
    margin-bottom: 0.5rem;
  }
  &__field {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
.answer-button {
  &--yes {
    &:hover {
      &:not(:disabled) {
        color: white;
        background: green;
      }
    }
    &.chosen {
      color: white;
      background: green;
    }
  }
  &--no {
    &:hover {
      &:not(:disabled) {
        color: white;
        background: red;
      }
    }
    &.chosen {
      color: white;
      background: red;
    }
  }
}
</style>
