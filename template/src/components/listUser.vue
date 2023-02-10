  <template>
    <div>
      <dia-log 
        :item = "[
          {
            width: '900px',
            model: list_user_dialog,
            action: 'saveDialog1',
            edit: true,
            label: 'Lưu và thoát',
            icon: 'save'
          }
          ]
        "
        :show_button='false'
        @closeDialog="(val) => (list_user_dialog = val)"
      >
        <template slot="header">
          <span>Danh sách tài khoản</span>
        </template>
        <template slot="content">
          <table class="table table-bs">
            <tr :key="index" v-for="(item, index) in listUserItems">
              <td class="col-xs-7">
                {{ item.fullname }} - {{ item.username }}
              </td>
              <td class="col-xs-2">
                {{ item.adress }}
              </td>
              <td class="col-xs-2">
                {{ item.phone }}
              </td>
              <td class="col-xs-1 text-xs-center">
                <v-icon class="red--text text--darken-3 pointer" @click="deleteUser(item, index)">clear</v-icon>
              </td>
            </tr>
          </table>
        </template>
      </dia-log>
    </div>
  </template>

  <script>
    const COMPONENT_NAME = 'list-user'
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
          list_user_dialog: false,
          listUserItems: []
        }
      },
      created () {
        this.$nextTick(function () {
        })
      },
      methods: {
        initGetData () {
          var vm = this
          vm.list_user_dialog = true
          vm.getUser()
        },
        getUser () {
          var vm = this
          var url = vm.end_point + 'users/user'
          window.axios.get(url)
            .then(function (response) {
              vm.listUserItems = response.data
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