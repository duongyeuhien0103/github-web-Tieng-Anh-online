<template>
  <div class="theme--light pa-3" style="margin: 10px;background: #fff" v-if="questionItems[0]">
    <v-icon @click="backList">reply</v-icon>
    <v-layout wrap>
      <v-flex xs12>
        <h2 class="title is-6 text-center">{{title}}</h2>
      </v-flex>
      <v-flex xs12 class="has-text-centered">
        <div id="timer" class="center-all">
          <span id="minutes">{{ minutes }}</span>
          <span id="middle">:</span>
          <span id="seconds">{{ seconds }}</span>
        </div>
      </v-flex>
    </v-layout>
    <!-- {{questionItems[0].type}} -->
    <v-layout wrap v-if="questionItems[0].type == 2">
      <v-flex xs12>
        <span v-html="questionItems[0].text"></span>
      </v-flex>
    </v-layout>
    <v-layout wrap v-for="(item, index) in questionItems[0].question_name" :key="index">
      <v-flex xs12 style="color: red">
        <b class="indigo--text">{{ index + 1 }}.</b> {{ item }}
      </v-flex>
      <v-radio-group v-model="questionItems[0].select[index]" class="layout wrap">
        <v-flex v-for="(itemChilds, indexResults) in questionItems[0].choices[index]" v-bind:key="indexResults" xs6>
          <v-radio
            :disabled="disabledRadio"
            class="flex xs6"
            :value="indexResults"
            :label="`${itemChilds}`"
          ></v-radio>
        </v-flex>
      </v-radio-group>
    </v-layout>
    <v-layout wrap class="text-xs-center justify-content">
      <v-btn @click="startTimer" class="primary" v-if="!timer">Bắt đầu</v-btn>
      <v-btn @click="startTimer" class="primary" v-if="count_submit === true">Làm lại</v-btn>
      <v-btn @click="submitQuestion" class="primary" :disabled="disabledRadio">Nộp bài</v-btn>
    </v-layout>
    <dia-log 
      :item = "[
        {
          width: '700px',
          model: evaluate_dialog,
          action: 'saveDialog1',
          edit: true,
          label: 'Lưu và thoát',
          icon: 'save'
        }
        ]
      "
      :show_button = 'false'
      @closeDialog="(val) => (evaluate_dialog = val)"
    >
      <template slot="header">
      </template>
      <template slot="content">
        <v-layout wrap>
          <v-flex xs12><b>Chúc mừng bạn đã vượt qua bài kiểm tra!!!</b> Mời bạn đánh giá bài học để chúng tôi ngày càng hoàn thiện hơn</v-flex>
          <v-flex xs6>
            <jx-mobilink-star
              class="starClass ml-2"
              :class_pk="questionsemestersId"
              :end_point= "end_point"
            ></jx-mobilink-star>
          </v-flex>
          <v-flex xs6>
            <v-text-field 
              v-model="commentModel"
              rows="3"
              multi-line
              placeholder="Góp ý"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
          </v-flex>
          <v-flex xs6>
            <v-btn 
              color="primary"
              dark
              class="ma-0 mt-3"
              @click="sendComment()"
              >
              Gửi
            </v-btn>
          </v-flex>
        </v-layout>
      </template>
    </dia-log>
  </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown'
