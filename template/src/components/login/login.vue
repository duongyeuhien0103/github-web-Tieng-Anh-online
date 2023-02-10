<template>
  <div id="login">
    <h1>Login</h1>
    <v-layout wrap>
      <v-flex xs3>
        <v-subheader class="px-0">User name *</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field
          placeholder=""
          v-model="input.username"
          :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
          required
          name="username"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-subheader class="px-0">Password *</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field
          placeholder=""
          :rules="[v => !!v || 'Trường dữ liệu bắt buộc']"
          required
          v-model="input.password"
          type= "password"
          name="password"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 mt-3>
        <a @click="addAccount" class="pointer"><i>Tạo tài khoản</i></a>
      </v-flex>
      <v-flex xs9 mt-3>
        <v-btn 
          dark
          class="ma-0 float-right primary"
          @click="login()"
          >
          Login
        </v-btn>
      </v-flex>
      <personal-information ref='information'></personal-information>
    </v-layout>
    <!-- <input type="text" name="username" v-model="input.username" placeholder="Username" /> -->
    <!-- <input type="password" name="password" v-model="input.password" placeholder="Password" /> -->
    
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        input: {
          username: 'hoanlt@fds.vn',
          password: '1'
        }
      }
    },
    created () {
      this.$nextTick(function () {
        // this.login()
      })
    },
    methods: {
      login () {
        if (this.input.username !== '' && this.input.password !== '') {
          var vm = this
          var url = vm.end_point + 'users'
          var pram = {
            params: {
              'username': vm.input.username,
              'password': vm.input.password
            }
          }
          window.axios.get(url, pram)
            .then(function (response) {
              if (response.data !== null) {
                vm.$store.commit('updateUserInformation', response.data)
                console.log('>>>>>>>>>response.data', response.data)
                vm.$emit('authenticated', true)
                vm.$router.replace({name: 'list'})
                window.localStorage.setItem('token', response.data._id)
                window.showMessageToastr('success', 'Đăng nhập thành công')
              } else {
                window.showMessageToastr('error', 'Tài khoản/mật khẩu chưa đúng')
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('A username and password must be present')
        }
      },
      addAccount () {
        this.$refs.information.initCreate()
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 100px;
    padding: 20px;
  }
</style>
<!-- custom class -->
