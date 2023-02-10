  <template>
    <div>
      <dia-log 
        :item = "[
          {
            width: '900px',
            model: evaluate_users_dialog,
            action: 'saveDialog1',
            edit: true,
            label: 'Lưu và thoát',
            icon: 'save'
          }
          ]
        "
        :show_button='false'
        @closeDialog="(val) => (evaluate_users_dialog = val)"
      >
        <template slot="header">
          <span>Đánh giá của người dùng</span>
        </template>
        <template slot="content">
          <v-layout wrap>
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Grade</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-select
                v-bind:items="listGradeItems"
                v-model="gradeModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                clearable
                return-object
                @input="inputGrade"
              >
              </v-select>
            </v-flex>
            <v-flex xs2>
              <v-subheader class="px-0 pull-right pr-3">Chọn Semester</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-select
                v-bind:items="listSemesterItems"
                v-model="semesterModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                return-object
                clearable
                :disabled="gradeModel === ''"
                @input="inputSemester"
              >
              </v-select>
            </v-flex>
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Week</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-select
                v-bind:items="listWeekItems"
                v-model="weekModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                return-object
                clearable
                :disabled="semesterModel === ''"
                @input="inputWeek"
              >
              </v-select>
            </v-flex>
            <v-flex xs2>
              <v-subheader class="px-0 pull-right pr-3">Chọn Day</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-select
                v-bind:items="listDayItems"
                v-model="dayModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                return-object
                clearable
                :disabled="weekModel === ''"
                @input="inputDay"
              >
              </v-select>
            </v-flex>
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Lesson</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-select
                v-bind:items="listLessonItems"
                v-model="lessonModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                return-object
                clearable
                :disabled="dayModel === ''"
                @input="inputLesson"
              >
              </v-select>
            </v-flex>
          </v-layout>
          <table class="table table-bs mt-3">
            <tr :key="index" v-for="(item, index) in listEvaluateItems" v-if="Number(item.star) !== 0 || item.comment">
              <td class="col-xs-4">
                <jx-mobilink-star
                  class="starClass ml-2"
                  :end_point= "end_point"
                  :evaluate="Number(item.star)"
                  showStar="true"
                ></jx-mobilink-star>
              </td>
              <td class="col-xs-8">
                <span style="white-space: pre-line;">{{ item.comment }}</span>
              </td>
            </tr>
          </table>
        </template>
      </dia-log>
    </div>
  </template>

  <script>
    const COMPONENT_NAME = 'evaluate-users'
    export default {
      name: COMPONENT_NAME,
      components: {
      },
      computed: {
        userInformation: function () { return this.$store.state.userInformation }
      },
      watch: {
      },
      data () {
        return {
          evaluate_users_dialog: false,
          listEvaluateItems: [],
          listGradeItems: [],
          gradeModel: '',
          listSemesterItems: [],
          semesterModel: '',
          listWeekItems: [],
          weekModel: '',
          listDayItems: [],
          dayModel: '',
          listLessonItems: [],
          lessonModel: ''
        }
      },
      created () {
        this.$nextTick(function () {
        })
      },
      methods: {
        initGetData () {
          var vm = this
          vm.evaluate_users_dialog = true
          vm.getListSelect()
        },
        getListSelect () {
          var vm = this
          window.axios.get(vm.end_point + 'lists?type=1')
            .then(function (response) {
              var serializable = response.data
              vm.listGradeItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        inputGrade () {
          var vm = this
          var url = vm.end_point + 'semesters/' + vm.gradeModel._id
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.listSemesterItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        inputSemester () {
          var vm = this
          var url = vm.end_point + 'weeks/' + vm.semesterModel._id
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.listWeekItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        inputWeek () {
          var vm = this
          var url = vm.end_point + 'days/' + vm.weekModel._id
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.listDayItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        inputDay () {
          var vm = this
          var url = vm.end_point + 'lessons/' + vm.dayModel._id
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.listLessonItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        inputLesson () {
          var vm = this
          console.log('>>>>>>>>>>>>vm.gradeModel', vm.gradeModel)
          var param = {
            params: {
              'id_grade': vm.gradeModel._id,
              'id_semester': vm.semesterModel._id,
              'id_week': vm.weekModel._id,
              'id_day': vm.dayModel._id,
              'id_lesson': vm.lessonModel._id
            }
          }
          var url = vm.end_point + 'points/' + vm.userInformation._id
          window.axios.get(url, param)
            .then(function (response) {
              var serializable = response.data
              vm.listEvaluateItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        deleteUser (item, index) {
          var vm = this
          var url = vm.end_point + 'users/' + item._id
          vm.$dialog.confirm('Bạn muốn xóa dữ liệu', {
            html: true,
            loader: true,
            okText: 'Xác nhận',
            cancelText: 'Quay lại',
            animation: 'fade'
          })
            .then(function (dialog) {
              window.axios.delete(url)
                .then(function (response) {
                  window.showMessageToastr('success', 'Xóa dữ liệu thành công')
                  vm.getUser()
                })
                .catch(function (error) {
                  console.log(error.response)
                })
              dialog.close()
              return false
            })
            .catch(function (e) {
              console.log(e)
            })
        }
      }
    }
  </script>
  <style type="text/css" scoped>
  </style>