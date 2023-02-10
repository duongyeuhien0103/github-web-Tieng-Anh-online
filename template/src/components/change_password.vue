  <template>
    <div>
      <dia-log 
        :item = "[
          {
            width: '700px',
            model: passwordModel,
            action: 'saveDialog1',
            edit: true,
            label: 'Lưu và thoát',
            icon: 'save'
          }
          ]
        "
        :show_button='true'
        @closeDialog="(val) => (passwordModel = val)"
        @saveDialog1="submit"
      >
        <template slot="header">
          <span>Đổi mật khẩu</span>
        </template>
        <template slot="content">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout wrap>
              <v-flex xs3>
                <v-subheader class="px-0">Mật khẩu cũ *:</v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  placeholder=""
                  :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
                  required
                  type="password"
                  v-model="oldPasswordModel"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs3>
                <v-subheader class="px-0">Mật khẩu mới *:</v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  placeholder=""
                  :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
                  required
                  type="password"
                  v-model="newPasswordModel"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs3>
                <v-subheader class="px-0">Nhập lại mật khẩu mới *:</v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  placeholder=""
                  required
                  type="password"
                  v-model="enterNewPasswordModel"
                  :rules="[value => value == newPasswordModel || 'Nhập chưa đúng', v => !!v || 'Trường dữ liệu bắt buộc']"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </template>
      </dia-log>
    </div>
  </template>

  <script>
    const COMPONENT_NAME = 'change-password'
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
          valid: '',
          passwordModel: '',
          oldPasswordModel: '',
          newPasswordModel: '',
          enterNewPasswordModel: ''
        }
      },
      created () {
        this.$nextTick(function () {
        })
      },
      methods: {
        initGetData () {
          this.passwordModel = true
        },
        submit () {
          var vm = this
          if (this.$refs.form.validate()) {
            if (vm.oldPasswordModel !== vm.userInformation.password) {
              window.showMessageToastr('error', 'Nhập mật khẩu chưa đúng')
            } else {
              var params = new URLSearchParams()
              params.append('password', vm.newPasswordModel)
              window.axios.put(vm.end_point + 'users/' + vm.userInformation._id,
                params
              )
                .then(function (response) {
                  vm.passwordModel = false
                  window.showMessageToastr('success', 'Đổi mật khẩu thành công')
                  vm.$store.commit('updateUserInformation', response.data.value)
                })
                .catch(function (error) {
                  console.log(error.response)
                })
            }
          }
        }
      }
    }
  </script>
  <style type="text/css" scoped>
  </style>