<template>
  <q-page>
    <q-img src="Building07-scaled.jpg" style="height: 100vh;">
          <div class="flex flex-center absolute-full text-subtitle2 flex flex-center">
  <q-card class="bg-grey-2 my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.8);"> <!-- Adjust the opacity value as needed -->
    <div class="flex flex-center">
      <q-icon name="account_circle" color="grey-6" size="4rem" />
    </div>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="loginForm"
      >
        <!-- Your form content -->

        <div>
          <q-input v-model="username" type="text" label="Username" lazy-rules :rules="usernameRules"/>
        </div>
        <div>
          <q-input type="password" v-model="password" label="Password">
            <template v-slot:append>
              <q-icon
                @click="isPwd = !isPwd"
                :name="isPwd ? 'visibility_off' : 'visibility'"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn label="Submit" type="submit" color="primary" style="width: 100%;" />
        </div>
        <div>
          <text-caption class="text-cyan-8">Not registered?
            <a href="/register">Create an Account</a>
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
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      usernameRules: [
        (v) => !!v || 'Username is required',
      ],
      // Add more rules for the password if needed
    };
  },
  methods: {
    onSubmit() {
      // Handle form submission
    },
    onReset() {
      // Handle form reset
    },
  },
};
</script>
