<template>
  <q-inner-loading v-if="isLoading" :showing="isLoading">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md"
    />
  </q-inner-loading>
  <q-page class="box" v-else>
    <section class="main_panel">
      <header class="col-12 text-center text-weight-bold">
        <h1>{{ $route.meta.title }}</h1>
      </header>
      <q-expansion-item
        v-if="can('create', 'poll')"
        label="Maak een nieuwe poll aan"
        header-class="text-white text-body1"
        expand-icon-class="text-white"
      >
        <section class="row q-col-gutter-lg pollinputsection">
          <div class="col-sm-12">
            <q-card>
              <q-card-section class="row items-center">
                <!-- TITLE -->
                <q-input
                  v-model="newPoll.title"
                  class="col-xs-12 col-sm-6"
                  label="Titel van de poll"
                  outlined
                  hint=" "
                />
                <!-- DATETIME -->
                <div class="q-pa-md col-xs-12 col-sm-6">
                  <q-input
                    filled
                    v-model="newPoll.datetime"
                    label="Datum & tijd van poll"
                    hint="dd-mm-yyyy uu:mm"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="newPoll.datetime"
                            mask="DD-MM-YYYY HH:mm"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="newPoll.datetime"
                            mask="DD-MM-YYYY HH:mm"
                            format24h
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <!-- DESCRIPTION -->
                <div class="q-pr-md col-12">
                  <q-editor
                    v-model="newPoll.description"
                    min-height="5rem"
                    label="aanvullende informatie oefening (optioneel)"
                    outlined
                  />
                </div>
              </q-card-section>
              <q-card-actions class="q-pa-md flex align-center justify-start">
                <q-btn
                  :disabled="!validateNewPoll"
                  @click="createPoll()"
                  icon="add"
                  >Maak aan</q-btn
                >
                <p v-if="!validateNewPoll" class="validate-new-poll-text">
                  Vul alle velden in
                </p>
              </q-card-actions>
            </q-card>
          </div>
        </section>
      </q-expansion-item>
      <section class="row q-col-gutter-lg pollssection">
        <h1 v-if="Object.keys(polls).length === 0">Polls aan het laden...</h1>
        <div
          v-for="poll of polls"
          :key="poll.pollId"
          class="col-sm-12 col-md-6"
        >
          <!-- poll userid: {{poll.userId}}
        login userid: {{userID}} -->
          <pollcard
            :title="poll.titel"
            :eventdatetime="poll.vindtPlaatsOp"
            :description="poll.omschrijving"
            :pollanswers="poll.antwoorden"
            :id="poll.pollId"
            :deleteoption="poll.userId === userID"
          />
        </div>
      </section>
    </section>
  </q-page>
</template>

<script>
import { ConvertDateTime } from "../helpers.js";
import { Notify } from "quasar";
import PollCard from "../components/PollCard.vue";
export default {
  name: "Polls",
  components: {
    pollcard: PollCard
  },
  data() {
    return {
      isLoading: false,
      newPoll: {
        title: "",
        datetime: "",
        description: ""
      },
      refreshedPolls: {}
    };
  },
  created() {
    this.getPolls();
  },
  watch: {
    "this.$store.state.polls": function() {
      alert("store polls changed");
    }
  },
  computed: {
    polls() {
      const objts = this.$store.getters["polls/getPolls"];
      let polls = [];
      for (var obj of Object.keys(objts)) {
        polls.push(objts[obj]);
      }
      polls.reverse();
      return this.convertArrayToObject(polls, "pollId");
    },
    userID() {
      return this.$store.getters["auth/userID"];
    },
    validateNewPoll() {
      return (
        this.newPoll.title &&
        this.newPoll.datetime &&
        !(!this.newPoll.description || this.newPoll.description === "<br>")
      );
    }
  },
  methods: {
    convertArrayToObject(array, key) {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item
        };
      }, initialValue);
    },
    getPolls() {
      this.isLoading = true;
      this.$store
        .dispatch("polls/getPolls")
        .then(polls => {})
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    createPoll() {
      this.isLoading = true;
      if (this.newPoll.datetime) {
        const CnvrtDT = new ConvertDateTime(this.newPoll.datetime);
        this.$store
          .dispatch("polls/createPoll", {
            title: this.newPoll.title,
            description: this.newPoll.description,
            datetimeISO: CnvrtDT.NLtoISO()
          })
          .then(poll => {
            Notify.create({
              message: "Poll aangemaakt!",
              color: "green",
              textColor: "white"
            });
            this.newPoll.title = "";
            this.newPoll.datetime = "";
            this.newPoll.description = "";
          })
          .catch(err => {
            Notify.create({
              message: "Het aanmaken van de poll ging mis",
              caption: "Zijn alle velden goed ingevuld?",
              icon: "error",
              color: "primary",
              textColor: "white"
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.main_panel
  background-color: $primary
  border-radius: 20px
header
  padding-top: 30px
.pollssection, .pollinputsection
  padding: 20px
.validate-new-poll-text
  margin: 0
  margin-left: 1rem
  color: orange
</style>
