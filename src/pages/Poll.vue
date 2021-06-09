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
    <q-card class="bg-primary q-pa-lg flex column flex-center items-stretch">
      <h2 class="poll__title">{{ poll.titel }}</h2>
      <q-card-section
        class="poll__field bg-white text-center no-border-radius"
        >{{ poll.omschrijving }}</q-card-section
      >
      <q-card-section
        class="poll__field bg-white text-center no-border-radius"
        >{{ convertDateLocal(poll.vindtPlaatsOp) }}</q-card-section
      >
      <q-card-section
        class="poll__field flex column bg-white text-center no-border-radius"
      >
        <div class="answer-buttons flex justify-center">
          <q-btn
            @click="answer('ja')"
            class="answer-button answer-button--yes"
            :class="{ chosen: isUserAttending }"
            :disable="isAnswerSet"
            >Ja</q-btn
          ><q-btn
            @click="answer('nee')"
            class="answer-button answer-button--no"
            :disable="isAnswerSet"
            :class="{ chosen: isUserNotAttending }"
            >Nee</q-btn
          >
        </div>
        <small v-if="isAnswerSet"
          >Het is niet mogelijk het antwoord aan te passen</small
        >
      </q-card-section>
    </q-card>

    <q-card>
      test
    </q-card>
  </q-page>

  <h1 v-else>Geen poll gevonden</h1>
</template>

<script>
import { convertDate } from "../helpers";
export default {
  name: "PollView",
  data() {
    return {
      isLoading: true
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
      .then(poll => {
        if (poll) console.log("got poll!", poll);
      })
      .catch(err => {
        console.log(
          "Something went wrong sending the request to the store",
          err
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    poll() {
      return this.$store.state.polls.polls[this.id] ?? {};
    },
    myAnswer() {
      if (!this.poll) {
        return {};
      }
      return Object.values(this.poll.antwoorden).find(answer => {
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
      return convertDate(date);
    },
    answer(response) {
      //TODO dispatch call
      console.log(response);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  gap: 3rem;
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
