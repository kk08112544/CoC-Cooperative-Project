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
  <q-dialog v-model="form_edit" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="edit" color="primary" text-color="white" />
                <span class="q-ml-sm">Update User ID: {{ input.id }}</span>
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
              <q-card-section>
               <div>
                <q-input
  v-model="input.inputName"
  outlined
  label="Name"
/>

               </div>
              </q-card-section>
             <q-card-section>
              <div>

                <q-input
  v-model="input.inputLastname"
  outlined
  label="Lastname"
/>
              </div>
             </q-card-section>
             <q-card-section>
              <div>

                <q-input
  v-model="input.inputUsername"
  outlined
  label="Username"
/>
              </div>
             </q-card-section>
             <q-card-section>
  <div>
    <!-- <q-input
      v-model="input.inputRoleName"
      outlined
      label="Role Name"
    /> -->
    <q-select
      v-model="input.inputRoleName"
      outlined
      label="Role Name"
      :options="options"
    />
   
  </div>
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
            <span class="q-ml-sm">Delete User ID: {{ input.id }}</span>
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
    name: "ListUserPage",
    
  data() {
    return {
      historyItems: [],
      loading: true,
      filter: '',
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
      form_edit: false,
      form_delete: false,
      role:'',
      // input: { // สร้าง object input สำหรับเก็บข้อมูลที่ใช้ในการแก้ไข
      //   id: '',
      //   role: '',
      //   inputRole: '',
      // },
      input: {
        id:'',
        name:'',
        lastname:'',
        username:'',
        role_name:'',
        inputName:'',
        inputLastname:'',
        inputUsername:'',
        inputRoleName: '', // เพิ่ม selectedRole เพื่อเก็บค่าบทบาทที่เลือก
    },
      options: [],
    };
  },
  computed: {
    filteredItems() {
      const filtered = this.historyItems.filter(item => {
        return (
          item.id.toString().toLowerCase().includes(this.filter.toLowerCase()) ||
          item.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.lastname.toLowerCase().includes(this.filter.toLowerCase()) ||
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
  created() {
    this.fetchRoles();
  },
  methods:{
    
    fetchRoles() {
      axios.get('http://localhost:3000/api/role')
        .then(response => {
          this.options = response.data.map(role => ({
            label: role.role_name,
            value: role.id
          }));
        })
        .catch(error => {
          console.error('Error fetching roles:', error);
        });
    },
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
          item.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.lastname.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.role_name.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    }
  },
    // a
    // async fetchData() {
    //   const token = localStorage.getItem("accessToken");
    //   try {
    //     const response = await axios.get(`http://localhost:3000/api/auth/`, {
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
    }
  },

    editRecord(row){
      this.input.id = row.id;
      this.input.name = row.name,
      this.input.lastname = row.lastname,
      this.input.username = row.username,
      this.input.role_name = row.role_name,
      this.input.role_id = row.role_id,
      this.input.inputName = row.name,
      this.input.inputLastname = row.lastname,
      this.input.inputUsername = row.username,
      this.input.inputRoleName = row.role_name,
      this.input.inputRoleId  = row.role_id,
      this.form_edit = true;
    },

    deleteRecord(row){
      this.input.id = row.id;
      this.form_delete = true;
    },

    
//     async onEdit(input) {
//   const token = localStorage.getItem("accessToken");

//   try {
//     let roleId;
//     const role_name = input.inputRoleName;

//     // ตรวจสอบว่ามี role_name หรือไม่ ถ้ามีให้ดึง roleId จากชื่อบทบาท
//     if (role_name) {
//       const roleResponse = await this.$axios.get('http://localhost:3000/api/role');
//       const roles = roleResponse.data;
//       const selectedRole = roles.find(role => role.role_name === role_name);
//       roleId = selectedRole ? selectedRole.id : null;
//     } else {
//       // ถ้าไม่มี role_name ให้ใช้ roleId จาก inputRoleName ที่เลือกมาแล้ว
//       roleId = input.inputRoleName;
//     }

//     // สร้าง object profile เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
//     const profile = {
//       name: input.inputName,
//       lastname: input.inputLastname,
//       username: input.inputUsername,
//       role_id: roleId,
//     };

//     // ส่งคำขอ put เพื่ออัพเดทข้อมูลผู้ใช้
//     const response = await this.$axios.put(
//       `http://localhost:3000/api/auth/${input.id}`,
//       profile,
//       {
//         headers: {
//           "x-access-token": token,
//         },
//       }
//     );

//     // ปิดหน้าต่างแก้ไขข้อมูล
//     this.form_edit = false;

//     // แสดงแจ้งเตือนแสดงว่าอัพเดทข้อมูลสำเร็จ
//     this.$q.notify({
//       color: "green",
//       textColor: "white",
//       type: "positive",
//       message: "Update User ID: " + response.data.id + " Successfully",
//       timeout: 1000
//     });

//     // รีโหลดหน้าเพื่อแสดงข้อมูลใหม่
//     setTimeout(() => {
//       window.location.reload();
//     }, 1000);
//   } catch (error) {
//     // หากเกิดข้อผิดพลาดในการอัพเดทข้อมูล ให้แสดงใน console
//     console.error("Error updating user id:", error);
//   }
// },

async onEdit(input){
  const token = localStorage.getItem("accessToken");
  let profile;
  let roleId;
  try{
    console.log(this.input.inputRoleName.value);
    console.log(this.input.inputRoleName);
    if(this.input.inputRoleName.value === undefined ){
      console.log(this.input.inputRoleName);
      console.log("No");
      const roleResponse = await this.$axios.get('http://localhost:3000/api/role');
      const roles = roleResponse.data;
      const selectedRole = roles.find(role => role.role_name === this.input.inputRoleName);
      roleId = selectedRole ? selectedRole.id : null;
      console.log(roleId);
      profile = {
      name: input.inputName,
      lastname: input.inputLastname,
      username: input.inputUsername,
      role_id: roleId,
    };

    }else{
      console.log(this.input.inputRoleName.value);
      profile = {
      name: input.inputName,
      lastname: input.inputLastname,
      username: input.inputUsername,
      role_id: this.input.inputRoleName.value,
    };
    }
    // const profile = {
    //   name: input.inputName,
    //   lastname: input.inputLastname,
    //   username: input.inputUsername,
    //   role_id: this.input.inputRoleName.value,
    // };
    const response = await this.$axios.put(
      `http://localhost:3000/api/auth/${input.id}`,
       profile,
      {
        headers: {
          "x-access-token": token,
        },
      }
    )
          // ปิดหน้าต่างแก้ไขข้อมูล
    this.form_edit = false;

    // แสดงแจ้งเตือนแสดงว่าอัพเดทข้อมูลสำเร็จ
    this.$q.notify({
      color: "green",
      textColor: "white",
      type: "positive",
      message: "Update User ID: " + response.data.id + " Successfully",
      timeout: 1000
    });

    // รีโหลดหน้าเพื่อแสดงข้อมูลใหม่
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }catch(error){
    console.error("Error updating user id:", error);
  }
},
// async onEdit(input) {
//   const token = localStorage.getItem("accessToken");

//   try {
//     let roleId;
//     const role_name = input.inputRoleName;
    
//     console.log("Role Name:", role_name);
//     input.inputRoleId = this.input.inputRoleName.value
//     console.log("Role ID:",input.inputRoleId);
//     let role = input.inputRoleId;
//     let profile;
//     if (role_name) {
//       const roleResponse = await this.$axios.get('http://localhost:3000/api/role');
//       const roles = roleResponse.data;

//       const selectedRole = roles.find(role => role.role_name === role_name);
//       roleId = selectedRole ? selectedRole.id : null;
//       profile = {
//       name: input.inputName,
//       lastname: input.inputLastname,
//       username: input.inputUsername,
//       role_id: roleId,
//     };
//     } else if (role) {
//   let role_id = role;
//   console.log("Role ID in else if:", roleId);
//     profile = {
//       name: input.inputName,
//       lastname: input.inputLastname,
//       username: input.inputUsername,
//       role_id,
//     };
// }

    

//     const response = await this.$axios.put(
//       `http://localhost:3000/api/auth/${input.id}`,
//       profile,
//       {
//         headers: {
//           "x-access-token": token,
//         },
//       }
//     );

//     this.form_edit = false;
//     this.$q.notify({
//       color: "green",
//       textColor: "white",
//       type: "positive",
//       message: "Update User ID: " + response.data.id + " Successfully",
//       timeout: 1000
//     });
//     setTimeout(() => {
//       window.location.reload();
//     }, 1000);
//   } catch (error) {
//     console.error("Error updating user id:", error);
//   }
// },






computed: {
    filteredItems() {
      const filtered = this.historyItems.filter(item => {
        return (
          item.id.toString().toLowerCase().includes(this.filter.toLowerCase()) ||
          item.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.lastname.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.role_name.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
      return filtered;
    },
  },
  },    
  mounted() {
    this.filterData(); // เรียกใช้งาน filterData เมื่อโหลดหน้าครั้งแรก
  this.fetchData();
  },
  watch: {
  filter: function(newFilter) {
    this.filterData(); // เรียกใช้งาน filterData เมื่อมีการเปลี่ยนแปลงคำค้นหา
  },
},
})

</script>