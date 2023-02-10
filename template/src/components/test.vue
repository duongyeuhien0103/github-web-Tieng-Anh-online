<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <h3 style="text-align: center;">{{ tasksItems[0].name }}</h3>
        <p>{{ tasksItems[0].text }}</p>
        <p>Time: {{ tasksItems[0].time }}</p>
        <p>Link: <a :href="tasksItems[0].link" target="_blank">{{ tasksItems[0].link }}</a></p>
      </v-flex>
      <!-- {{nooo}} -->
      <!-- <v-flex xs12 style="text-align: center;">
        <img :src="test(tasksItems[0].picture)" v-if="tasksItems[0].picture.length!==0">
      </v-flex> -->
      <v-flex xs12>
        <v-btn 
          color="primary"
          dark
          class="ma-0 float-right"
          @click="nextTask()"
          v-if="showNext"
          >
          Next Task
        </v-btn>
        <v-btn 
          color="primary"
          dark
          class="ma-0 float-right"
          @click="nextTask()"
          v-if="!showNext"
          >
          Question
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      nooo: 0,
      tasksItems: '',
      showNext: true
    }
  },
  watch: {
    '$route.params.id' () {
      this.initTask()
    }
  },
  mounted () {
    this.initTask()
  },
  computed: {
    historyOpen: function () {
      return JSON.parse('[' + this.$store.state.userInformation.open + ']')
    },
    userInformation: function () { return this.$store.state.userInformation },
    listGradeItems: function () { return this.$store.state.listGradeItems }
  },
  methods: {
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
