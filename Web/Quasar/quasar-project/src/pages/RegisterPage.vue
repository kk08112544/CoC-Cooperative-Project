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
              ref="loginForm"
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
                <q-select  v-model="role" :options="options" label="Role" />
              </div>
              <div>
                <q-select v-model="department" :options="option" label="Department" />
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
export default {
  name: 'LoginPage',
  data() {
    return {
      name: '',
      lastname: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: null,
      department:null,
      usernameRules: [
        (v) => !!v || 'Username is required',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v) || 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ],
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      option: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    };
  },
  methods: {
    onSubmit() {
      // Handle form submission
    },
    onReset() {
      // Handle form reset
    },
    clearForm() {
      this.name = '';
      this.lastname = '';
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.role = null;
      this.department = null;
    }
  },
};
</script>
