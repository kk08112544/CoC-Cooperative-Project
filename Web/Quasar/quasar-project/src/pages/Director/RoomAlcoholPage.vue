<template>
    <q-page padding class="q-pa-md">
      <h4 class="text-center">Alcohol Room</h4>

      <div align="right" class="q-mr-sm">
          <q-btn style="background: #F24C65; color: white" color: white icon="add" label="Add"  no-caps />
      </div>
      <div class="q-pa-md">
        <q-table
          flat
          bordered
          title="Alcohol"
          :rows="filteredRows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search by Room"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
      </div>
       

    </q-page>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const columns = [
    {
      name: "id",
      required: true,
      label: "ID",
      align: "left",
      field: "id",
      sortable: true,
    },
    { name: "room", label: "Room", field: "room", sortable: true },
    { name: "detect", label: "Have/Not Have", field: "detect", sortable: true },
    {
      name: "status_name",
      label: "Status",
      field: "status_name",
    },
    {
      name: "edit",
      label: "Update",
      field: "edit",
    },
    {
      name: "delete",
      label: "Delete",
      field: "Delete",
    },
  ];

  export default defineComponent({
    name:"RoomAlcoholPage",
    data(){
      return{
        alcohol: [],
        loading: true,
      };
    },
    mounted() { // Corrected mounted lifecycle hook
      this.fetchData();
    },

    methods: {
      async mounted() {
        const token = localStorage.getItem("accessToken");

        try{
          const response = await axios.get(
            "http://localhost:3000/api/dashboard/amount",
            {
              headers:{
                "x-access-token":token,
              },
            }
          );
          this.alcohol = response.data;
          this.loading = false;
        }catch(error){
          console.error("Error fetching data:", error);
          this.loading = false;
        }
      }
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
  .button-table-container {
  margin-bottom: 20px; /* ระยะห่างระหว่างปุ่มกับตาราง */
}
  
  </style>
  
  <!-- <template>
  <q-page padding class="q-pa-md">
    <h4 class="text-center">Alcohol Room</h4>

    <div align="right" class="q-mr-sm">
      <q-btn style="background: #FF0000; color: white" color="white" icon="add" label="Add" />
    </div>

    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Alcohol"
        :rows="alcohol"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search by Room"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

  <script>
 import { defineComponent, ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  const columns = [
    {
      name: "id",
      required: true,
      label: "ID",
      align: "left",
      field: "id",
      sortable: true,
    },
    { name: "room", label: "Room", field: "room", sortable: true },
    { name: "detect", label: "Have/Not Have", field: "detect", sortable: true },
    {
      name: "status",
      label: "Status",
      field: "status",
    },
    {
      name: "edit",
      label: "Update",
      field: "edit",
    },
    {
      name: "delete",
      label: "Delete",
      field: "Delete",
    },
  ];
  export default defineComponent({
  name: "RoomAlcoholPage",
  data() {
    return {
      alcohol: [],
      loading: true,
    };
  },
  mounted() { // Corrected mounted lifecycle hook
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:3000/api/dashboard/amount",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        this.alcohol = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false;
      }
    },
  },
});

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
    .button-table-container {
    margin-bottom: 20px; /* ระยะห่างระหว่างปุ่มกับตาราง */
  }
    
    </style> -->