<template>
  <q-page padding>
    <h4 class="text-center">Roles Management</h4>
    <div align="right" class="q-mr-sm">
      <q-btn style="background:#F24C65;" icon="add" label="Add" class="text-white" no-caps @click="form_add = true" />

  </div>
  <q-dialog v-model="form_add">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="add" color="primary" text-color="white" />
        <div class="text-h6">Add Roles</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <span class="q-ml-sm"
                >Roles:</span
        >
        <q-input outlined v-model="role" label="Roles Name" />
      </q-card-section>
      <q-card-actions align="right">
              <q-btn flat label="NO" color="primary" v-close-popup />
              <q-btn
                flat
                label="YES"
                color="primary"
                @click="addToRoles"
              />
      </q-card-actions>
    </q-card>
  </q-dialog>
   <div v-if="loading">Loading...</div>
   <div v-else>
    <div class="q-pa-md">
      <q-table
      flat
  bordered
  :rows="filteredItems"
  :columns="columns"
  row-key="id"
      >
      
          <template v-slot:top-right>
            <q-input
    borderless
    dense
    debounce="600"
    v-model="filter"
    placeholder="Search by Id and Role Name"
    :style="{ width: '300px', maxWidth: '500px' }"
>
    <template v-slot:append>
        <q-icon name="search" />
    </template>
</q-input>
          </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="role_name" :props="props">{{ props.row.role_name }}</q-td>
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
  <q-dialog v-model="form_edit" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="edit" color="primary" text-color="white" />
                <span class="q-ml-sm">Update Roles ID: {{ input.id }}</span>
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
              <q-card-section>
                <span class="q-ml-sm"
                  >Role Name: {{ input.role_name }}</span
                >
              </q-card-section>
             <q-card-section>
              <q-input
  v-model="input.inputRole"
  outlined
  label="Role Name"
/>

             </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="NO" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="YES"
                  color="primary"
                  @click="onEdit(input)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="form_delete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="primary" text-color="white" />
            <span class="q-ml-sm">Delete Roles ID: {{ input.id }}</span>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="NO" color="primary" v-close-popup />
            <q-btn flat label="YES" color="primary" @click="onDelete" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useQuasar } from 'quasar'
import { Notify } from 'quasar';

