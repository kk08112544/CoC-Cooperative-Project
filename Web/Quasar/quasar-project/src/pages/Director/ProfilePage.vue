<template>
  <q-page>
    
      <div class="flex flex-center absolute-full text-subtitle2">
        <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7); width: 20%;">
          <!-- Adjust the opacity value as needed -->
          <div class="flex flex-center">
            <q-icon name="account_circle" color="grey-6" size="4rem" />
          </div>
          <q-card-section style="max-width: 600px;">
            
          </q-card-section>
        </q-card>
      </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios';
export default defineComponent({
  name: 'ProfilePage',
  data() {
    return {
      userId: null,
      historyItems: [],
      loading: true,
    };
  },

  created() {
    this.fetchRoles();
  },

  methods: {
    async fetchData(){
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      try{
        const response = await axios.get(
          `http://localhost:3000/api/auth/profile/${userId}`,
          {
            headers:{
              "x-access-token": token,
            }
          }
        )
        this.historyItems = response.data;
      }catch(error){
        console.log(error);
      }
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    this.fetchHistory();
  },

  
});
</script>

