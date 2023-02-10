<template>
  <div class="bodyClass">
    <div class="custome-toolbar white">
      <!-- <v-breadcrumbs>
        <v-icon slot="divider">forward</v-icon>
        <v-breadcrumbs-item
          v-for="(item,index) in breadcrumbsItems"
          :key="index"
        >
          {{ item.name }}
        </v-breadcrumbs-item>
      </v-breadcrumbs> -->
      <div class="align-center d-flex" style="padding-left: 10px">
        <span v-if="listGradeItems.length !== 0"><b>{{ listGradeItems[historyOpen[0].grade].data.name }}</b></span>
        <v-icon slot="divider">arrow_right_alt</v-icon>
        <span v-if="listGradeItems.length !== 0"><b>{{ listGradeItems[historyOpen[0].grade].listSemesterItems[historyOpen[0].semester].name }}</b></span>
        <v-icon slot="divider">arrow_right_alt</v-icon>
        <span v-if="listGradeItems.length !== 0"><b>{{ listGradeItems[historyOpen[0].grade].listWeekItems[historyOpen[0].week].name }}</b></span>
        <v-icon slot="divider">arrow_right_alt</v-icon>
        <span v-if="listGradeItems.length !== 0"><b>{{ listGradeItems[historyOpen[0].grade].listDayItems[historyOpen[0].day].name }}</b></span>
        <v-icon slot="divider">arrow_right_alt</v-icon>
        <span v-if="listGradeItems.length !== 0"><b>{{ listGradeItems[historyOpen[0].grade].listLessonItems[historyOpen[0].lesson].name }}</b></span>
        <v-icon slot="divider">arrow_right_alt</v-icon>
        <span v-if="listGradeItems.length !== 0"><b>{{ listGradeItems[historyOpen[0].grade].listTaskItems[historyOpen[0].task].name }}</b></span>
      </div>
      <!-- <div class="item" v-for="lang in optionLangs" :value="lang.value" @click.prevent="callSetLangActions">{{ lang.text }}</div> -->
      <div class="margin-left">
        <img src="@/img/task/vn.jpg" width="30" title="Việt Nam" @click.prevent="callSetLangActions('vn')" class="mr-2">
        <img src="@/img/task/lao.png" width="30" title="Lao" @click.prevent="callSetLangActions('lao')" class="mr-2">
        <v-menu class="mr-3" v-if="userInformation.permission === 'admin'">
          <v-btn
            slot="activator"
            color="primary"
            dark
            class="ma-0"
          >
            {{ $t("common.them_moi") }}
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              @click="addClick(item)"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="move-layout-wraper">
      <div id="container" class="listcontainer calendar-wrap" style="position: relative;">
        <div id="left">
          <div class="task-category">
            <div>
              <admin @changeTree="(val) => (breadcrumbsItems = val)" @listtask="(val) => (taskItems = val)">
              </admin>
            </div>
          </div>
        </div>
        <div id="right">
          <div id="handle"></div> 
          <div class="task-content-wrap layout wrap">
            <main class="flex xs12">
              <section class="content">
                <router-view></router-view>                
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
    <add-grade ref='addRef'></add-grade>
    <add-type-question ref='addTypeQuestion'></add-type-question>
  </div>
</template>

<script>
import admin from '@/components/admin'
import task from '@/components/task'

export default {
  data () {
    return {
      items: [
        {
          title: 'Thêm mới',
          id: 1
        }, {
          title: 'Thêm mới semster',
          id: 2
        }, {
          title: 'Thêm mới week',
          id: 3
        }, {
          title: 'Thêm mới Day',
          id: 4
        }, {
          title: 'Thêm mới Lesson',
          id: 5
        }, {
          title: 'Thêm mới Task',
          id: 6
        }, {
          title: 'Thêm mới Question',
          id: 8
        }
      ],
      optionLangs: [
        {
          text: 'Vietnamese',
          value: 'vn'
        },
        {
          text: 'English',
          value: 'en'
        }
      ],
      typeId: '',
      changeTree: [],
      breadcrumbsItems: [],
      taskItems: []
    }
  },
  name: 'App',
  components: {
    admin,
    task
  },
  computed: {
    userInformation: function () { return this.$store.state.userInformation },
    listGradeItems: function () {
      return this.$store.state.listGradeItems
    },
    historyOpen: function () {
      return JSON.parse('[' + this.$store.state.userInformation.open + ']')
    }
  },
  created () {
    this.$nextTick(function () {
      var isResizing = false
      window.$(function () {
        var container = window.$('#container')
        var left = window.$('#left')
        var right = window.$('#right')
        var handle = window.$('#handle')
        handle.on('mousedown', function (e) {
          isResizing = true
        })
        window.$(document).on('mousemove', function (e) {
          if (!isResizing) {
            return
          }
          var offsetRight = container.width() - (e.clientX - container.offset().left)
          left.css('right', offsetRight)
          right.css('width', offsetRight)
        }).on('mouseup', function (e) {
          isResizing = false
        })
      })
    })
  },
  methods: {
    callSetLangActions (event) {
      console.log('>>>>>>>>>event', event)
      this.$store.dispatch('setLang', event)
    },
    addClick (item) {
      var vm = this
      vm.typeId = item.id
      if (vm.typeId !== 8) {
        vm.$refs.addRef.initGetData(vm.typeId)
      } else {
        vm.$refs.addTypeQuestion.initGetData(vm.typeId)
      }
    }
  }
}
</script>
<style>
  .application--wrap{
    background: #eee;
  }
  .bodyClass {
    padding: 10px
  }
  .move-layout-wraper{
    position: relative;
    /*min-height: 100vh;*/
    max-height: 100%;
  }
  .custome-toolbar{
    border-bottom: 2px solid #e7f5fd!important;
    height: 40px;
    align-items: center;
    display: flex;
  }
  .custome-toolbar .v-menu{
    margin-left: auto;
  }
  .listcontainer {
    display: flex;
  }

  div.inlineaaaa {
    float:left;
  }
  #container {
    width: 100%;
    /* Disable selection so it doesn't get annoying */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: moz-none;
    -ms-user-select: none;
    user-select: none;
  }
  #container #left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 80%;
      min-width: 20%;
      max-width: 80%;
      background: #fff
  }
  #container #right {
      position: absolute;
      right: 0;
      top: 0;
      /*bottom: 0;*/
      width: 80%;
      min-width: 20%;
      max-width: 80%;
      /*height: 100%;*/
      background: #fff
  }
  #container #handle {
      position: absolute;
      left: -4px;
      top: 0;
      bottom: 0;
      width: 8px;
      cursor: w-resize;
  }
  #handle{
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    width: 8px;
    cursor: w-resize;
    background: #eee;
  }
  .task-content-wrap {
    padding: 10px;
    background: #fff;
  }
</style>

