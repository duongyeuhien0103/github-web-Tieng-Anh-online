  <template>
    <div>
      <dia-log 
        :item = "[
          {
            width: '900px',
            model: informationModel,
            action: 'saveDialog1',
            edit: true,
            label: 'Lưu và thoát',
            icon: 'save'
          }
          ]
        "
        :show_button='true'
        @closeDialog="(val) => (informationModel = val)"
        @saveDialog1="submit"
      >
        <template slot="header">
          <span v-if="value">Thêm mới tài khoản</span>
          <span v-else>Chỉnh sửa thông tin cá nhân</span>
        </template>
        <template slot="content">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout wrap v-if="value">
              <v-flex xs2>
                <v-subheader class="px-0">Tên tài khoản *:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  placeholder=""
                  :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
                  required
                  v-model="usernameModel"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap v-if="value">
              <v-flex xs2>
                <v-subheader class="px-0">Mật khẩu *:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  placeholder=""
                  :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
                  required
                  type="password"
                  v-model="passwordModel"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs2>
                <v-subheader class="px-0">Họ và tên *:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  placeholder=""
                  :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
                  required
                  v-model="fullnameModel"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs2>
                <v-subheader class="px-0">Địa chỉ:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  placeholder=""
                  :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
                  required
                  v-model="adressModel"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs2>
                <v-subheader class="px-0">Số điện thoại:</v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  placeholder=""
                  required
                  v-model="phoneModel"
                  :rules="[value => Number(value) >= 0 || 'Bắt buộc nhập số']"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-subheader class="px-0 pull-right pr-2">Email:</v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  placeholder=""
                  required
                  v-model="emailModel"
                  :rules="[rules.email]"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs2>
                <v-subheader class="px-0">Giới tính:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-radio-group v-model="genderModel">
                  <v-radio
                    v-for="(item, index) in genderItems"
                    :key="index"
                    :value="item.id"
                    :label="item.gender"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-form>
        </template>
      </dia-log>
    </div>
  </template>

  <script>
    const COMPONENT_NAME = 'personal-information'
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
          informationModel: false,
          valid: '',
          genderItems: [
            {
              gender: 'Nam',
              id: 1
            }, {
              gender: 'Nữ',
              id: 2
            }
          ],
          genderModel: 2,
          fullnameModel: '',
          emailModel: '',
          adressModel: '',
          phoneModel: '',
          rules: {
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Sai email'
            }
          },
          value: true,
          passwordModel: '',
          usernameModel: ''
        }
      },
      created () {
        this.$nextTick(function () {
        })
      },
      methods: {
        initCreate () {
          this.informationModel = true
          this.value = true
        },
        initGetData () {
          var vm = this
          vm.informationModel = true
          vm.fullnameModel = vm.userInformation.fullname
          vm.emailModel = vm.userInformation.email
          vm.adressModel = vm.userInformation.adress
          vm.phoneModel = vm.userInformation.phone
          vm.genderModel = vm.userInformation.gender
          vm.value = false
        },
        submit () {
          var vm = this
          if (this.$refs.form.validate()) {
            var params = new URLSearchParams()
            params.append('fullname', vm.fullnameModel)
            params.append('email', vm.emailModel)
            params.append('adress', vm.adressModel)
            params.append('phone', vm.phoneModel)
            params.append('gender', vm.genderModel)
            var open = {
              'grade': 0,
              'semester': 0,
              'week': 0,
              'day': 0,
              'lesson': 0,
              'task': 0
            }
            if (vm.value) {
              params.append('username', vm.usernameModel)
              params.append('password', vm.passwordModel)
              params.append('permission', 'user')
              params.append('open', JSON.stringify(open))
              window.axios.post(vm.end_point + 'users',
                params
              )
                .then(function (response) {
                  vm.informationModel = false
                  vm.$refs.form.reset()
                  window.showMessageToastr('success', 'Tạo tài khoản thành công')
                  vm.$store.commit('updateUserInformation', response.data.value)
                })
                .catch(function (error) {
                  console.log(error.response)
                })
            } else {
              window.axios.put(vm.end_point + 'users/' + vm.userInformation._id,
                params
              )
                .then(function (response) {
                  vm.informationModel = false
                  window.showMessageToastr('success', 'Cập nhật tài khoản thành công')
                  vm.$store.commit('updateUserInformation', response.data)
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