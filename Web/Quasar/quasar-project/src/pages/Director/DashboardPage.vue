<template>
  <q-page class="q-pa-md">
    <h4 class="text-center">Dashboard</h4>
  
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card"  v-for="(item, index) in total" :key="index">
        <q-card-section class="bg-primary text-white" style="width: 400px;">
          <div class="text-subtitle2">Total Used Alcohol</div>
          <div class="text-subtitle2">Totat: {{ item.total }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card"  v-for="(item, index) in day" :key="index">
        <q-card-section class="bg-red text-white" style="width: 400px;">
          <div class="text-subtitle2">Today</div>
          <div class="text-subtitle2">Total: {{ item.Day }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card"  v-for="(item, index) in TotalRoom" :key="index">
        <q-card-section class="bg-positive text-white" style="width: 400px;">
          <div class="text-subtitle2">Total Room</div>
          <div class="text-subtitle2">Total: {{ item.Total_Room }}</div>
        </q-card-section>
      </q-card>
      <!-- <q-card class="my-card"  v-for="(item, index) in room" :key="index">
        <q-card-section class="bg-accent text-white" style="width: 300px;">
          <div class="text-subtitle2">Room: {{ item.room }}</div>
          <div class="text-subtitle2">Total: {{ item.Total }} Person</div>
        </q-card-section>
      </q-card> -->
      <q-card class="my-card"  v-for="(item, index) in TotlaRoles" :key="index">
        <q-card-section class="bg-warning text-white" style="width: 400px;">
          <div class="text-subtitle2">Total Roles:</div>
          <div class="text-subtitle2">{{ item.Total_Role }}</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card"  v-for="(item, index) in TotalUser" :key="index">
        <q-card-section class="bg-pink text-white" style="width: 400px;">
          <div class="text-subtitle2">Total Users:</div>
          <div class="text-subtitle2">{{ item.Total_User }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: "DashboardPage",

  data() {
    return {
      total: [],
      day:[],
      room:[],
      roomday:[],
      TotalRoom:[],
      TotlaRoles:[],
      TotalUser:[],
      loading:true,
    }
  },

  mounted() {
    this.fetchTotal();
    this.fetchDay();
    this.fetchRoom();
    this.fetchRoomDay();
    this.fetchTotalRoom();
    this.fetchTotalRoles();
    this.fetchTotalUser();
  },

  methods: {
    async fetchTotal() {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/total`,
          {
            headers: {
              "x-access-token": token,
            }
          }
        );

        this.total = response.data;
      } catch (error) {
        console.error("Error fetching total data:", error);
      }
    },
    
    async fetchDay() {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/day`,
          {
            headers: {
              "x-access-token": token,
            }
          }
        );

        this.day = response.data;
      } catch (error) {
        console.error("Error fetching day data:", error);
      }
    },

    async fetchRoom(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/zone`,
          {
            headers: {
              "x-access-token": token,
            }
          }
        );
        this.room =response.data;
      }catch(error){
        console.error("Error fetching day data:", error);
      }
    },
    async fetchRoomDay(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/day_zone`,
          {
            headers: {
              "x-access-token": token,
            }
          }
        );
        this.roomday =response.data;
      }catch(error){
        console.error("Error fetching day data:", error);
      }
    },
    async fetchTotalRoom(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/total_room`,
          {
            headers:{
              "x-access-token": token,
            }
          }
        )
        this.TotalRoom = response.data;
      }catch(error){
        console.error("Error fetching total room:", error);
      }
    },

    async fetchTotalRoles(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/totalRoles`,
          {
            headers:{
              "x-access-token": token,
            }
          }
        )
        this.TotlaRoles = response.data;
      }catch(error){
        console.error("Error fetching total room:", error);
      }
    },

    async fetchTotalUser(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/getTotalUser`,
          {
            headers:{
              "x-access-token": token,
            }
          }
        )
        this.TotalUser = response.data;
      }catch(error){
        console.error("Error fetching total room:", error);
      }
    },

  }
})
</script>

<style scoped>
.my-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.text-subtitle2 {
  font-size: 24px;
  color: #333;
  margin-top: 10px;
}

.bg-primary {
  background-color: #2196f3 !important;
}

.bg-negative {
  background-color: #f44336 !important;
}


</style>