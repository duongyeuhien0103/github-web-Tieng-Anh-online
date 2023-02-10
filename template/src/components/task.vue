<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <h3 style="text-align: center;" class="scrollTopClass">{{ tasksItems.data[0].name }}</h3>
        <p v-html="tasksItems.data[0].text" class="viewEditorClass"></p>
        <p>Time: {{ tasksItems.data[0].time }}</p>
        <p v-if="tasksItems.data[0].link">Link: <a :href="tasksItems.data[0].link" target="_blank">{{ tasksItems.data[0].link }}</a></p>
      </v-flex>
      <!-- {{nooo}} -->
      <v-flex xs12 style="text-align: center;">
        <img :src="test(tasksItems.data[0].picture)" v-if="tasksItems.data[0].picture.length!==0">
      </v-flex>
      <v-flex xs12 class="pt-3">
        <v-btn 
          color="primary"
          dark
          class="ma-0 float-left"
          v-if="(tasksItems.data[0].worksheet === 'true' || tasksItems.data[0].worksheet === true) && userInformation.permission !== 'guest'"
          @click="printImg(test(tasksItems.data[0].picture))"
          >
          Print
        </v-btn>
        <v-btn 
          color="primary"
          dark
          class="ma-0 float-right"
          @click="nextTask()"
          v-if="tasksItems.point >= 80 || showNext || userInformation.permission === 'guest'"
          >
          Next Task
        </v-btn>
        <v-btn 
          color="primary mr-3"
          dark
          class="ma-0 float-right"
          @click="clickQuestion()"
          v-if="(!showNext && tasksItems.point < 80) && (userInformation.permission !== 'guest')"
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
    this.setMinHeightMoveLayoutWraper()
    // this.clickQuestion()
  },
  computed: {
    historyOpen: function () {
      return JSON.parse('[' + this.$store.state.userInformation.open + ']')
    },
    userInformation: function () { return this.$store.state.userInformation },
    listGradeItems: function () { return this.$store.state.listGradeItems }
  },
  methods: {
    test (item) {
      return require('../img/task/' + item)
    },
    initTask () {
      this.nooo = this.$route.params.id
      var vm = this
      console.log('>>>>>>>.vm.historyOpen[0].task', this.$route.params.id)
      if (vm.listGradeItems[vm.historyOpen[0].grade].listTaskItems.length - 1 !== vm.historyOpen[0].task) {
        vm.showNext = true
      } else {
        vm.showNext = false
      }
      var config = {
        params: {
          id_user: vm.userInformation._id
        }
      }
      var url = vm.end_point + 'tasks/detail/' + this.$route.params.id
      window.axios.get(url, config)
        .then(function (response) {
          var serializable = response.data
          vm.tasksItems = serializable
          console.log('>>>>>>>>>>>>m.tasksItems', vm.tasksItems.data[0])
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    nextTask () {
      var vm = this
      // vm.$router.push('/task/' + item._id)
      var params = new URLSearchParams()
      var open = {}
      setTimeout(function () {
        window.$('.scrollTopClass').animate({scrollTop: 1000}, 1000)
      }, 2000)
      console.log('>>>>>>>>>>>(vm.listTaskItems', vm.historyOpen[0].task)
      console.log('>>>>>>>>>>>(vm.lenghth', vm.listGradeItems[vm.historyOpen[0].grade].listTaskItems.length)
      console.log('>>>>>>>>>>>(vm.listGradeItems', vm.listGradeItems)
      open = {
        'grade': vm.historyOpen[0].grade,
        'semester': vm.historyOpen[0].semester,
        'week': vm.historyOpen[0].week,
        'day': vm.historyOpen[0].day,
        'lesson': vm.historyOpen[0].lesson,
        'task': vm.historyOpen[0].task
      }
      if (vm.listGradeItems[vm.historyOpen[0].grade].listTaskItems.length - 1 !== vm.historyOpen[0].task) {
        open.task = vm.historyOpen[0].task + 1
      } else {
        vm.showNext = false
        if (vm.listGradeItems[vm.historyOpen[0].grade].listLessonItems.length - 1 !== vm.historyOpen[0].lesson) {
          open.lesson = vm.historyOpen[0].lesson + 1
          open.task = 0
        } else {
          if (vm.listGradeItems[vm.historyOpen[0].grade].listDayItems.length - 1 !== vm.historyOpen[0].day) {
            open.day = vm.historyOpen[0].day + 1
            open.lesson = 0
            open.task = 0
          } else {
            if (vm.listGradeItems[vm.historyOpen[0].grade].listWeekItems.length - 1 !== vm.historyOpen[0].week) {
              open.week = vm.historyOpen[0].week + 1
              open.day = 0
              open.lesson = 0
              open.task = 0
            } else {
              if (vm.listGradeItems[vm.historyOpen[0].grade].listSemesterItems.length - 1 !== vm.historyOpen[0].semester) {
                open.semester = vm.historyOpen[0].semester + 1
                open.week = 0
                open.day = 0
                open.lesson = 0
                open.task = 0
              } else {
                open.grade = vm.historyOpen[0].grade + 1
              }
            }
          }
        }
      }
      params.append('open', JSON.stringify(open))
      if (window.localStorage.getItem('token')) {
        vm.putUser(params)
      } else {
        vm.$store.commit('updateUserInformation', {
          open: JSON.stringify(open),
          permission: 'guest'
        })
      }
    },
    putUser (params) {
      var vm = this
      window.axios.put(vm.end_point + 'users/' + vm.userInformation._id,
        params
      )
        .then(function (response) {
          vm.$store.commit('updateUserInformation', response.data)
          vm.$router.push('/task/' + vm.listGradeItems[vm.historyOpen[0].grade].listTaskItems[vm.historyOpen[0].task]._id)
        })
        .catch(function (error) {
          console.log(error.response)
        })
    },
    clickQuestion () {
      this.$router.push('/question/' + this.listGradeItems[this.historyOpen[0].grade].listLessonItems[this.historyOpen[0].lesson]._id)
    },
    printImg (i) {
      let printContents = '<div style="text-align:center"><img width="80%" src="' + i + '"></div>'
      var w = window.open()
      w.document.write(printContents)
      setTimeout(function () {
        w.print()
        w.close()
      }, 10)
    }
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
.viewEditorClass>p{
  margin: 0!important;
}
</style>
