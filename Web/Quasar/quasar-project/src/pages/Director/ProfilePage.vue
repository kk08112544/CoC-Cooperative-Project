<template>
  <q-page padding>
   
    <h5 class="text-center">Your Profile</h5>
    <div class="flex flex-center">
      <br>
      <q-card class="my-card q-px-md p-py-md" style="width:400px; height:600px; background-color: rgba(255, 255, 255, 0.7);">
        <br>
        <div v-if="profile.img" class="text-center">
          <q-card-actions align="right">
          <q-btn icon="edit" color="positive" @click="editRecord(profile)" />
        </q-card-actions>
          <q-img
          :src="getImageUrl(profile.img)"
              :ratio="9 / 9"
              spinner-color="primary"
              spinner-size="200px"
          />
        </div>
        <div v-else>
          <div class="flex flex-center">
            <q-icon name="account_circle" color="grey-6" size="4rem" />
          </div>
        </div>
        <br>
        <div>
         <p class="text-center">Name: {{ profile.name }}</p>
        </div>
        <div>
          <p class="text-center">Lastname: {{ profile.lastname }}</p>
        </div>
        <div>
          <p class="text-center">Username: {{ profile.username }}</p>
        </div>
        <div>
          <p class="text-center">Role Name: {{ profile.role_name }}</p>
        </div>
        
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ProfilePage",

  data() {
    return {
      profile: [],
      // loading: true,
      form_edit:false,
      input:{
        id:'',
        name:'',
        lastname:'',
        username:'',
        role_name:'',

      },
    };
  },

  methods: {
    getImageUrl(img) {
      return `http://localhost:3000/api/file/${img}`;
    },
    async fetchData() {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/profile/${userId}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        this.profile = response.data;
        // this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        // this.loading = false;
        // Notify.create({
        //   type: "negative",
        //   message: "Failed to fetch profile data.",
        // });
      }
    },
    editRecord(profile){

    }
  },



  mounted() {
    this.fetchData();
  },
});
</script>
