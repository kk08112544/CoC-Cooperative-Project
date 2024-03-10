<template>
  <q-page padding>
    <h4 class="text-center">Your Profile</h4>
    <div class="flex flex-center absolute-full text-subtitle2">
      <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7);">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
          <div v-if="profile.img">
            <q-img
              :src="getImageUrl(profile.img)"
              :ratio="9 / 9"
              spinner-color="primary"
              spinner-size="200px"
            />
          </div>
          <div v-else>
           
            <q-icon name="account_circle" size="100px"></q-icon>
          </div>
          <p>Name: {{ profile.name }}</p>
          <p>Lastname: {{ profile.lastname }}</p>
          <p>Username: {{ profile.username }}</p>
          <p>Role Name: {{ profile.role_name }}</p>
        </div>
      </q-card>
    </div>
  </q-page>
</template>


<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ProfileUserPage",

  data() {
    return {
      profile: [],
      loading: true,
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
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false;
        // Notify.create({
        //   type: "negative",
        //   message: "Failed to fetch profile data.",
        // });
      }
    },
  },

  mounted() {
    this.fetchData();
  },
});
</script>
