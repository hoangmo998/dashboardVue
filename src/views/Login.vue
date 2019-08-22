<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-10">
              <!-- <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>-->
              <v-img src="../assets/Logo.png"></v-img>
              <v-card-text>
                <v-form>
                  <v-text-field label="Email" name="login" prepend-icon="person" type="text"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" rounded block>Login</v-btn>
              </v-card-actions>
              <div style="text-align: center">----------OR----------</div>
              <button class="loginBtn loginBtn--google" @click="login()">Login with Google</button>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import router from '../router.js'
// import jwt from 'jwt-decode'
import config from "../config";
export default {
  props: {
    token: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    login() {
      window.location.href = this.ssoUrl;
    },
    handleSubmit() {
      if (this.token) {
        this.$store.dispatch("login", this.token);
      }
    }
  },
  computed: {
    ssoUrl() {
      return `${config.ssoUrl}login`;
    }
  },
  mounted() {
    if (this.token) this.handleSubmit();
    if (this.$store.state.token) {
      this.$router.push("/");
    }
    // var str = window.location.href;
    // var arr = str.split('token=')[1]
    // console.log(arr)
    // var decoded = jwt(arr);
    // console.log(decoded)
    // var id = decoded.userId
    // if (id) {
    //   localStorage.setItem('token', id)
    // }
    // let getToken = localStorage.getItem('token')
    // console.log(getToken)
    // if (getToken) {
    //   router.push('/')
    // }
  }
};
</script>
<style>
a {
  text-decoration: none;
}

.loginBtn {
  box-sizing: border-box;
  position: relative;
  margin-left: 8em;
  margin-bottom: 5em;
  margin-top: 1em;
  padding: 0 20px 0 46px;
  border: none;
  text-align: center;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.3em;
  font-size: 18px;
  color: #fff;
}

.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}

.loginBtn:focus {
  outline: none;
}

.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgb(0, 100, 250);
}

.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39;
}

.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}

.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
}
</style>