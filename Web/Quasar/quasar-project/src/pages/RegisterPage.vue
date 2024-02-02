<template>
  <q-page>
    <q-img src="Building07-scaled.jpg" style="height: 100vh;">
      <div class="flex flex-center absolute-full text-subtitle2">
        <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7); width: 20%;">
          <!-- Adjust the opacity value as needed -->
          <div class="flex flex-center">
            <q-icon name="account_circle" color="grey-6" size="4rem" />
          </div>
          <q-card-section style="max-width: 600px;">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              ref="registerForm"
              style="background-color: transparent;"
            >
              <div>
                <q-input v-model="name" type="text" label="Name" lazy-rules/>
              </div>
              <div>
                <q-input v-model="lastname" type="text" label="Lastname" lazy-rules/>
              </div>
              <div>
                <q-input v-model="username" type="text" label="Username" lazy-rules :rules="usernameRules"/>
              </div>
              <div>
                <q-input v-model="password" type="password" label="Password" lazy-rules :rules="passwordRules"/>
              </div>
              <div>
                <q-input v-model="confirmPassword" type="password" label="Confirm Password"/>
              </div>
              <div>
                <q-select v-model="role" :options="options" label="Role" option-label="label" @change="onRoleChange" />
              </div>
              <div v-if="role">
                <q-select v-model="department" :options="departments" label="Department" option-label="label" />
              </div>
              <div class="flex justify-end">
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-mr-sm"  @click="clearForm"/>
              </div>

              <div>
                <text-caption class="text-cyan-8">Have Account?
                  <a href="/#/login">Go To Login</a>
                </text-caption>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-img>
  </q-page>
</template>
<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      lastname: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: null,
      department: null,
      usernameRules: [
        (v) => !!v || 'Username is required',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v) || 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ],
      options: [],
      departments: []
    };
  },

  created() {
    this.fetchRoles(); // เรียกใช้งานเพื่อเตรียมรายการ role ที่เลือกไว้เริ่มต้น
   // this.onRoleChange(); // เรียกใช้งานเพื่อเตรียมรายการแผนกที่สอดคล้องกับ role ที่เลือกไว้เริ่มต้น
  },

  methods: {
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
    fetchDepartments(roleId){
      axios.get(`http://localhost:3000/api/department/roles/${roleId}`)
      .then(response => {
        this.departments = response.data.map(department => ({
          label: department.depart_name,
          value:  department.id
        }))
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      })
    },
    getRoleId(roleName){
      return axios.get(`http://localhost:3000/api/role`)
      .then(response => {
        const foundRole = response.data.find(role => role.role_name === roleName);
        return foundRole? foundRole.id : null;
      })
      .catch(error => {
        console.error('Error fetching Role:', error);
        return null;
      })
    },
    onRoleChange() {
      if (this.role) {
        const roleName = this.options.find(option => option.value === this.role).label;
        console.log("Selected role Name:",roleName);
        this.getRoleId(roleName)
          .then(roleId => {
            if(roleId){
              console.log("Found this Role Id", roleId);
              this.fetchDepartments(roleId);
            }else{
              console.log("Role with name", roleName, "not found!");
            }
          })
      }
    },

    onSubmit() {
      if (this.password.trim() !== this.confirmPassword.trim()) {
        this.$q.notify({ type: 'negative', message: 'Passwords do not match' });
        return;
      }
      // Other form submission logic
    },
    onReset() {
      this.$refs.registerForm.reset();
    },
    clearForm() {
      this.name = '';
      this.lastname = '';
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.role = null;
      this.department = null;
    },
   
  },

  watch: {
    role: function(newRole, oldRole) {
      if (newRole !== oldRole) {
        this.onRoleChange();
      }
    }
  },
};
</script>
