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
      <span>Thêm mới bộ câu hỏi</span>
    </template>
    <template slot="content">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout wrap>
          <v-flex xs2>
            <v-subheader class="px-0">Tên bộ câu hỏi</v-subheader>
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
        <v-layout wrap>
          <v-flex xs2>
            <v-subheader class="px-0">Kiểu câu hỏi</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-select
              v-bind:items="typeItems"
              v-model="typeModel"
              item-text="name"
              item-value="_id"
              autocomplete
              :rules="[value => !!value || 'Trường bắt buộc']"
              hide-selected
            >
            </v-select>
          </v-flex>
          <v-flex xs2>
            <v-subheader class="px-0 pull-right mr-3">Thời gian làm bài</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              placeholder=""
              v-model="timeModel"
              :rules="[value => !!value || 'Trường bắt buộc']"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap v-if="typeModel == 2">
          <v-flex xs2>
            <v-subheader class="px-0">Đoạn văn</v-subheader>
          </v-flex>
          <v-flex xs10>
            <vue-editor 
              v-model="textModel"
            >
            </vue-editor>
          </v-flex>
        </v-layout>
        <v-flex xs12 class="label_align my-2">
          <input type="file" id="fileUpload" ref="fileUpload" v-on:change="handleFileUpload()" class="my-2"/>
          <b>Danh sách bộ câu hỏi:</b>
        </v-flex>
        <v-layout wrap>
          <table class="table table-bs">
            <tr v-for="(item, index) in listQuestion" :key="index">
              <td class="col-xs-10">
                <span>{{ item.name }}</span>
              </td>
              <td class="col-xs-1">
                <span>{{ typeItems[item.type-1].name }}</span>
              </td>
              <td class="col-xs-1 text-xs-center">
                <v-icon class="red--text text--darken-3 pointer" @click="deleteQuestion(item, index)">clear</v-icon>
              </td>
            </tr>
          </table>
        </v-layout>
      </v-form>
    </template>
  </dia-log>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  const COMPONENT_NAME = 'add-type-question'
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
        fileUpload: '',
        nameModel: '',
        timeModel: 0,
        typeItems: [
          {
            _id: 1,
            name: 'Kiểu 1'
          },
          {
            _id: 2,
            name: 'Kiểu 2'
          },
          {
            _id: 3,
            name: 'Kiểu 3'
          }
        ],
        typeModel: 1,
        questionItems: [
          {
            questionName: [],
            answer: [],
            choices: []
          }
        ],
        listQuestion: []
      }
    },
    created () {
      this.$nextTick(function () {
      })
    },
    methods: {
      initGetData () {
        var vm = this
        vm.add_new = true
        vm.getListQuestion()
      },
      getListQuestion () {
        var vm = this
        var url = vm.end_point + 'questiontypes'
        window.axios.get(url)
          .then(function (response) {
            var serializable = response.data
            vm.listQuestion = serializable.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleFileUpload () {
        var vm = this
        window.$('#fileUpload').trigger({type: 'click'})
        vm.questionItems = [
          {
            questionName: [],
            answer: [],
            choices: []
          }
        ]
        console.log('>>>>>>>>>>>vm.$refs.fileUpload', vm.$refs.fileUpload.files[0])
        var dataPut = new FormData()
        dataPut.append('name', vm.$refs.fileUpload.files[0].name.split('.')[0])
        dataPut.append('track', vm.$refs.fileUpload.files[0])
        window.axios.post(vm.end_point + 'semesters/fileattachs/upload', dataPut)
          .then(function (response) {
            var serializable = response.data
            for (var key in serializable.data) {
              if (serializable.data[key].question !== '') {
                var array = []
                array.push(serializable.data[key].answer1, serializable.data[key].answer2, serializable.data[key].answer3, serializable.data[key].answer4)
                vm.questionItems[0].answer.push(serializable.data[key].answer)
                vm.questionItems[0].questionName.push(serializable.data[key].question)
                vm.questionItems[0].choices.push(array)
              }
            }
            console.log('>>>>>>>>>>>>>>>vm.questionItems', vm.questionItems[0])
          })
          .catch(function (error) {
            console.log(error.response)
          })
      },
      submit () {
        var vm = this
        var dataPut = new URLSearchParams()
        dataPut.append('name', vm.nameModel)
        dataPut.append('type', vm.typeModel)
        dataPut.append('time', vm.timeModel)
        dataPut.append('question_name', JSON.stringify(vm.questionItems[0].questionName))
        dataPut.append('answer', JSON.stringify(vm.questionItems[0].answer))
        dataPut.append('choices', JSON.stringify(vm.questionItems[0].choices))
        if (vm.typeModel === 2) {
          dataPut.append('text', vm.textModel)
        }
        window.axios.post(vm.end_point + 'questiontypes', dataPut)
          .then(function (response) {
            window.showMessageToastr('success', 'Thêm mới dữ liệu thành công')
            vm.getListQuestion()
          })
          .catch(function (error) {
            console.log(error.response)
          })
      },
      deleteQuestion (item, index) {
        var vm = this
        var url = vm.end_point + 'questiontypes/' + item._id
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
                vm.getListQuestion()
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
  .truncated {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>