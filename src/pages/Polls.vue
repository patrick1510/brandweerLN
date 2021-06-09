<template>
  <q-page>
    <section class="polls_panel">
      <header class="col-12 text-center text-weight-bold">
        <h1>Polls</h1>
      </header>
      <section class="row q-col-gutter-lg cardssection">
        <div
          v-for="poll of polls"
          :key="poll.pollId" class="col-sm-12"
          :class="(polls.length > 1 ? ' col-md-6' : 'col-md-12') + (polls.length > 2 ? ' col-lg-4' : (polls.length > 1 ? ' col-lg-6' : ' col-lg-12'))"
        >
          <q-card
            @click="link(poll.pollId)"
            class="polls-card bg-white text-black"
            >
            <q-card-section>
              <h2>{{ poll.titel }}</h2>
              <div class="text-subtitle2">
                <datetime :value="poll.vindtPlaatsOp" />
              </div>
            </q-card-section>
            <q-card-section>
              {{ poll.omschrijving }}
            </q-card-section>
            <q-card-section>
              <table>
                <tr>
                  <td>ja:</td><td>{{answers(poll.antwoorden).yes}}</td>
                </tr>
                <tr>
                  <td>nee:</td><td>{{answers(poll.antwoorden).no}}</td>
                </tr>
              </table>
            </q-card-section>
            <q-card-actions>
              <q-btn flat>bewerken</q-btn>
              <q-btn flat>verwijderen</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </section>
    </section>
  </q-page>
</template>

<script>
import DateTimeEl from "../components/DateTimeEl.vue"
export default {
  name: "PageLogin",
  components: {
    'datetime': DateTimeEl
  },
  methods: {
    link: function (id) {
      this.$router.push({ name: 'ViewPollSection', params: { id: id } });
    },
    answers: function (answrs) {
      // let answrsArr = []
      var yes = 0;
      var no = 0;
      for(const key of Object.keys(answrs)) {
        // answrsArr.push(answrs[key])
        answrs[key].antwoord === 'ja' ? yes++ : no++;
      }
      return { yes, no }
      // console.dir(answrsArr)
      // return answrsArr
    }
  },
  data() {
    return {
      polls: [
        {
          pollId: "3e4d5f7f-ed3c-4500-b3aa-c9901527334c",
          userId: "63f474ec-29cb-405b-8e5e-e34e45bfa9f0",
          aangemaaktOp: "2021-06-04T10:40:15.845517",
          vindtPlaatsOp: "2021-05-30T17:23:00",
          titel: "Test titel 1",
          omschrijving: "Test omschrijving 1",
          antwoorden: {
            "d63bc406-0c1d-4bc3-b740-817e6ae08f89": {
              antwoordId: "d63bc406-0c1d-4bc3-b740-817e6ae08f89",
              userId: "7e296deb-0b4f-4815-a924-ffeaa7e3396c",
              antwoord: "ja"
            },
            "00d63bc406-0c1d-4bc3-b740-817e6ae08f89": {
              antwoordId: "d63bc406-0c1d-4bc3-b740-817e6ae08f89",
              userId: "7e296deb-0b4f-4815-a924-ffeaa7e3396c",
              antwoord: "ja"
            },
            "00000d63bc406-0c1d-4bc3-b740-817e6ae08f89": {
              antwoordId: "d63bc406-0c1d-4bc3-b740-817e6ae08f89",
              userId: "7e296deb-0b4f-4815-a924-ffeaa7e3396c",
              antwoord: "nee"
            }
          }
        },
        {
          pollId: "a112e93c-c9fa-411a-9236-b7a6bacd63fe",
          userId: "63f474ec-29cb-405b-8e5e-e34e45bfa9f0",
          aangemaaktOp: "2021-06-04T10:50:34.44371",
          vindtPlaatsOp: "2021-06-30T09:30:00",
          titel: "Test titel2",
          omschrijving: "Test omschrijving",
          antwoorden: {}
        },
        {
          pollId: "0000000a112e93c-c9fa-411a-9236-b7a6bacd63fe",
          userId: "63f474ec-29cb-405b-8e5e-e34e45bfa9f0",
          aangemaaktOp: "2021-06-04T10:50:34.44371",
          vindtPlaatsOp: "2021-06-30T09:30:00",
          titel: "Test titel2",
          omschrijving: "Test omschrijving",
          antwoorden: {}
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
  .polls_panel
    margin-left: 0
    background-color: $primary
    border-radius: 20px
  .polls_panel table
    width: 100%
  .polls_panel table tr td
    width: 50%
  header
    padding-top: 20px
  .cardssection
    // margin-right: 20px
    // padding-bottom: 20px
    padding: 20px
</style>
