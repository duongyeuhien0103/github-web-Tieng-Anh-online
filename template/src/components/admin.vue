<template>
  <div class="leftClass">
    <v-navigation-drawer
      stateless
      v-model="drawer"
      :width="drawerWidth"
      :mini-variant.sync="mini" hide-overlay
    >
    <v-expansion-panel class="expansion-blue">
      <v-expansion-panel-content
          v-for="(item,index) in listGradeItems" 
          :key="index"
          :value="historyOpen[0].grade == index"
          expand-icon=""
          :disabled="userInformation.permission !== 'admin'"
          >
          <!-- <div slot="actions" icon class="ma-0">
            <v-icon>clear</v-icon>
          </div> -->
          <div slot="header"
            class="pa-2" 
            @click="openSemester(item.data, index)"
            >
            <div class="custome-panel-heading-with-icon">
              <v-icon class="mr-1">folder</v-icon> 
              <v-layout class="flex">
                <custome-editable
                  type="text"
                  class="full-width"
                  :text_options = "{
                     text: item.data.name,
                     multiline: false,
                      rows: 5
                    }"
                  :api_update="end_point + 'grades/' + item.data._id"
                  key_update="name"
                  @update-success="(val) => (item.data.name = val)"
                  :permission="userInformation.permission"
                >
                </custome-editable>
              </v-layout>
              <div class="pull-right margin-left" v-if="userInformation.permission === 'admin'">
                <v-icon @click="clearItem(item.data, 1)">clear</v-icon>
              </div>
            </div>
          </div>
          <v-card class="">
            <v-card-text class="pa-0">
              <v-expansion-panel class="expansion-blue">
                <v-expansion-panel-content
                  v-for="(itemSem, indexSem) in item.listSemesterItems" 
                  :key="indexSem"
                  :value="historyOpen[0].semester == indexSem && historyOpen[0].grade == index"
                  expand-icon=""
                  :disabled="userInformation.permission !== 'admin'"
                  >
                  <div slot="header"
                    @click="openWeek(itemSem, index)"
                    class="pa-2"
                    >
                    <div class="custome-panel-heading-with-icon">
                      <div class="center-all full-width" style="padding-left: 15px">
                        <v-icon class="mr-1">folder</v-icon> 
                        <v-layout class="flex">
                          <custome-editable
                            type="text"
                            class="full-width"
                            :text_options = "{
                               text: itemSem.name,
                               multiline: false,
                                rows: 5
                              }"
                            :api_update="end_point + 'semesters/' + itemSem._id"
                            key_update="name"
                            @update-success="(val) => (itemSem.name = val)"
                            :permission="userInformation.permission"
                          >
                          </custome-editable>
                        </v-layout>
                      </div>
                      <div class="pull-right margin-left" v-if="userInformation.permission === 'admin'">
                        <v-icon @click="clearItem(itemSem, 2)">clear</v-icon>
                      </div>
                    </div>
                  </div>
                  <v-card class="">
                    <v-card-text class="pa-0">
                      <v-expansion-panel class="expansion-blue">
                        <v-expansion-panel-content
                          v-for="(itemWeek,indexWeek) in item.listWeekItems" 
                          :key="indexWeek"
                          :value="historyOpen[0].week == indexWeek && historyOpen[0].semester == indexSem && historyOpen[0].grade == index"
                          expand-icon=""
                          :disabled="userInformation.permission !== 'admin'"
                          >
                          <div slot="header"
                            class="pa-2" 
                            @click="openDay(itemWeek, index)"
                            >
                            <div class="custome-panel-heading-with-icon">
                              <div class="center-all full-width" style="padding-left: 30px;">
                                <v-icon class="mr-1">folder</v-icon> 
                                <v-layout class="flex">
                                  <custome-editable
                                    type="text"
                                    class="full-width"
                                    :text_options = "{
                                       text: itemWeek.name,
                                       multiline: false,
                                        rows: 5
                                      }"
                                    :api_update="end_point + 'weeks/' + itemWeek._id"
                                    key_update="name"
                                    @update-success="(val) => (itemWeek.name = val)"
                                    :permission="userInformation.permission"
                                  >
                                  </custome-editable>
                                </v-layout>
                              </div>
                              <div class="pull-right margin-left" v-if="userInformation.permission === 'admin'">
                                <v-icon @click="clearItem(itemWeek, 3)">clear</v-icon>
                              </div>
                            </div>
                          </div>
                          <v-card class="">
                            <v-card-text class="pa-0">
                              <v-expansion-panel class="expansion-blue">
                                <v-expansion-panel-content
                                  v-for="(itemDay,indexDay) in item.listDayItems" 
                                  :key="indexDay"
                                  :value="historyOpen[0].day == indexDay && historyOpen[0].week == indexWeek && historyOpen[0].semester == indexSem && historyOpen[0].grade == index"
                                  expand-icon=""
                                  :disabled="userInformation.permission !== 'admin'"
                                  >
                                  <div slot="header"
                                    class="pa-2" 
                                    @click="openLesson(itemDay, index)"
                                    >
                                    <div class="custome-panel-heading-with-icon">
                                      <div class="center-all full-width" style="padding-left: 45px;">
                                        <v-icon class="mr-1">folder</v-icon> 
                                        <v-layout class="flex">
                                          <custome-editable
                                            type="text"
                                            class="full-width"
                                            :text_options = "{
                                               text: itemDay.name,
                                               multiline: false,
                                                rows: 5
                                              }"
                                            :api_update="end_point + 'days/' + itemDay._id"
                                            key_update="name"
                                            @update-success="(val) => (itemDay.name = val)"
                                            :permission="userInformation.permission"
                                          >
                                          </custome-editable>
                                        </v-layout>
                                      </div>
                                      <div class="pull-right margin-left" v-if="userInformation.permission === 'admin'">
                                        <v-icon @click="clearItem(itemDay, 4)">clear</v-icon>
                                      </div>
                                    </div>
                                  </div>
                                  <v-card class="">
                                    <v-card-text class="pa-0">
                                      <v-expansion-panel class="expansion-blue">
                                        <v-expansion-panel-content
                                          v-for="(itemLes,indexLes) in item.listLessonItems" 
                                          :key="indexLes"
                                          :value="historyOpen[0].lesson == indexLes && historyOpen[0].day == indexDay && historyOpen[0].week == indexWeek && historyOpen[0].semester == indexSem && historyOpen[0].grade == index"
                                          expand-icon=""
                                          :disabled="userInformation.permission !== 'admin'"
                                          >
                                          <div slot="header"
                                            class="pa-2" 
                                            @click="openTask(itemLes, index)"
                                            >
                                            <div class="custome-panel-heading-with-icon">
                                              <div class="center-all full-width" style="padding-left: 60px;">
                                                <v-icon class="mr-1">folder</v-icon> 
                                                <v-layout class="flex">
                                                  <custome-editable
                                                    type="text"
                                                    class="full-width"
                                                    :text_options = "{
                                                       text: itemLes.name,
                                                       multiline: false,
                                                        rows: 5
                                                      }"
                                                    :api_update="end_point + 'lessons/' + itemLes._id"
                                                    key_update="name"
                                                    @update-success="(val) => (itemLes.name = val)"
                                                    :permission="userInformation.permission"
                                                  >
                                                  </custome-editable>
                                                </v-layout>
                                              </div>
                                              <div class="pull-right margin-left" v-if="userInformation.permission === 'admin'">
                                                <v-icon @click="clearItem(itemLes, 5)">clear</v-icon>
                                              </div>
                                            </div>
                                          </div>
                                          <v-card class="">
                                            <v-card-text class="pa-0">
                                              <v-expansion-panel class="expansion-blue">
                                                <v-expansion-panel-content
                                                  v-for="(itemTask,indexTask) in item.listTaskItems" 
                                                  :key="indexTask"
                                                  :value="historyOpen[0].task == indexTask && historyOpen[0].lesson == indexLes && historyOpen[0].day == indexDay && historyOpen[0].week == indexWeek && historyOpen[0].semester == indexSem && historyOpen[0].grade == index"
                                                  expand-icon=""
                                                  :disabled="userInformation.permission !== 'admin'"
                                                  >
                                                  <div slot="header"
                                                    class="pa-2" 
                                                    @click="clickTask(itemTask, index, indexSem, indexWeek, indexDay, indexLes, indexTask)"
                                                    >
                                                    <div class="custome-panel-heading-with-icon">
                                                      <div class="center-all d-flex" style="padding-left: 75px;">
                                                        <v-icon class="mr-1">folder</v-icon> 
                                                        <div>
                                                          <v-layout class="flex">
                                                            {{ itemTask.name }}
                                                          </v-layout>
                                                        </div>
                                                      </div>
                                                      <div class="pull-right margin-left" v-if="userInformation.permission === 'admin'">
                                                        <v-icon @click="clickEditTask(itemTask, indexTask)">edit</v-icon>
                                                        <v-icon @click="clearItem(itemTask, 6)">clear</v-icon>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </v-expansion-panel-content>
                                              </v-expansion-panel>
                                            </v-card-text>
                                          </v-card>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-card-text>
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>
          </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-navigation-drawer>
  <add-grade ref='addRef'></add-grade>
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
      drawer: true,
      drawerWidth: '20%',
      loadStart: true,
      mini: false,
      typeId: '',
      listItems: []
    }
  },
  computed: {
    title () {
    },
    historyOpen: function () {
      return JSON.parse('[' + this.$store.state.userInformation.open + ']')
    },
    userInformation: function () {
      this.loadStart = true
      this.listItems = []
      this.initGrade()
      return this.$store.state.userInformation
    },
    listGradeItems: function () {
      return this.$store.state.listGradeItems
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initGrade()
    })
  },
  created () {
    this.$nextTick(function () {
      this.setMinHeightMoveLayoutWraper()
    })
  },
  methods: {
    initGrade (item) {
      var vm = this
      this.listItems = []
      var url = vm.end_point + 'lists?type=1'
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          vm.listItems = []
          for (var key in serializable.data) {
            vm.listItems.push(
              {
                data: serializable.data[key],
                listSemesterItems: [],
                listWeekItems: [],
                listDayItems: [],
                listLessonItems: [],
                listTaskItems: []
              }
            )
            if (Number(vm.historyOpen[0].grade) === Number(key)) {
              vm.openSemester(serializable.data[key], key)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openSemester (item, index) {
      var vm = this
      var url = vm.end_point + 'semesters/' + item._id
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          if (serializable.data.length > 0) {
            vm.listItems[index].listSemesterItems = serializable.data
            console.log('>>>>>>>vm.loadStart', vm.loadStart)
            if (vm.loadStart) {
              for (var key in serializable.data) {
                if (Number(vm.historyOpen[0].semester) === Number(key)) {
                  vm.openWeek(serializable.data[key], index)
                }
              }
            } else {
            }
          } else {
            vm.listItems[index].listSemesterItems = []
            vm.loadStart = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openWeek (item, index) {
      var vm = this
      vm.$emit('changeTree')
      var url = vm.end_point + 'weeks/' + item._id
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          if (serializable.data.length > 0) {
            vm.listItems[index].listWeekItems = serializable.data
            if (vm.loadStart) {
              for (var key in serializable.data) {
                if (Number(vm.historyOpen[0].week) === Number(key)) {
                  vm.openDay(serializable.data[key], index)
                }
              }
            } else {
            }
          } else {
            vm.listItems[index].listWeekItems = []
            vm.loadStart = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openDay (item, index) {
      var vm = this
      vm.$emit('changeTree')
      var url = vm.end_point + 'days/' + item._id
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          if (serializable.data.length > 0) {
            vm.listItems[index].listDayItems = serializable.data
            if (vm.loadStart) {
              for (var key in serializable.data) {
                if (Number(vm.historyOpen[0].day) === Number(key)) {
                  vm.openLesson(serializable.data[key], index)
                }
              }
            } else {
            }
          } else {
            vm.listItems[index].listDayItems = []
            vm.loadStart = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openLesson (item, index) {
      var vm = this
      vm.$emit('changeTree')
      var url = vm.end_point + 'lessons/' + item._id
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          if (serializable.data.length > 0) {
            vm.listItems[index].listLessonItems = serializable.data
            if (vm.loadStart) {
              for (var key in serializable.data) {
                if (Number(vm.historyOpen[0].lesson) === Number(key)) {
                  vm.openTask(serializable.data[key], index)
                }
              }
            } else {
            }
          } else {
            vm.listItems[index].listLessonItems = []
            vm.loadStart = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openTask (item, index) {
      var vm = this
      vm.$emit('changeTree')
      var url = vm.end_point + 'tasks/' + item._id
      window.axios.get(url)
        .then(function (response) {
          var serializable = response.data
          if (serializable.data.length > 0) {
            vm.listItems[index].listTaskItems = serializable.data
            if (vm.loadStart) {
              for (var key in serializable.data) {
                if (Number(vm.historyOpen[0].task) === Number(key)) {
                  vm.$router.push('/task/' + serializable.data[key]._id)
                }
              }
            }
            vm.loadStart = false
          } else {
            vm.listItems[index].listTaskItems = []
            vm.loadStart = false
          }
          setTimeout(() => {
            window.$('.leftClass .v-expansion-panel__container--active>.v-expansion-panel__header .custome-panel-heading-with-icon .center-all>.v-icon,.leftClass .v-expansion-panel__container--active>.v-expansion-panel__header .custome-panel-heading-with-icon>.v-icon').html('folder_open')
          }, 500)
          vm.$store.commit('listGradeItems', vm.listItems)
          vm.$emit('listtask', serializable.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clickTask (item, index, indexSem, indexWeek, indexDay, indexLes, indexTask) {
      var vm = this
      var params = new URLSearchParams()
      var open = {
        'grade': index,
        'semester': indexSem,
        'week': indexWeek,
        'day': indexDay,
        'lesson': indexLes,
        'task': indexTask
      }
      params.append('open', JSON.stringify(open))
      window.axios.put(vm.end_point + 'users/' + vm.userInformation._id,
        params
      )
        .then(function (response) {
          vm.$store.commit('updateUserInformation', response.data)
          vm.$router.push('/task/' + item._id)
        })
        .catch(function (error) {
          console.log(error.response)
        })
    },
    setMinHeightMoveLayoutWraper () {
      let vm = this
      window.$('#left').css('height', '500px')
      window.$('#right').css('height', 'auto')
      let leftHeight = 0
      let rightHeight = 0
      leftHeight = document.getElementById('left').offsetHeight
      rightHeight = document.getElementById('right').offsetHeight
      window.$('#container').css('min-height', leftHeight > rightHeight ? leftHeight : rightHeight)
      window.$('#left').css('height', leftHeight > rightHeight ? leftHeight : rightHeight)
      if (rightHeight < 500) {
        window.$('#right').css('height', '100%')
      }
      setTimeout(() => {
        vm.setMinHeightMoveLayoutWraper()
      }, 100)
    },
    clickEditTask (item, index) {
      var vm = this
      vm.$refs.addRef.initGetData(8, item, index)
    },
    clearItem (item, index) {
      var vm = this
      var url = ''
      if (index === 1) {
        url = vm.end_point + 'grades/' + item._id
      } else if (index === 2) {
        url = vm.end_point + 'semesters/' + item._id
      } else if (index === 3) {
        url = vm.end_point + 'weeks/' + item._id
      } else if (index === 4) {
        url = vm.end_point + 'days/' + item._id
      } else if (index === 5) {
        url = vm.end_point + 'lessons/' + item._id
      } else if (index === 6) {
        url = vm.end_point + 'tasks/' + item._id
      }
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
            })
            .catch(function (error) {
              window.showMessageByAPICode(error.response.status, error.response.data)
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
<style type="text/css">
  .leftClass .v-expansion-panel__header {
    padding: 0px!important;
  }
  /*#ffd740!important;*/
  /*.leftClass .v-expansion-panel__container--active>.v-expansion-panel__header .custome-panel-heading-with-icon .pull-right .v-icon */
  .leftClass .theme--light.v-expansion-panel .v-expansion-panel__container--active{
    color: #039be5;
    /*background-color: #e7f5fd;*/
  }
  .leftClass .v-expansion-panel__container--active>.v-expansion-panel__header .custome-panel-heading-with-icon .center-all>.v-icon {
    color: #ffd740!important;
  }
  .leftClass .theme--light.v-expansion-panel>.v-expansion-panel__container:hover,.leftClass .v-expansion-panel__container .v-expansion-panel__header .custome-panel-heading-with-icon:hover .v-icon {
    color: #039be5;
  }
  .leftClass .theme--light.v-expansion-panel .v-expansion-panel__container{
    border: 0px
  }
  .v-expansion-panel{
    box-shadow: none;
  }
  .leftClass .custome-panel-heading-with-icon{
    display: flex;
    align-items: center;
  }
  .leftClass .v-expansion-panel__container--active>.v-expansion-panel__header .custome-panel-heading-with-icon>i{
    color: #ffd740!important;
  }
  .leftClass .custome-panel-heading-with-icon .v-icon{
    font-size: 20px;
  }
</style>
<style>
  .v-btn {
    height: 26px;
  }
  .v-btn .v-btn__content{
    height: 26px;
  }
  .v-card__title {
    padding:  0 16px;
  }
  .v-expansion-panel__header {
    height: 30px;
    min-height: 0px
  }
  .v-dialog__content .v-card__title {
    background-color: #e6e7e8;
    text-transform: uppercase;
    color: #039be5;
    font-weight: bold;
  }
  .v-dialog__content .v-card__text {
    padding: 10px 15px;
  }
  .v-subheader {
    color: #4d4d4d!important;
    height: 34px;
    font-weight: bold;
    font-size: 13px;
  }
  .v-dialog__content .v-card__actions button {
    box-shadow: none!important;
    -webkit-box-shadow: none!important;
    text-transform: none!important;
    font-size: 13px!important;
    height: 34px;
  }
  .v-dialog__content .v-input--radio-group .v-input__slot {
    margin-top: 5px;
  }
  .v-dialog__content .v-card__text>form>.layout {
    margin-bottom: 10px;
  }
  .v-messages__message {
    line-height: inherit;
  }
  .v-input__slot {
    margin: 0;
  }
  .v-text-field input {
    padding: 0;
    font-size: 13px;
  }
  .v-text-field input {
    box-shadow: none;
    flex: 1;
    height: 30px;
    margin: 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .v-input--selection-controls {
    margin: 0;
  }
  .v-input--radio-group--column .v-input--radio-group__input {
    flex-direction: inherit;
  }
  .v-radio label {
    margin: 0;
  }
  body .v-messages {
    min-height: inherit;
  }
  body .v-input {
    padding-top: 0;
  }
  .table-bs td[class*="col-"] {
    padding: 5px 15px;
    border: 1px solid #e6e7e8;
  }
  .v-text-field {
    margin: 0;
  }
  .v-input--radio-group__input {
    flex-wrap: wrap;
  }
  .dialog__content .card__text .subheader {
    color: #4d4d4d;
    height: 34px;
    font-weight: bold;
  }
  button {
    /*box-shadow: none!important;*/
    /*-webkit-box-shadow: none!important;*/
    text-transform: none!important;
    font-size: 13px!important;
  }
</style>
<!-- class dung chung -->
<style>
  .pointer {
    cursor: pointer;
  }
  .center-all{
    display: flex;
    align-items: center;
  }
  .float-right{
    float: right;
  }
  .margin-left{
    margin-left: auto!important;
  }
  .primary {
    background: #03a9f4 !important;
  }
  .justify-content {
    justify-content: center;
  }
  .full-width {
    width: 100%;
  }
  .unfulfilled {
    color: #ffc107!important; /*vàng cam*/
  }
  .underway {
    color: #00bcd4!important; /*xanh dương*/
  }
  .pending {
    color: #9c27b0!important; /*tím*/
  }
  .finished {
    color: #8bc34a!important; /*xanh*/
  }
  .overdue {
    color: #f44336!important; /*đỏ*/
  }
  .pause {
    color: #999!important; /*bạc*/
  }
</style>