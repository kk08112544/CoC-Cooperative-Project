<template>
  <q-page class="q-pa-md">
    <h4 class="text-center">Dashboard</h4>
  
    <div class="q-pa-md row items-start q-gutter-md justify-center">
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
      <q-card class="my-card"  v-for="(item, index) in TotalChange" :key="index">
        <q-card-section class="bg-purple text-white" style="width: 400px;">
          <div class="text-subtitle2">Total Change Alcohol:</div>
          <div class="text-subtitle2">{{ item.Total_Change }}</div>
        </q-card-section>
      </q-card>
      <div v-if="loading">Loading...</div>
    <div v-else>
    <div class="d-flex justify-center">
      <q-table
      flat
        bordered
        title="Room Alcohol"
        :rows="filteredItems"
        :columns="columns"
        row-key="id"
        style="width: 100%; max-height: 500px; width: 1225px; overflow-y: auto;"
      >
      
      <template v-slot:top-right>
            <q-input
    borderless
    dense
    debounce="300"
    v-model="filter"
    placeholder="Search"
    :style="{ width: '300px', maxWidth: '500px' }"
    @input="filterData"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
          </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="room" :props="props">{{ props.row.room }}</q-td>
            <q-td key="detect" :props="props">{{ props.row.detect }}</q-td>
            <q-td key="status_name" :props="props">
              <q-badge
                :color="getStatusColor(props.row.status_name)"
                text-color="white"
              >
                {{ props.row.status_name }}
              </q-badge>
            </q-td>
      
           
          </q-tr>
        </template>
        
      </q-table>
    </div>
  </div>
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
      historyItems: [],
      // loading: true,
      filter: '',
      columns: [
        { name: "id", label: "ID", align: "left", field: "id", sortable: true },
        { name: "room", label: "Room", field: "room" },
        { name: "detect", label: "Have/Not Have", field: "detect" },
        { name: "status_name", label: "Status", field: "status_name" },
        // { name: "edit", label: "Edit Status", field: "edit", align: "center" },
        // { name: "action", label: "Action", field: "action", align: "center" },
      ],
      total: [],
      day:[],
      room:[],
      roomday:[],
      TotalRoom:[],
      TotlaRoles:[],
      TotalUser:[],
      TotalChange:[],
      loading:true,
    }
  },

  setup() {
    return {};
  },



  mounted() {
    this.fetchTotal();
    this.fetchDay();
    // this.fetchRoom();
    this.fetchRoomDay();
    this.fetchTotalRoom();
    this.fetchTotalRoles();
    this.fetchTotalUser();
    this.fetchTotalChange();
    this.fetchData(); // เรียกใช้เพื่อโหลดข้อมูล history เมื่อหน้าโหลดเสร็จสมบูรณ์
  },
  methods: {
    async fetchTotal() {
      const token = localStorage.getItem("accessToken");
      const img = localStorage.getItem("img");
      console.log(img);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/dashboard/total`,
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

    getStatusColor: (status) => {
        const lowerCaseStatus = status.toLowerCase();

        if (lowerCaseStatus === "non-active") {
          return "negative";
        } else if (lowerCaseStatus === "active") {
          return "positive";
        } else {
          return "";
        }
      },
    async fetchTotalChange(){
      const token = localStorage.getItem("accessToken");

      try{
        const response = await axios.get(
          `http://localhost:4000/api/dashboard/totalChange`,
          {
            headers:{
              "x-access-token":token,
            }
          }
        );
        this.TotalChange = response.data;
      }catch(error){
        console.error("Error fetching total change alcohol data:", error);
      }
    },
    
    async fetchDay() {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:4000/api/dashboard/day`,
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

    // async fetchRoom(){
    //   const token = localStorage.getItem("accessToken");z
    //   try{
    //     const response = await axios.get(
    //       `http://localhost:3000/api/dashboard/zone`,
    //       {
    //         headers: {
    //           "x-access-token": token,
    //         }
    //       }
    //     );
    //     this.room =response.data;
    //   }catch(error){
    //     console.error("Error fetching day data:", error);
    //   }
    // },
    async fetchRoomDay(){
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          `http://localhost:4000/api/dashboard/day_zone`,
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
          `http://localhost:4000/api/dashboard/total_room`,
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
          `http://localhost:4000/api/dashboard/totalRoles`,
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
          `http://localhost:4000/api/dashboard/getTotalUser`,
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
    async fetchData() {
      if (!this.filter) {
        const token = localStorage.getItem("accessToken");
      try {
        this.loading = true;
        const response = await axios.get(`http://localhost:4000/api/alcohol/`, {
          headers: {
            "x-access-token": token,
          },
        });
        this.historyItems = response.data;
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        this.loading = false;
      }
      }
     
    },
  },
  computed: {
    filteredItems() {
      const filterText = this.filter.toLowerCase();
  const filterLength = filterText.length;

  return this.historyItems.filter(item => {
    if (filterLength === 1) {
      return (
          item.id.toString().includes(filterText) ||
          item.detect.toString().includes(filterText)
        );
    }
    else if (filterLength === 2) {
      return (
        item.id.toString().includes(filterText) ||
        item.room.toString().includes(filterText)
      );
    }
    else {
      return (
        item.id.toString().toLowerCase().includes(filterText) ||
        item.room.toString().toLowerCase().includes(filterText) ||
        item.detect.toString().toLowerCase().includes(filterText) ||
        item.status_name.toLowerCase().includes(filterText)
      );
    }
  });
    },
  },

  watch: {
    filter(newFilter) {
      // Nothing needs to be done here
      // The computed property `filteredItems` will automatically update
      // based on the new value of `filter`
      console.log("Filtered items:", this.filteredItems);
    },
  },
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