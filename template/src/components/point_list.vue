  <template>
    <div>
      <dia-log 
        :item = "[
          {
            width: '900px',
            model: point_list_model,
            action: 'saveDialog1',
            edit: true,
            label: 'Lưu và thoát',
            icon: 'save'
          }
          ]
        "
        :show_button='false'
        @closeDialog="(val) => (point_list_model = val)"
        @saveDialog1="submit"
      >
        <template slot="header">
          <span>Tổng kết</span>
        </template>
        <template slot="content">
          <table class="table table-bs">
            <tr :key="index" v-for="(item, index) in pointListItems">
              <td class="col-xs-10">
                {{ item.name_grade }} >> {{ item.name_semester }} >> {{ item.name_week }} >> {{ item.name_day }} >> {{ item.name_lesson }}
              </td>
              <td class="col-xs-2">
                <span v-if="item.point >= 80 && item.point < 90" class="unfulfilled">{{ item.point }} điểm</span>
                <span v-if="item.point >= 90 && item.point < 100" class="pending">{{ item.point }} điểm</span>
                <span v-if="item.point == 100" class="finished">{{ item.point }} điểm</span>
              </td>
            </tr>
            <tr>
              <td class="col-xs-10">
                <b>Tổng</b>
              </td>
              <td class="col-xs-2">
                <b class="overdue">{{ total_point }} điểm</b>
              </td>
            </tr>
          </table>
        </template>
      </dia-log>
    </div>
  </template>

  <script>
    const COMPONENT_NAME = 'point-list'
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
          pointListItems: [],
          point_list_model: false,
          total_point: 0
        }
      },
      created () {
        this.$nextTick(function () {
        })
      },
      methods: {
        initGetData () {
          var vm = this
          vm.point_list_model = true
          vm.total_point = 0
          var url = vm.end_point + 'points/' + vm.userInformation._id
          window.axios.get(url)
            .then(function (response) {
              var serializable = response.data
              vm.pointListItems = serializable.data
              for (var key in serializable.data) {
                vm.total_point = vm.total_point + serializable.data[key].point
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        submit () {
          var vm = this
          if (this.$refs.form.validate()) {
            if (vm.oldPasswordModel !== vm.userInformation.password) {
              alert('Mật khẩu cũ chưa đúng')
            } else {
              var params = new URLSearchParams()
              params.append('password', vm.newPasswordModel)
              window.axios.put(vm.end_point + 'users/' + vm.userInformation._id,
                params
              )
                .then(function (response) {
                  vm.passwordModel = false
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