<template>
  <q-page padding>
    <h4 class="text-center">List User Page</h4>
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
              >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
              </q-input>
          </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="lastname" :props="props">{{ props.row.lastname }}</q-td>
            <q-td key="username" :props="props">{{ props.row.username }}</q-td>
            <q-td key="role_name" :props="props">
                {{ props.row.role_name }}
            </q-td>
            <q-td key="action" :props="props">
              <q-btn
                color="primary"
                flat
                round
                icon="edit"
                @click="editRecord(props.row)"
              />
              <q-btn
                color="primary"
                flat
                round
                icon="delete"
                @click="deleteRecord(props.row)"
              />
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
    name: "ListUserPage",
    
  data() {
    return {
      historyItems: [],
      loading: true,
      columns: [
        { name: "id", label: "ID", align: "left", field: "id", sortable: true },
        { name: "name", label: "Name", field: "name" },
        { name: "lastname", label: "Lastname", field: "lastname" },
        { name: "username", label: "Username", field: "username" },
        { name: "role_name", label: "Role Name", field: "role_name" },
        { name: "action", label: "Action", field: "action", align: "right" },
      ],
    //   getStatusColor : (role) => {
    //   const lowerCaseStatus = role.toLowerCase();

    //   if (lowerCaseStatus === "admin") {
    //     return "green";
    //   }else if (lowerCaseStatus === "user") {
    //     return "orange";
    //   } else {
    //     return ""; // คืนค่าว่างหากไม่ตรงเงื่อนไขใดๆ
    //   }
    // }
    //   form_add: false,
    //   form_edit: false,
    //   form_delete: false,
    //   role:'',
    //   input: { // สร้าง object input สำหรับเก็บข้อมูลที่ใช้ในการแก้ไข
    //     id: '',
    //     role: '',
    //     inputRole: '',
    //   },
    };
  },

  setup() {
    return {
    
    };
  },
  methods:{
    async fetchData() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/`, {
          headers: {
            "x-access-token": token,
          },
        });

        this.historyItems = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching history data:", error);
        this.loading = false;
      }
    },
  },    
  mounted() {
    this.fetchData();
  },
})

</script>