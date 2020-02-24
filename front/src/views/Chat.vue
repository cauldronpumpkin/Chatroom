<template>
<div>
    <div class="row">
        <div id="div"
            class="col-md-4 offset-md-4 col-10 offset-1 col-sm-6 offset-sm-3 overflow-auto" 
            style="margin-top: 50px; height: 600px">
            <div v-for="(chat, i) in listOfChats" :key="i">
                <div
                    v-bind:class="{
                        'd-flex flex-row': chat.byUser != user, 
                        'd-flex flex-row-reverse': chat.byUser == user
                    }">
                    <div class="d-inline-flex bd-highlight">
                        <v-card max-width="300" class="p-2" v-bind:class="{
                            'other': chat.byUser != user,
                            'me': chat.byUser == user,
                        }"> 
                            <h5>{{ chat.body }}</h5>
                            <p style="font-size: 12px;">~{{ chat.byUser }}</p>
                            <p style="font-size: 10px; margin-top: -15px;">
                                {{ chat.created_at.split('.')[0].split('T')[1] }}
                                -{{chat.created_at.split('.')[0].split('T')[0]}}
                            </p>
                        </v-card>
                    </div>
                </div><br>
            </div>
        </div>
    </div>
    <div class="row">
        <v-card color="grey" class="col-md-4 offset-md-4 offset-1 offset-sm-3 col-sm-6 col-10">
            <div class="col-md-12"><v-text-field label="say something.." v-model="message"/></div>
            <div class="offset-md-11 offset-sm-11 offset-10">
                <v-btn v-on:click="sendMessage()" large icon>
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </div>
        </v-card>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        listOfChats: [],
        user: "",
        message: "",
        length: 0,
        room: {}
    }),
    apollo: {
        $subscribe: {
            newChat: {
                query: require('../graphql/getChat.gql'),
                variables: {
                    id: JSON.parse(localStorage.getItem('roomForChatApp')).id
                }, 
                result (data) {
                    this.listOfChats = data.data.message;
                    if (this.length != this.listOfChats.length) {
                        setTimeout(function(){
                            let ele = document.getElementById('div');
                            ele.scrollTop = ele.scrollHeight;
                        }, 500);
                    }
                    this.length = this.listOfChats.length;
                },
            },
        },
    },
    created() {
        this.user = localStorage.getItem('userForChatApp');
        this.room = JSON.parse(localStorage.getItem('roomForChatApp'));
    },
    methods: {
        sendMessage: function() {
            this.listOfChats.push({
                body: this.message,
                byUser: this.user,
                created_at: new Date().toString(),
                roomId: this.room.id 
            });
            this.$apollo.mutate({
                mutation: require('../graphql/increment.gql'),
                variables: {
                    id: this.room.id,
                    chats: 1,
                    online: 0
                }
            });
            this.$apollo.mutate({
                mutation: require('../graphql/insertChat.gql'),
                variables: {
                    body: this.message,
                    byUser: this.user,
                    roomId: this.room.id
                }
            })
        }
    }
}
</script>

<style scoped>
    .me {
        background-color: #00acee;
    }
    .other {
        background-color: #c7cccb;
    }
</style>