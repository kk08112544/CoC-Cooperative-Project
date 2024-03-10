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
              @submit.prevent="onSubmit"
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
                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password"/>
              </div>
              <div>
                <q-input v-model="cpassword" type="password" label="Confirm Password"/>
              </div>
              <div>
                <q-select v-model="role" :options="options" label="Role" option-label="label" />
              </div>
              <div>
                <q-file
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
              <!-- <div v-if="role && departments.length > 0">
                <q-select v-model="department" :options="departments" label="Department" option-label="label" />
              </div> -->
              <div class="flex justify-end">
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-mr-sm"  @click="clearForm"/>
              </div>

              <div>
                <text-caption class="text-cyan-8">Have Account?
                  <router-link to="/login">Go To Login</router-link>
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
import { defineComponent } from 'vue'
import axios from 'axios';
export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      lastname: '',
      username: '',
      password: '',
      cpassword: '',
      role: null,
      isPwd: false,
      department: null,
      usernameRules: [
        (v) => !!v || 'Username is required',
      ],
      options: [],
      departments: []
    };
  },

  created() {
    this.fetchRoles();
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

    async onSubmit() {
      const response = await this.$axios.get(`http://localhost:3000/api/auth/${this.username}`);
      let db_username
      if (response.data.record != undefined) {
        db_username = response.data.record.username;
      } else {
        db_username = null
      }
      console.log(response.data);
      if (this.username === db_username) {
        this.$q.notify({
          color: "red-4",
          textColor: "white",
          icon: "warning",
          message: "This username is not available",
        });
        return;
      }
      if (this.password != this.cpassword) {
        this.$q.notify({
          color: "red-4",
          textColor: "white",
          icon: "warning",
          message: "Passwords do not match",
        });
        return;
      }
      try {
        const role_id = this.role.value;
        console.log("Selected role ID:", role_id);
        const sendResponse = await this.$axios.post(`http://localhost:3000/api/auth/signup`, {
          name: this.name,
          lastname: this.lastname,
          username: this.username,
          password: this.password,
          role_id: role_id,
        });
        const accessToken = response.data.accessToken;
        const roleId = response.data.role_id;
        const userId = response.data.id;
        const name = response.data.name;
        const lastname = response.data.lastname;

        localStorage.setItem("roleId",roleId);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("lastname", lastname);
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Registered successfully",
        });
        this.$router.push(parseInt(roleId, 10) === 1 ? "/director/dashboard" : "/user/alcohol");
        console.log("Signup successful:", sendResponse.data);
      } catch (error) {
        console.error("Signup error:", error);
      }
    },

    onReset() {
      this.$refs.registerForm.reset();
    },
    clearForm() {
      this.name = '';
      this.lastname = '';
      this.username = '';
      this.password = '';
      this.cpassword = '';
      this.role = null;
      this.department = null;
    },
    togglePwdVisibility() {
      this.isPwd = !this.isPwd;
    }
  },

  watch: {
    role: {
      handler: 'onRoleChange',
      immediate: true
    }
  },
});
</script>
