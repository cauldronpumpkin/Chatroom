<template>
  <v-app>
     <v-app-bar
      color="primary"
      dense
      max-height="60"
      dark
      style="font-family: sans;"
    >
      <v-btn v-on:click="goHome()" text> ChatRoom </v-btn>
      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
        class="menu"
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            Popular-Rooms
          </v-btn>
        </template>

        <v-list v-for="(room,i) in allRooms" :key="i">
          <v-list-item
          > <v-btn text v-on:click="selectRoom(room)">
            "{{ room.name }}"--(chats: {{room.chats}})
          </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
import router from './router';

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    allRooms: [],
    room: {}
  }),
  computed: {
    userForChatApp() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.$apollo.query({
      query: require('./graphql/popRooms.gql')
    }).then(res => {
      this.allRooms = res.data.rooms;
    })
  },
  methods: {
    goHome: function() {
      this.room = JSON.parse(localStorage.getItem('roomForChatApp'));
      localStorage.removeItem('userForChatApp');
      localStorage.removeItem('roomForChatApp');
      router.push('/');
      location.reload();
    },
    selectRoom: function(room) {
      if(this.userForChatApp == "") {
        alert("fill your name");
      }
      else {
        localStorage.setItem('userForChatApp', this.userForChatApp);
        localStorage.setItem('roomForChatApp', JSON.stringify(room));
        router.push('/chat');
      }
    }
  }
};
</script>

<style scoped>
  .menu {
    display: unset;
  }
</style>