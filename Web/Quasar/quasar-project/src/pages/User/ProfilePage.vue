<template>
    <q-page padding>
      <h4 class="text-center">Your Profile</h4>
     
     <div v-if="loading">Loading...</div>
     <div v-else>
      <div class="q-pa-md">
        <q-table
        flat
          bordered
          :rows="historyItems"
          :columns="columns"
          row-key="id"
        >
        
        <template v-slot:top-right>
              <q-input
      borderless
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search by User Id"
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
    
    </q-page>
  </template>
  <script>
  import { defineComponent } from "vue";
  import axios from "axios";
  import { useQuasar } from 'quasar'
  import { Notify } from 'quasar';
  
  export default defineComponent({
    name: "RoomAlcoholPage",
  
    data() {
      return {
        historyItems: [],
        loading: true,
        filter: '',
        columns: [
          { name: "id", label: "ID", align: "left", field: "id", sortable: true },
          { name: "room", label: "Room", field: "room" },
          { name: "detect", label: "Have/Not Have", field: "detect" },
          { name: "status_name", label: "Status", field: "status_name" },
          // { name: "edit", label: "Edit Status", field: "edit", align: "center" },
          // { name: "action", label: "Action", field: "action", align: "center" },
        ],
        // form_delete: false,
        // form_edit: false,
        // form_add: false,
        // room: '',
        // input: {
        //   id: '',
        //   room: '',
        //   inputRoom: '',
        //   inputValue: ''
        // },
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
      };
    },
  
    setup() {
      return {};
    },
  
    methods: {
      filterData() {
    if (!this.filter) {
      // Reset loading state and fetch data
      this.loading = true;
      this.fetchData();
    } else {
      // Filter data based on the entered ID
      this.historyItems = this.historyItems.filter(item => {
        return item.id.toString().toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  },
  async fetchData() {
    const token = localStorage.getItem("accessToken");
    try {
      this.loading = true;
      const response = await axios.get(`http://localhost:3000/api/alcohol/`, {
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
  },
    },
  
    mounted() {
      this.fetchData();
    },
  });
  </script>
  
  