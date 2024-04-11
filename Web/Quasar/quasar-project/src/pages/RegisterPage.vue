<template>
  <q-page>
    <q-img src="Building07-scaled.jpg" style="height: 100vh;">
      <div class="flex flex-center absolute-full text-subtitle2">
        <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7); width: 20%;">
          <div class="flex flex-center">
            <q-icon name="account_circle" color="grey-6" size="4rem" />
          </div>
          <!-- <div v-else-if="uploadFile">
                <q-img :src="getObjectUrl(uploadFile)" style="max-width: 200px;" />
              </div> -->
          <q-card-section style="max-width: 600px;">
            <q-form
              @submit.prevent="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              ref="registerForm"
              style="background-color: transparent;"
            >
            <!-- <div v-if="uploadFile">
                <q-img :src="getObjectUrl(uploadFile)" style="max-width: 200px;" />
              </div> -->
              <div>
                <q-input v-model="name" type="text" label="Name" lazy-rules />
              </div>
              <div>
                <q-input v-model="lastname" type="text" label="Lastname" lazy-rules />
              </div>
              <div>
                <q-input v-model="username" type="text" label="Username" lazy-rules :rules="usernameRules" />
              </div>
              <div>
                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password" />
              </div>
              <div>
                <q-input v-model="cpassword" type="password" label="Confirm Password" />
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
          
              <div class="flex justify-end">
                <q-btn label="Sign Up" no-caps type="submit" color="primary" />
                <q-btn label="Reset" no-caps type="reset" color="primary" flat class="q-mr-sm" @click="clearForm" />
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
import { defineComponent } from 'vue';
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
      uploadFile: null,
      role: null,
      isPwd: false,
      usernameRules: [(v) => !!v || 'Username is required'],
      options: [],
    };
  },

  created() {
    this.fetchRoles();
  },

  methods: {
    getObjectUrl(file) {
      return URL.createObjectURL(file);
    },
    async onSubmit() {
  try {
    if(!this.name || !this.lastname || !this.username || !this.password || !this.cpassword || !this.role || !this.uploadFile){
      this.$q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'warning',
        message:'Content is not empty',
      });
    }
    // Check if username exists
    const response = await axios.get(`http://localhost:4000/api/auth/${this.username}`);
    const db_username = response.data.record ? response.data.record.username : null;

    if (this.username === db_username) {
      throw new Error('Username already exists.');
    }

    // Check if passwords match
    if (this.password !== this.cpassword) {
      throw new Error('Passwords do not match.');
    }

    let img = '';
    const fileFormData = new FormData();
    fileFormData.append('singlefile', this.uploadFile);
    // Upload file if provided
    if (this.uploadFile != null) {
      const fileUploadResponse = await axios.post('http://localhost:4000/api/file/upload', fileFormData);
      console.log(fileUploadResponse.data.uploadFileName);
      img = fileUploadResponse.data.uploadFileName;
      // localStorage.setItem('img', img);
    }

    // Create user
    const role_id = this.role.value;
    const sendResponse = await axios.post('http://localhost:4000/api/auth/signup', {
      name: this.name,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      role_id: role_id,
      img: img,
    });

    // Store user data in localStorage
    const accessToken = sendResponse.data.accessToken;
    const roleId = sendResponse.data.role_id;
    const userId = sendResponse.data.id;
    const name = sendResponse.data.name;
    const lastname = sendResponse.data.lastname;
  

    localStorage.setItem('roleId', roleId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('lastname', lastname);
    // localStorage.setItem('img', img);
    

    // Notify user
    this.$q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Registered successfully',
    });

    // Redirect user based on role
    this.$router.push(parseInt(roleId, 10) === 1 ? '/director/dashboard' : '/user/alcohol');
  } catch (error) {
    console.error('Signup error:', error);
    this.$q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'warning',
      message: error.message || 'Error during signup',
    });
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
      this.uploadFile = null;
    },

    togglePwdVisibility() {
      this.isPwd = !this.isPwd;
    },

    fetchRoles() {
      axios.get('http://localhost:4000/api/role')
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
  },
});
</script>
