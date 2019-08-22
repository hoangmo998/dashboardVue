<template>
  <div class="home">
    <v-toolbar flat app class="blue darken-3">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <h1 style="color:white">Dashboard</h1>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-menu v-model="avatar" :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar color="purple" dark v-on="on">
              <span class="white--text headline">MH</span>
              <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
            </v-avatar>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar color="purple">
                  <span class="white--text headline">MH</span>
                  <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{name}}</v-list-item-title>
                  <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
                </v-list-item-content>
                <!-- <v-list-item-action>
                  <v-icon class="red--text">favorite</v-icon>
                </v-list-item-action> -->
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>account_circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Profile</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>settings</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Setting</v-list-item-content>
              </v-list-item>
              <router-link to="/login" class="logout">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>exit_to_app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content @click="deleteItem()">Log Out</v-list-item-content>
                </v-list-item>
              </router-link>
            </v-list>
          </v-card>
        </v-menu>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      mini-variant-width="90"
      app
      class="blue-grey darken-1"
    >
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title class="title">AdsPlus</v-list-item-title>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider />
          <v-list-item v-for="link in links" :key="link.text" mobile-break-point="991">
            <v-list-item-icon>
              <v-icon v-text="link.icon" class="white--text"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text" class="white--text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <subDashboard />
  </div>
</template>
<script>
import subDashboard from "./subDashboard.vue";
export default {
  components: {
    subDashboard
  },
  data() {
    return {
      name: "",
      email: "",
      drawer: true,
      avatar: false,
      mini: true,
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/"
        },
        {
          icon: "view_column",
          text: "Buttons",
          route: "/buttons"
        },
        {
          icon: "timeline",
          text: "Timeline",
          route: "/timeline"
        },
        {
          icon: "account_circle",
          text: "Profile",
          route: "/profile"
        }
      ]
    };
  },
  methods: {
    deleteItem() {
      localStorage.removeItem("token");
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    const displayName = user.displayName;
    const username = user.username;
    this.name = displayName;
    this.email = username;
  }
};
</script>
<style>
.title {
  border-radius: 4px;
  text-align: center;
  color: white;
  font-size: 30px;
}

.logout {
  text-decoration: none;
}
</style>