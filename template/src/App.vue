<template>
  <v-app>
    <div id="nav">
      <div class="logoClass">
        <img src="@/img/logo/logo.png">
        <b class="ml-2">{{ $t("common.logo") }}</b>


          <v-menu class="mr-3 margin-left" content-class="menuClass">
            <div slot="activator" class="center-all">
              <v-icon style="font-size: 30px" class="mr-1">account_circle</v-icon>
              <b>{{ userInformation.fullname }}</b>
            </div>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                v-on:click="changeUserName(item)"
              >
                <v-list-tile-title>
                  <span style="display: none">{{ lang }}</span>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile>
              <router-link to="/login" v-on:click.native="logout()" replace>
                <v-list-tile>
                  <v-list-tile-title>{{ $t("common.dang_nhap") }}</v-list-tile-title>
                </v-list-tile>
              </router-link>
            </v-list>
          </v-menu>
          <personal-information ref='information'></personal-information>
          <change-password ref='password'></change-password>
          <point-list ref='pointlist'></point-list>
          <list-user ref='listUser'></list-user>
          <evaluate-users ref='evaluateUsers'></evaluate-users>
      </div>
    </div>
    <router-view @authenticated="setAuthenticated" />
    <footer id="footer" class="layout align-center">
      <img src="@/img/logo/logo.png" width="100">
      <span>Copyright © 2019 HoanLT. All rights reserved.</span>
      <span class="margin-left">Designed by HoanLT</span>
    </footer>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {
        authenticated: false,
        items: [
          {
            title: 'chinh_sua_thong_tin',
            id: 1
          },
          {
            title: 'Tổng kết',
            id: 3
          },
          {
            title: 'Đổi mật khẩu',
            id: 2
          },
          {
            title: 'Danh sách người dùng',
            id: 4
          },
          {
            title: 'Đánh giá của người dùng',
            id: 5
          }
        ],
        informationModel: false
      }
    },
    created () {
      this.$nextTick(function () {
      })
    },
    mounted () {
      if (!this.authenticated) {
        var vm = this
        var url = vm.end_point + 'users'
        if (window.localStorage.getItem('token')) {
          var pram = {
            params: {
              'id': window.localStorage.getItem('token')
            }
          }
          window.axios.get(url, pram)
            .then(function (response) {
              console.log('>>>>>response', response.data)
              if (response.data.permission === 'admin') {
                vm.items = [
                  {
                    title: vm.$t('common.chinh_sua_thong_tin'),
                    id: 1
                  },
                  {
                    title: 'Tổng kết',
                    id: 3
                  },
                  {
                    title: 'Đổi mật khẩu',
                    id: 2
                  },
                  {
                    title: 'Danh sách người dùng',
                    id: 4
                  },
                  {
                    title: 'Đánh giá của người dùng',
                    id: 5
                  }
                ]
              } else {
                vm.items = [
                  {
                    title: 'Chỉnh sửa thông tin',
                    id: 1
                  },
                  {
                    title: 'Tổng kết',
                    id: 3
                  },
                  {
                    title: 'Đổi mật khẩu',
                    id: 2
                  }
                ]
              }
              vm.$store.commit('updateUserInformation', response.data)
              vm.$emit('authenticated', true)
              vm.$router.replace({name: 'list'})
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          vm.items = []
          vm.$store.commit('updateUserInformation', {
            open: '{"grade":0,"semester":0,"week":0,"day":0,"lesson":0,"task":0}',
            permission: 'guest'
          })
          console.log('>>>>>>>>>>userInformation', vm.userInformation)
          vm.$emit('authenticated', true)
          vm.$router.replace({name: 'list'})
        }
      }
    },
    computed: {
      userInformation: function () { return this.$store.state.userInformation },
      lang: function () {
        console.log('>>>>>>>>>>>this.$store.state.lang', this.$store.state.lang)
        this.items = [
          {
            title: this.$t('common.chinh_sua_thong_tin'),
            id: 1
          },
          {
            title: this.$t('common.tong_ket'),
            id: 3
          },
          {
            title: this.$t('common.doi_mat_khau'),
            id: 2
          },
          {
            title: this.$t('common.danh_sach_nguoi_dung'),
            id: 4
          },
          {
            title: this.$t('common.danh_gia_cua_nguoi_dung'),
            id: 5
          }
        ]
        return this.$store.state.lang
      }
    },
    methods: {
      setAuthenticated (status) {
        this.authenticated = status
      },
      logout () {
        this.authenticated = false
        window.localStorage.setItem('token', '')
      },
      changeUserName (item) {
        if (item.id === 1) {
          this.$refs.information.initGetData()
        } else if (item.id === 2) {
          this.$refs.password.initGetData()
        } else if (item.id === 3) {
          this.$refs.pointlist.initGetData()
        } else if (item.id === 4) {
          this.$refs.listUser.initGetData()
        } else if (item.id === 5) {
          this.$refs.evaluateUsers.initGetData()
        }
      }
    }
  }
</script>

<style>
  body {
    background-color: #F0F0F0;
    font-size: 13px;
  }
  h1 {
    padding: 0;
    margin-top: 0;
  }
  .logoClass{
    padding: 10px 15px;
    align-items: center;
    display: flex;
    font-size: 13px;
    background: #fff;
  }
  .logoClass img{
    max-height: 35px;
  }
  #footer {
    background-color: #dfe3e8;
    color: #039be5;
    padding: 10px 15px;
  }
</style>
