<template>
  <q-card @click="link(id)" class="polls-card text-black fit">
    <q-card-section>
      <h2>{{ title }}</h2>
      <div class="text-subtitle2">
        <datetime :value="eventdatetime" />
      </div>
    </q-card-section>
    <q-card-section class="description">
      {{ description }}
    </q-card-section>
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
  </q-card>
</template>
<script>
import DateTimeEl from "src/components/DateTimeEl.vue";
export default {
  name: "PollCard",
  components: {
    datetime: DateTimeEl
  },
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    eventdatetime: {
      type: String,
      default: "-"
    },
    description: {
      type: String
    },
    pollanswers: {
      type: Object
    }
  },
  computed: {
    answers: function() {
      var yes = 0;
      var no = 0;
      for (const key of Object.keys(this.pollanswers)) {
        this.pollanswers[key].antwoord === "ja" ? yes++ : no++;
      }
      return { yes, no };
    }
  },
  methods: {
    link: function(id) {
      this.$router.push({ name: "ViewPoll", params: { id } });
    }
  }
};
</script>
<style lang="sass" scoped>
.placeholder
  height: 110px
.fixedbottom
  position: absolute
  bottom: 0px
.description
  font-style: italic
.polls-card
  background-color: white
  font-size: 1.1rem
.polls-card:hover
  cursor: pointer
  background-color: #deeff5
table
  width: 100%
  tr td
    width: 50%
    font-weight: bold
    font-size: 1.6rem
</style>