export default defineComponent({
  name: "RolePage",

  data() {
    return {
      historyItems: [],
      loading: true,
      filter: '',
      columns: [
        { name: "id", label: "ID", align: "left", field: "id", sortable: true },
        { name: "role_name", label: "Role Name", field: "role_name" },
        { name: "action", label: "Action", field: "action", align: "right" },
      ],
      form_add: false,
      form_edit: false,
      form_delete: false,
      role:'',
      input: { // สร้าง object input สำหรับเก็บข้อมูลที่ใช้ในการแก้ไข
        id: '',
        role: '',
        inputRole: '',
      },
    };
  },

  computed: {
    filteredItems() {
      const filtered = this.historyItems.filter(item => {
        return (
          item.id.toString().toLowerCase().includes(this.filter.toLowerCase()) ||
          item.role_name.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
      return filtered;
    },
  },
  setup() {
    return {
    
    };
  },

  methods:{
    filterData() {
    if (!this.filter) {
      this.loading = true; // ให้ loading = true เมื่อทำการกรองข้อมูล
      this.fetchData(); // โหลดข้อมูลเดิมทั้งหมดเมื่อไม่มีคำค้นหา
      this.loading = false; // หยุด loading เมื่อโหลดข้อมูลเสร็จสมบูรณ์
    } else {
      // กรองข้อมูลเฉพาะที่ตรงกับคำค้นหา
      this.historyItems = this.historyItems.filter(item => {
        return (
          item.id.toString().toLowerCase().includes(this.filter.toLowerCase()) ||
          item.role_name.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    }
  },
    // async fetchData() {
    //   const token = localStorage.getItem("accessToken");
    //   try {
    //     const response = await axios.get(`http://localhost:3000/api/role/`, {
    //       headers: {
    //         "x-access-token": token,
    //       },
    //     });

    //     this.historyItems = response.data;
    //     this.loading = false;
    //   } catch (error) {
    //     console.error("Error fetching history data:", error);
    //     this.loading = false;
    //   }
    // },
    async fetchData() {
    if (!this.filter) {
      // โหลดข้อมูลเฉพาะเมื่อไม่มีการค้นหา
      this.loading = true;
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://localhost:3000/api/role/`, {
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
    }
  },
    addMenu: () => {
      form_add = true;
    },

    async addToRoles() {
  const token = localStorage.getItem("accessToken");
  try {
    if (!this.role) {
      this.$q.notify({
        color: "negative",
        textColor: "white",
        type: "negative",
        message: "Content is not empty",
        timeout: 1000
      });
    } else {
      const isValidRole = /^[a-zA-Z]+$/.test(this.role);
      if (!isValidRole) {
      this.$q.notify({
        color: "negative",
        textColor: "white",
        type: "negative",
        message: "Role must contain only letters (a-z)",
        timeout: 1000
      });
    } else {
      const response = await axios.post(
        `http://localhost:3000/api/role/addToRoles/`,
        { role_name: this.role }, // ส่งข้อมูลห้องไปยังเซิร์ฟเวอร์
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      this.form_add = false;
      this.$q.notify({
        color: "green",
        textColor: "white",
        type: "positive",
        message: "Add Roles ID: "  +  response.data.id + " Successfully",
        timeout: 1000
      });
      // ทำการรีโหลดหน้าหลังจากเพิ่มข้อมูลเรียบร้อย
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
   }
  } catch (error) {
    console.error("Error adding room:", error);
  }
},
editRecord(row){
  this.input.id = row.id;
  this.input.role_name = row.role_name;
  this.input.inputRole = row.role_name;
  this.form_edit = true; // เพิ่มบรรทัดนี้เพื่อเปิด form_edit
},
 async onEdit(input){
    const token =localStorage.getItem("accessToken");
    try{
      if(!input.inputRole){
        this.$q.notify({
          color: "negative",
          textColor: "white",
          type: "negative",
          message: "Content is not empty",
          timeout: 1000
        });
      }else{
        const isValidRole = /^[a-zA-Z]+$/.test(input.inputRole);
        if(!isValidRole){
          this.$q.notify({
            color: "negative",
            textColor: "white",
            type: "negative",
            message: "Role must contain only letters (a-z)",
            timeout: 1000
          });
        }else{
          const response = await this.$axios.put(
      `http://localhost:3000/api/role/updateToRoles/${input.id}`,
      {role_name:input.inputRole},
      {
        headers:{
          "x-access-token":token,
        }
      }
    )
     
    this.form_edit = false; // เพิ่มบรรทัดนี้เพื่อปิด form_edit เมื่อทำการแก้ไขเสร็จสมบูรณ์
      
      this.$q.notify({
        color: "green",
        textColor: "white",
        type: "positive",
        message: "Update Roles  ID : "  +  response.data.id  +  " Successfully",
        timeout: 1000
      });
      // ทำการรีโหลดหน้าหลังจากเพิ่มข้อมูลเรียบร้อย
      setTimeout(() => {
        window.location.reload();
      }, 1000);
        }
      }
    }catch(error){
      console.error("Error updating roles name:", error);
    }
 },
 deleteRecord(row) {
      this.input.id = row.id;
      this.form_delete = true;
    },
    async onDelete() {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/role/deleteToRoles/${this.input.id}`, // Send DELETE request with the ID
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    this.form_delete = false; // Close the delete dialog
    this.$q.notify({
      color: "green",
      textColor: "white",
      type: "positive",
      message: "Delete Role  ID : "  +  response.data.id  +  " Successfully" ,
      timeout: 1000,
    });
    // Refresh the data after deletion
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Error deleting roles:", error);
  }
},
  },

  // mounted() {
  //   this.fetchData();
  // },
  mounted() {
  this.filterData(); // เรียกใช้งาน filterData เมื่อโหลดหน้าครั้งแรก
  this.fetchData();
},
watch: {
  filter: function(newFilter) {
    this.filterData(); // เรียกใช้งาน filterData เมื่อมีการเปลี่ยนแปลงคำค้นหา
  },
},
});
</script>
<style>
.form-dialog {
  background-color: white; /* กำหนดสีพื้นหลังของ q-card เป็นสีขาว */
}
.my-custom-dialog {
  background-color: #f0f0f0; /* กำหนดสีพื้นหลังให้กับฟอร์ม */
}
.form-edit-dialog {
    background-color: #f0f0f0;
}

</style>
