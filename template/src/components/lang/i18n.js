import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vnMessage from '@/components/lang/vn.json'
import laoMessage from '@/components/lang/lao.json'

Vue.use(VueI18n)

const messages = {
  vn: vnMessage,
  lao: laoMessage
}

const i18n = new VueI18n({
  locale: 'vn', // set locale
  messages,
  fallbackLocale: 'vn'
})

export default i18n
