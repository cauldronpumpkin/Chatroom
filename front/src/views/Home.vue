<template>
  <div class="home"><br><br><br><br>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-1" />
      <div class="col-md-6 col-sm-12 col-12">
        <v-card>
          <div class="col-md-12 col-sm-12 col-12">
            <v-text-field v-model="name" v-on:keyup="changeStore()" outlined label="Your Name..."/>
          </div>
          <div class="col-md-12 col-sm-12 col-12">
            <v-text-field v-model="room" outlined label="Create New Room.."/>
          </div>
          <div class="offset-md-5 offset-5 offset-sm-5">
            <v-btn dark v-on:click="joinRoom()" :loading="joinLoading">Join</v-btn>
          </div> <br>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    name: "",
    room: "",
    allRooms: [],
    joinLoading: false
  }),
  created() {
    this.$apollo.query({
      query: require('../graphql/allRooms.gql')
    }).then(res => {
      this.allRooms = res.data.rooms;
    })
  },
  methods: {
    changeStore: function() {
      this.$store.dispatch('changeName', this.name);
    },
    joinRoom: function() {
      var create = true;
      for(let i = 0; i < this.allRooms.length; i++) {
        if (this.allRooms[i].name == this.room) {
          create = false;
          localStorage.setItem('userForChatApp', this.name);
          localStorage.setItem('roomForChatApp', JSON.stringify(this.allRooms[i]));
          localStorage.setItem('online', false);
          router.push('/chat');
          break;
        }
      }
      if (create) {
        this.joinLoading = true;
        this.$apollo.mutate({
          mutation: require('../graphql/newRoom.gql'),
          variables: {
            name: this.room
          }
        }).then(res => {
          this.joinLoading = false;
          localStorage.setItem('userForChatApp', this.name);
          localStorage.setItem('roomForChatApp', JSON.stringify(res.data.insert_rooms));
          router.push('/chat');
        })
      }
    }
  }
}
</script>
