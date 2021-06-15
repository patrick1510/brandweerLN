<template>
  <q-card @click="link(id)" class="polls-card text-black fit">
    <q-card-section>
      <q-toolbar>
        <q-toolbar-title>
          <h3>{{ title }}</h3>
          <div class="text-subtitle2">
            {{NLDateTime}}
          </div>
        </q-toolbar-title>
        <q-btn v-if="can('delete', 'poll') && deleteoption" @click.stop="removePoll(id)" flat round dense icon="cancel" />
      </q-toolbar>
    </q-card-section>
    <q-card-section class="description" v-html="description">
    </q-card-section>
    <q-card-section v-if="!can('view', 'answerstats')">
      <table>
        <tr><td>eigen aanwezigheid:</td>
          <td v-if="answers.yes" class="text-green">aanwezig</td>
          <td v-else-if="answers.no" class="text-red">niet aanwezig</td>
          <td v-else class="text-grey-5">niks opgegeven</td>
        </tr>
      </table>
    </q-card-section>
    <template v-if="can('view', 'answerstats')">
      <div class="placeholder"></div>
      <div class="fixedbottom">
        <q-card-section>
          <table>
            <tr>
              <td>ja: {{ answers.yes }}</td>
              <td>nee: {{ answers.no }}</td>
            </tr>
          </table>
        </q-card-section>
        <q-card-actions v-if="can('update', 'polls')" class="fixedbottom">
          <q-btn flat>bewerken</q-btn>
          <q-btn flat>verwijderen</q-btn>
        </q-card-actions>
      </div>
    </template>
  </q-card>
</template>
<script>
import { ConvertDateTime } from "../helpers.js";
export default {
  name: "PollCard",
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    eventdatetime: {
      type: String,
      default: ""
    },
    description: {
      type: String
    },
    pollanswers: {
      type: Object
    },
    deleteoption: {
      type: Boolean
    }
  },
  computed: {
    answers: function() {
      var yes = 0;
      var no = 0;
      if(this.pollanswers) {
        for (const key of Object.keys(this.pollanswers)) {
          this.pollanswers[key].antwoord === "ja" ? yes++ : no++;
        }
      }
      return { yes, no };
    },
    NLDateTime: function () {
      const cdt = new ConvertDateTime(this.eventdatetime);
      return cdt.ISOtoNL()
    }
  },
  methods: {
    link: function(id) {
      this.$router.push({ name: "ViewPoll", params: { id } });
    },
    removePoll: function (id) {
      this.$store
        .dispatch("polls/removePoll", id)
        .then(poll => {
        })
        .catch(err => {
          console.log("Something went wrong creating the poll", err);
        })
        .finally(() => {
          // this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="sass" scoped>
.placeholder
  height: 45px
.fixedbottom
  // padding: 12px
  width: 100%
  position: absolute
  bottom: 0px
.description
  padding: 14px 28px
  font-style: italic
.polls-card
  background-color: white
  font-size: 1.1rem
.polls-card:hover
  cursor: pointer
  background-color: #deeff5
table
  width: 100%
  margin: 0 10px
  tr td
    width: 50%
    font-weight: bold
    font-size: 1.2rem
.q-toolbar__title.ellipsis
  padding-top: 12px
  white-space: normal
  overflow: auto
</style>
