<template>
  <q-page class="q-pa-md">
    <h4 class="text-center">Dashboard</h4>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white" style="width: 250px;">
        <div class="text-h6">Total User</div>
        <div class="text-subtitle2">{{ totalUsers }} Person</div>
      </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-negative text-white" style="width: 250px;">
          <div class="text-h6">User Today</div>
          <div class="text-subtitle2">{{ usersToday }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-warning text-white" style="width: 250px;">
          <div class="text-h6">User Zone A Total</div>
          <div class="text-subtitle2">{{ zoneATotal }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-info text-white" style="width: 250px;">
          <div class="text-h6">User Zone B Total</div>
          <div class="text-subtitle2">{{ zoneBTotal }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-accent text-white" style="width: 250px;">
          <div class="text-h6">User Zone C Total</div>
          <div class="text-subtitle2">{{ zoneCTotal }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-positive text-white" style="width: 250px;">
          <div class="text-h6">User Zone D Total</div>
          <div class="text-subtitle2">{{ zoneDTotal }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white" style="width: 250px;">
          <div class="text-h6">User Zone A Today</div>
          <div class="text-subtitle2">{{ zoneAToday }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-negative text-white" style="width: 250px;">
          <div class="text-h6">User Zone B Today</div>
          <div class="text-subtitle2">{{ zoneBToday }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-info text-white" style="width: 250px;">
          <div class="text-h6">User Zone C Today</div>
          <div class="text-subtitle2">{{ zoneCToday }} Person</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-warning text-white" style="width: 250px;">
          <div class="text-h6">User Zone D Today</div>
          <div class="text-subtitle2">{{ zoneDToday }} Person</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: 'DashboardPage',
  data() {
    return {
      dashboard:[],
      loading:true,
    };
  },
  methods: {
    async fetchDataTotal() {
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get('http://localhost:3000/api/dashboard/total',
            {
              headers: {
                "x-access-token": token,
              },
            }
        );
        this.dashboard = response.data;
        this.loading = false;
      }catch(error){
        console.error("Error fetching data:", error);
        this.loading = false;
      }
    },
    async fetchDataDay(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get('http://localhost:3000/api/dashboard/day',
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
      }catch(error){

      }
    }
  },
})
</script>

<style scoped>
.my-card {
  background-color: #fff; /* เปลี่ยนเป็นสีขาว */
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.text-h6 {
  font-size: 20px;
  font-weight: bold;
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
