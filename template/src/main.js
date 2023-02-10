// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import VuejsDialog from 'vuejs-dialog'
import i18n from './components/lang/i18n'
// import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
// import VueSilentbox from 'vue-silentbox'
// Vue.use(MLInstaller)
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCard,
  VTextField,
  VSubheader,
  VDivider,
  VSelect,
  VMenu,
  VExpansionPanel,
  VDialog,
  VForm,
  VSnackbar,
  VCheckbox,
  VAlert,
  VDatePicker,
  VTimePicker,
  VDataTable,
  VPagination,
  VRadioGroup,
  VTabs,
  VTooltip,
  VChip,
  VProgressCircular,
  VProgressLinear,
  VCarousel,
  VAvatar
} from 'vuetify'
import { store } from './store/store'
import '../node_modules/vuetify/src/stylus/app.styl'
import addGrade from './components/addGrade.vue'
import addTypeQuestion from './components/addTypeQuestion.vue'
import diaLog from './components/diaLog.vue'
import personalInformation from './components/personal_information.vue'
import changePassword from './components/change_password.vue'
import pointList from './components/point_list.vue'
import listUser from './components/listUser.vue'
import evaluateUsers from './components/evaluateUsers.vue'
import JxMobilinkActivityStar from './components/mobilink_activity_star.vue'
import JxMobilinkActivityEditable from './components/editable.vue'
// import language from './components/lang/language'
// import MultiLanguage from './assets/js_common/vue-multilanguage'
Vue.component(addGrade.name, addGrade)
Vue.component(addTypeQuestion.name, addTypeQuestion)
Vue.component(diaLog.name, diaLog)
Vue.component(personalInformation.name, personalInformation)
Vue.component(changePassword.name, changePassword)
Vue.component(pointList.name, pointList)
Vue.component(evaluateUsers.name, evaluateUsers)
Vue.component(listUser.name, listUser)
Vue.component(JxMobilinkActivityEditable.name, JxMobilinkActivityEditable)
Vue.component(JxMobilinkActivityStar.name, JxMobilinkActivityStar)
// Vue.use(MultiLanguage, language)
// Vue.use(VueSilentbox)
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VTextField,
    VSubheader,
    VDivider,
    VSelect,
    VMenu,
    VExpansionPanel,
    VDialog,
    VForm,
    VSnackbar,
    VCheckbox,
    VAlert,
    VDatePicker,
    VTimePicker,
    VDataTable,
    VPagination,
    VRadioGroup,
    VTabs,
    VTooltip,
    VChip,
    VProgressCircular,
    VProgressLinear,
    VCarousel,
    VAvatar
  },
  theme: {
    primary: '#03a9f4',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(VuejsDialog)

// const messages = {
//   vn: vnMessage,
//   en: enMessage
// }
// const i18n = new VueI18n({
//   locale: 'vn', // set locale
//   messages,
//   fallbackLocale: 'vn'
// })
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
Vue.mixin({
  data () {
    return {
      get end_point () {
        return 'http://localhost:3000/'
      }
    }
  }
})
// Vue.prototype.$appName = 'My App'
Vue.use(Vuetify, { theme: {
  primary: '#03a9f4',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

sync(store, router)

router.beforeEach((to, from, next) => {
  // this route requires auth, check if logged in
  // if not, redirect to login page.
  let id = to.params.id
  console.log('>>>>>>>>>>>>>id', id)
  console.log('>>>>>>>>>>>>>from.path', from.path)
  if (from.path.indexOf('question') === -1) {
    router.app.$store.backToListUrl = from.path
  }
  next()
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App),
  store: store,
  components: { App },
  template: '<App/>'
})

export default app
