<template>
  <div class="">
    <dia-log 
      :item = "[
        {
          width: '900px',
          model: add_new,
          action: 'saveDialog1',
          edit: true,
          label: 'Lưu và thoát',
          icon: 'save'
        }
        ]
      "
      :show_button = 'true'
      @closeDialog="(val) => (add_new = val)"
      @saveDialog1="submit"
    >
      <template slot="header">
        <span v-if="type_id == 1">Thêm mới tên</span>
        <span v-if="type_id == 2">Thêm mới Semester</span>
        <span v-if="type_id == 3">Thêm mới Week</span>
        <span v-if="type_id == 4">Thêm mới Day</span>
        <span v-if="type_id == 5">Thêm mới Lesson</span>
        <span v-if="type_id == 6">Thêm mới Task</span>
        <span v-if="type_id == 7">Thêm mới Question</span>
        <span v-if="type_id == 8">Chỉnh sửa Task</span>
      </template>
      <template slot="content">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-layout wrap v-if="type_id === 1">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn tên cần thêm: *</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-select
                v-bind:items="listNameItems"
                v-model="listNameModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                clearable
              >
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id === 1">
            <v-flex xs2>
              <v-subheader class="px-0" v-if="listNameModel === 1">Tên Grade:</v-subheader>
              <v-subheader class="px-0" v-if="listNameModel === 2">Tên Semester:</v-subheader>
              <v-subheader class="px-0" v-if="listNameModel === 3">Tên Week:</v-subheader>
              <v-subheader class="px-0" v-if="listNameModel === 4">Tên Day:</v-subheader>
              <v-subheader class="px-0" v-if="listNameModel === 5">Tên Lesson:</v-subheader>
              <v-subheader class="px-0" v-if="listNameModel === 6">Tên Task:</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                placeholder=""
                v-model="nameModel"
                :rules="[value => !!value || 'Trường bắt buộc']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id == 6 || type_id == 8">
            <v-flex xs2>
              <v-subheader class="px-0">Thời gian</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                placeholder=""
                v-model="timeModel"
                :rules="[value => !!value || 'Trường bắt buộc']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id == 6 || type_id == 8">
            <v-flex xs2>
              <v-subheader class="px-0">Mô tả</v-subheader>
            </v-flex>
            <v-flex xs10>
              <vue-editor 
                v-model="textModel"
              >
              </vue-editor>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id == 6 || type_id == 8">
            <v-flex xs2>
              <v-subheader class="px-0">Link</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                placeholder=""
                v-model="linkModel"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id == 6 || type_id == 8">
            <v-flex xs2>
              <v-subheader class="px-0">Ảnh</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                placeholder=""
                v-model="picModel"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id !== 1 && type_id !== 8">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Grade</v-subheader>
            </v-flex>
            <v-flex xs10>
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
          </v-layout>
          <v-layout wrap v-if="type_id !== 1 && type_id !== 2 && type_id !== 8">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Semester</v-subheader>
            </v-flex>
            <v-flex xs10>
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
          </v-layout>
          <v-layout wrap v-if="type_id !== 1 && type_id !== 2 && type_id !== 3 && type_id !== 8">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Week</v-subheader>
            </v-flex>
            <v-flex xs10>
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
          </v-layout>
          <v-layout wrap v-if="type_id !== 1 && type_id !== 2 && type_id !== 3 && type_id !== 4 && type_id !== 8">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Day</v-subheader>
            </v-flex>
            <v-flex xs10>
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
          </v-layout>
          <v-layout wrap v-if="type_id !== 1 && type_id !== 2 && type_id !== 3 && type_id !== 4 && type_id !== 5 && type_id !== 8">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn Lesson</v-subheader>
            </v-flex>
            <v-flex xs10>
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
              >
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs2>
              <v-subheader class="px-0" v-if="type_id === 2">Chọn Semester</v-subheader>
              <v-subheader class="px-0" v-if="type_id === 3">Chọn Week</v-subheader>
              <v-subheader class="px-0" v-if="type_id === 4">Chọn Day</v-subheader>
              <v-subheader class="px-0" v-if="type_id === 5">Chọn Lesson</v-subheader>
              <v-subheader class="px-0" v-if="type_id === 6">Chọn Task</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-select
                v-if="type_id === 2 || type_id === 3 || type_id === 4"
                v-bind:items="multipleItems"
                v-model="multipleModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                return-object
                clearable
                multiple
                chips
              >
              </v-select>
              <v-select
                v-if="type_id === 5 || type_id === 6"
                v-bind:items="multipleItems"
                v-model="multipleModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                clearable
                chips
                return-object
              >
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="type_id === 6 || type_id == 8">
             <v-flex xs2>
            </v-flex>
            <v-flex xs10>
              <v-checkbox
                style="margin: 0"
                class="py-0 my-0"
                v-model="worksheetModel"
                label="In worksheet"
              >
              </v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout v-if="type_id === 5">
            <v-flex xs2>
              <v-subheader class="px-0">Chọn bộ câu hỏi</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-select
                v-bind:items="questionTypeItems"
                v-model="questionTypeModel"
                item-text="name"
                item-value="_id"
                autocomplete
                :rules="[value => !!value || 'Trường bắt buộc']"
                hide-selected
                return-object
                clearable
                chips
              >
              </v-select>
            </v-flex>
          </v-layout>
        </v-form>
      </template>
    </dia-log>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  const COMPONENT_NAME = 'add-grade'
  export default {
    name: COMPONENT_NAME,
    components: {
      VueEditor
    },
    props: {
    },
    watch: {
    },
    data () {
      return {
        add_new: false,
        valid: '',
        nameModel: '',
        listNameItems: [
          {
            _id: 1,
            name: 'Thêm tên grade'
          },
          {
            _id: 2,
            name: 'Thêm tên semester'
          },
          {
            _id: 3,
            name: 'Thêm tên week'
          },
          {
            _id: 4,
            name: 'Thêm tên day'
          },
          {
            _id: 5,
            name: 'Thêm tên lesson'
          },
          {
            _id: 6,
            name: 'Thêm tên task'
          }
        ],
        multipleItems: [],
        multipleModel: '',
        listNameModel: 1,
        listGradeItems: [],
        gradeModel: '',
        listSemesterItems: [],
        semesterModel: '',
        listWeekItems: [],
        weekModel: '',
        listDayItems: [],
        dayModel: '',
        listLessonItems: [],
        lessonModel: '',
        timeModel: '',
        textModel: '',
        linkModel: '',
        picModel: '',
        answer: 1,
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        id_task: '',
        type_id: 0,
        fileUpload: '',
        questionTypeItems: [],
        questionTypeModel: '',
        worksheetModel: false
      }
    },
    created () {
      this.$nextTick(function () {
      })
    },
    methods: {
      initGetData (item, items, index) {
        var vm = this
        vm.type_id = item
        vm.add_new = true
        var url
        vm.gradeModel = ''
        vm.semesterModel = ''
        vm.weekModel = ''
        vm.dayModel = ''
        vm.lessonModel = ''
        if (vm.type_id !== 1 && vm.type_id !== 8) {
          url = vm.end_point + 'lists?type=1'
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.listGradeItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        } else if (vm.type_id === 8) {
          vm.nameModel = items.name
          vm.textModel = items.text
          vm.timeModel = items.time
          vm.linkModel = items.link
          vm.picModel = items.picture
          vm.worksheetModel = items.worksheet
          vm.id_task = items._id
        }
        if (vm.type_id === 2 || vm.type_id === 3 || vm.type_id === 4 || vm.type_id === 5 || vm.type_id === 6) {
          url = vm.end_point + 'lists?type=' + vm.type_id
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.multipleItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        vm.questionTypeItems = []
        if (vm.type_id === 5) {
          url = vm.end_point + 'questiontypes'
          window.axios.get(url)
            .then(function (response) {
              console.log('>>>>>>response', response)
              var serializable = response.data
              vm.questionTypeItems = serializable.data
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      submit () {
        var vm = this
        var url
        console.log('>>>>>>>>', vm.multipleModel)
        var key
        if (this.$refs.form.validate()) {
          let paramsApiP = new URLSearchParams()
          if (vm.type_id === 1) {
            url = vm.end_point + 'lists'
            paramsApiP.append('name', vm.nameModel)
            paramsApiP.append('type', vm.listNameModel)
            vm.apiPost(url, paramsApiP)
          } else if (vm.type_id === 2) {
            url = vm.end_point + 'semesters'
            for (key in vm.multipleModel) {
              let paramsApiP = new URLSearchParams()
              paramsApiP.append('id_grade', vm.gradeModel._id)
              paramsApiP.append('name', vm.multipleModel[key].name)
              vm.apiPost(url, paramsApiP)
            }
          } else if (vm.type_id === 3) {
            url = vm.end_point + 'weeks'
            for (key in vm.multipleModel) {
              let paramsApiP = new URLSearchParams()
              paramsApiP.append('id_semester', vm.semesterModel._id)
              paramsApiP.append('name', vm.multipleModel[key].name)
              vm.apiPost(url, paramsApiP)
            }
          } else if (vm.type_id === 4) {
            url = vm.end_point + 'days'
            for (key in vm.multipleModel) {
              let paramsApiP = new URLSearchParams()
              paramsApiP.append('id_week', vm.weekModel._id)
              paramsApiP.append('name', vm.multipleModel[key].name)
              vm.apiPost(url, paramsApiP)
            }
          } else if (vm.type_id === 5) {
            url = vm.end_point + 'lessons'
            let paramsApiP = new URLSearchParams()
            paramsApiP.append('id_day', vm.dayModel._id)
            paramsApiP.append('name', vm.multipleModel.name)
            vm.apiPost(url, paramsApiP)
          } else if (vm.type_id === 6) {
            url = vm.end_point + 'tasks'
            let paramsApiP = new URLSearchParams()
            paramsApiP.append('id_lesson', vm.lessonModel._id)
            paramsApiP.append('text', vm.textModel)
            paramsApiP.append('time', vm.timeModel)
            paramsApiP.append('link', vm.linkModel)
            paramsApiP.append('picture', vm.picModel)
            paramsApiP.append('name', vm.multipleModel.name)
            paramsApiP.append('worksheet', vm.worksheetModel)
            vm.apiPost(url, paramsApiP)
          } else if (vm.type_id === 7) {
            url = vm.end_point + 'questions'
            var array = []
            array.push(vm.answer1, vm.answer2, vm.answer3, vm.answer4)
            let paramsApiP = new URLSearchParams()
            paramsApiP.append('question_name', vm.nameModel)
            paramsApiP.append('answer', vm.answer)
            paramsApiP.append('id_lesson', vm.lessonModel._id)
            paramsApiP.append('choices', JSON.stringify(array))
            vm.apiPost(url, paramsApiP)
          } else if (vm.type_id === 8) {
            url = vm.end_point + 'tasks/' + vm.id_task
            let paramsApiP = new URLSearchParams()
            paramsApiP.append('name', vm.nameModel)
            paramsApiP.append('text', vm.textModel)
            paramsApiP.append('time', vm.timeModel)
            paramsApiP.append('link', vm.linkModel)
            paramsApiP.append('picture', vm.picModel)
            paramsApiP.append('worksheet', vm.worksheetModel)
            window.axios.put(url, paramsApiP)
              .then(function (response) {
                vm.$router.push('/task/' + response.data._id)
                window.showMessageToastr('success', 'Cập nhật dữ liệu thành công')
                vm.add_new = false
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        }
      },
      apiPost (url, body) {
        var vm = this
        window.axios.post(url, body)
          .then(function (response) {
            vm.multipleModel = ''
            vm.nameModel = ''
            vm.textModel = ''
            vm.timeModel = ''
            vm.linkModel = ''
            vm.picModel = ''
            vm.worksheetModel = false
            window.showMessageToastr('success', 'Thêm mới dữ liệu thành công')
            if (vm.type_id === 5) {
              let params = new URLSearchParams()
              params.append('id_lesson', response.data._id)
              params.append('name', vm.questionTypeModel.name)
              params.append('type', vm.questionTypeModel.type)
              params.append('time', vm.questionTypeModel.time)
              params.append('text', vm.questionTypeModel.text)
              params.append('question_name', vm.questionTypeModel.question_name)
              params.append('answer', vm.questionTypeModel.answer)
              params.append('choices', vm.questionTypeModel.choices)
              window.axios.post(vm.end_point + 'questionsemesters', params)
                .then(function (response) {
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
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
      }
    }
  }
</script>
<style type="text/css" scoped>
  .truncated {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>