export default {
  components: {
    FlipCountdown
  },
  props: {
  },
  data () {
    return {
      nooo: 0,
      tasksItems: '',
      showNext: true,
      questionItems: [],
      selected: 1,
      radioGroup: 0,
      timer: null,
      totalTime: 0,
      resetButton: false,
      title: 'Bắt đầu kiểm tra',
      disabledRadio: true,
      count_submit: false,
      evaluate_dialog: false,
      questionsemestersId: '',
      commentModel: ''
    }
  },
  watch: {
    '$route.params.id' () {
      this.initTask()
    }
  },
  mounted () {
    this.initQuestion()
    // this.startTimer()
  },
  computed: {
    historyOpen: function () {
      return JSON.parse('[' + this.$store.state.userInformation.open + ']')
    },
    userInformation: function () { return this.$store.state.userInformation },
    listGradeItems: function () { return this.$store.state.listGradeItems },
    minutes: function () {
      const minutes = Math.floor(this.totalTime / 60)
      return this.padTime(minutes)
    },
    seconds: function () {
      const seconds = this.totalTime - (this.minutes * 60)
      return this.padTime(seconds)
    }
  },
  methods: {
    backList () {
      this.$router.push(this.$store.backToListUrl)
    },
    initQuestion () {
      var vm = this
      var url = vm.end_point + 'questionsemesters/' + this.listGradeItems[this.historyOpen[0].grade].listLessonItems[this.historyOpen[0].lesson]._id
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          console.log('>>>>>>>vm.serializable', serializable.data)
          vm.questionItems = []
          vm.questionItems.push({
            _id: serializable.data[0]._id,
            question_name: JSON.parse(serializable.data[0].question_name),
            choices: JSON.parse(serializable.data[0].choices),
            id_lesson: serializable.data[0].id_lesson,
            answer: serializable.data[0].answer,
            select: [],
            type: serializable.data[0].type,
            text: serializable.data[0].text
          })
          for (var key in vm.questionItems[0].question_name) {
            console.log('>>>>key', key)
            vm.questionItems[0].select.push('')
          }
          vm.totalTime = serializable.data[0].time * 60
          console.log('>>>>>>>vm.questionItems', vm.questionItems)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitQuestion () {
      var vm = this
      // console.log('>>>>>>>>>>>>>vm.questionItems', vm.questionItems)
      for (var key in vm.questionItems[0].select) {
        if (vm.questionItems[0].select[key] === '') {
          vm.questionItems[0].select[key] = 0
        } else {
          vm.questionItems[0].select[key] = vm.questionItems[0].select[key] + 1
        }
      }
      console.log('>>>>>>>>>>>>1111111111>vm.questionItems', vm.questionItems[0].select)
      let paramsApiP = new URLSearchParams()
      paramsApiP.append('user_reply', JSON.stringify(vm.questionItems[0].select))
      paramsApiP.append('id_user', vm.userInformation._id)
      paramsApiP.append('id_lesson', this.listGradeItems[this.historyOpen[0].grade].listLessonItems[this.historyOpen[0].lesson]._id)
      paramsApiP.append('name_lesson', this.listGradeItems[this.historyOpen[0].grade].listLessonItems[this.historyOpen[0].lesson].name)
      paramsApiP.append('id_day', this.listGradeItems[this.historyOpen[0].grade].listDayItems[this.historyOpen[0].day]._id)
      paramsApiP.append('name_day', this.listGradeItems[this.historyOpen[0].grade].listDayItems[this.historyOpen[0].day].name)
      paramsApiP.append('id_week', this.listGradeItems[this.historyOpen[0].grade].listWeekItems[this.historyOpen[0].week]._id)
      paramsApiP.append('name_week', this.listGradeItems[this.historyOpen[0].grade].listWeekItems[this.historyOpen[0].week].name)
      paramsApiP.append('id_semester', this.listGradeItems[this.historyOpen[0].grade].listSemesterItems[this.historyOpen[0].semester]._id)
      paramsApiP.append('name_semester', this.listGradeItems[this.historyOpen[0].grade].listSemesterItems[this.historyOpen[0].semester].name)
      paramsApiP.append('id_grade', this.listGradeItems[this.historyOpen[0].grade].data._id)
      paramsApiP.append('name_grade', this.listGradeItems[this.historyOpen[0].grade].data.name)
      var url = vm.end_point + 'questionsemesters/' + this.listGradeItems[this.historyOpen[0].grade].listLessonItems[this.historyOpen[0].lesson]._id
      window.axios.post(url, paramsApiP)
        .then(function (response) {
          var serializable = response.data
          window.showMessageToastr('success', 'Bạn được ' + response.data.point + '%')
          console.log('>>>>>>>>>>serializable', serializable)
          vm.questionsemestersId = serializable.data._id
          vm.disabledRadio = true
          if (response.data.point < 80 && serializable.data.count_submit > 0) {
            vm.count_submit = true
          } else if (serializable.data.count_submit === 0 && response.data.point < 80) {
            var open = {}
            var params = new URLSearchParams()
            open = {
              'grade': vm.historyOpen[0].grade,
              'semester': vm.historyOpen[0].semester,
              'week': vm.historyOpen[0].week,
              'day': vm.historyOpen[0].day,
              'lesson': vm.historyOpen[0].lesson,
              'task': 0
            }
            params.append('open', JSON.stringify(open))
            window.axios.put(vm.end_point + 'users/' + vm.userInformation._id,
              params
            )
              .then(function (response) {
                vm.$store.commit('updateUserInformation', response.data)
              })
              .catch(function (error) {
                console.log(error.response)
              })
          }
          if (serializable.point >= 80) {
            vm.evaluate_dialog = true
          }
          for (var key in vm.questionItems[0].select) {
            vm.questionItems[0].select[key] = ''
          }
          vm.stopTimer(serializable.data.count_submit < 4)
        })
        .catch(function (error) {
          console.log(error)
        })
      // var array1 = []
      // for (var key1 in vm.questionItems) {
      //   array1.push({
      //     _id: vm.questionItems[key1]._id,
      //     question_name: vm.questionItems[key1].question_name,
      //     choices: vm.questionItems[key1].choices,
      //     id_lesson: vm.questionItems[key1].id_lesson,
      //     answer: vm.questionItems[key1].answer
      //   })
      // }
      // vm.questionItems = array1
      // console.log('>>>>>>>>>>vm.questionItems', vm.questionItems)
    },
    startTimer: function () {
      this.timer = setInterval(() => this.countdown(), 1000)
      // this.resetButton = true
      this.disabledRadio = false
      this.count_submit = false
      this.title = 'Bắt đầu kiểm tra'
    },
    stopTimer: function () {
      clearInterval(this.timer)
      this.timer = true
      // this.resetButton = true
      this.title = 'Thời gian còn lại'
    },
    // resetTimer: function () {
    //   this.totalTime = (25 * 60)
    //   clearInterval(this.timer)
    //   this.timer = null
    //   this.resetButton = false
    //   this.title = 'Let the countdown begin!!'
    // },
    padTime: function (time) {
      return (time < 10 ? '0' : '') + time
    },
    countdown: function () {
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        this.totalTime = 0
        this.disabledRadio = true
        this.submitQuestion()
      }
    },
    sendComment () {
      var vm = this
      var params = new URLSearchParams()
      params.append('comment', vm.commentModel)
      window.axios.put(vm.end_point + 'points/' + vm.questionsemestersId,
        params
      )
        .then(function (response) {
          vm.evaluate_dialog = false
          window.showMessageToastr('success', 'Gửi ý kiến thành công')
        })
        .catch(function (error) {
          console.log(error)
          window.showMessageByAPICode(error.response.status, error.response.data)
        })
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
#timer {
  font-size: 50px;
  line-height: 1;
}
.has-text-centered {
  justify-content: center;
  display: flex;
}
.has-text-centered i {
    font-size: 50px;
}
</style>
