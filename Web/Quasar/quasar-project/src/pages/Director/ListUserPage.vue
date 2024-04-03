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
    placeholder="Search user"
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
    <q-td key="img" :props="props">
      <q-img
        :src="getImageUrl(props.row.img)" 
        :ratio="9 / 9"
        spinner-color="primary"
        spinner-size="200px"
      />
    </q-td>
    <q-td key="username" :props="props">{{ props.row.username }}</q-td>
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
                <div>
                  <!-- <div v-if="input.inputImg || input.img">
  <q-img
    :src="input.inputImg ? input.inputImg : getImageUrl(input.img)"
    :ratio="9 / 9"
    spinner-color="primary"
    spinner-size="200px"
  />
</div>
<div v-else>
  <q-img
    src="/path/to/default/image.jpg" 
    :ratio="9 / 9"
    spinner-color="primary"
    spinner-size="200px"
  />
</div> -->
<q-img

  :src="getImageUrl(input.img)"
  :ratio="9 / 9"
  spinner-color="primary"
  spinner-size="200px"
/>
                </div>
                
            <!-- <q-img
              v-if="input.img"
              :src="input.img"
              :ratio="4 / 3"
              spinner-color="primary"
              spinner-size="82px"
            ></q-img> -->
            <!-- file size = 1MB -->
            <q-file
              outlined
              label="Your avatar"
              v-model="uploadFile"
              accept=".jpg, .jpeg, .png"
              max-file-size="1048576"
              @rejected="onRejected"
              @update:model-value="updateFile()"
              
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
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
import { defineComponent, onErrorCaptured } from "vue";
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
        { name: "name", label: "Name", field: "name", align:"left" },
        { name: "lastname", label: "Lastname", field: "lastname" , align:"left"},
        { name: "img", label: "Image", field: "img" ,align:"center"},
        { name: "username", label: "Username", field: "username" },
        { name: "role_name", label: "Role Name", field: "role_name" },
        { name: "action", label: "Action", field: "action", align: "center" },
      ],
   
      form_edit: false,
      form_delete: false,
      role:'',
      input: {
  id:'',
  name:'',
  lastname:'',
  username:'',
  role_name:'',
  inputName:'',
  inputLastname:'',
  inputUsername:'',
  inputRoleName: '',
  img:'',            // Existing property to hold the image URL from the database
  inputImg:'',       // New property to hold uploaded image data
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
          item.username.toLowerCase().includes(this.filter.toLowerCase()) ||
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
    
    updateFile() {
      this.input.inputImg = URL.createObjectURL(this.uploadFile);
    },
    getImageUrl(img) {
      return `http://localhost:3000/api/file/${img}`;
    },
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
          item.username.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.role_name.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    }
  },

  async fetchData() {
    if (!this.filter) {
      // โหลดข้อมูลเฉพาะเมื่อไม่มีการค้นหา
      this.loading = true;
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      const roleId = localStorage.getItem("roleId");
      if(roleId == 1){
        console.log(userId);
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
      this.input.img = row.img
      this.input.inputImg = row.img
      this.form_edit = true;
    },

    deleteRecord(row) {
      this.input.id = row.id;
      this.form_delete = true;
    },
    async onDelete() {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/auth/${this.input.id}`, // Send DELETE request with the ID
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
      message: "Delete User  ID : "  +  response.data.id  +  " Successfully" ,
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

async onEdit(input){
   const token = localStorage.getItem("accessToken");
   try{
    const fileFormData = new FormData();
    fileFormData.append("singlefile",this.uploadFile);
    let img;
    console.log(this.uploadFile);
    if(this.uploadFile){
      const fileUploadResponse = await axios.post(
        "http://localhost:3000/api/file/upload",
        fileFormData
      );
      img = fileUploadResponse.data.uploadFileName;
    }else{
      img = null;
    }
    let profile;
    let roleId;

    console.log(this.input.inputRoleName.value);
    console.log(this.input.inputRoleName);

    if(this.input.inputRoleName.value === undefined){
      console.log(this.input.inputRoleName);
      console.log("No");
      const roleResponse = await axios.get('http://localhost:3000/api/role');
      const roles = roleResponse.data;
      const selectedRole = roles.find(role => role.role_name === this.input.inputRoleName);
      roleId = selectedRole ? selectedRole.id : null;
      console.log(roleId);

      if(img !== null){
        profile = {
          name: input.inputName,
          lastname: input.inputLastname,
          username: input.inputUsername,
          role_id: roleId,
          img,
        };
      }else{
        profile = {
          name: input.inputName,
          lastname: input.inputLastname,
          username: input.inputUsername,
          role_id: roleId,
        };
      }
      
    }else{
      console.log(this.input.inputRoleName.value);
      if(img !== null){
        profile = {
          name: input.inputName,
          lastname: input.inputLastname,
          username: input.inputUsername,
          role_id: this.input.inputRoleName.value,
          img,
        };
      }else{
        profile = {
          name: input.inputName,
          lastname: input.inputLastname,
          username: input.inputUsername,
          role_id: this.input.inputRoleName.value,
        };
      }
    }
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
    console.log(error);
   }
},
computed: {
    filteredItems() {
      const filtered = this.historyItems.filter(item => {
        return (
          item.id.toString().toLowerCase().includes(this.filter.toLowerCase()) ||
          item.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.lastname.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.username.toLowerCase().includes(this.filter.toLowerCase()) ||
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