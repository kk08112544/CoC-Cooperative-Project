<template>
  <q-page>
    <q-img src="Building07-scaled.jpg" style="height: 100vh;">
      <div class="flex flex-center absolute-full text-subtitle2">
        <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7);">
          <!-- Adjust the opacity value as needed -->
          <div class="flex flex-center">
            <q-icon name="account_circle" color="grey-6" size="4rem" />
          </div>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              ref="loginForm"
              style="background-color: transparent;"
            >
              <!-- Your form content -->
              <div>
                <q-input v-model="username" type="text" label="Username" lazy-rules :rules="[requiredValidate]"/>
              </div>
              <div>
                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password" lazy-rules :rules="[
                    (val) =>
                  (val && val.length >= 6) || 'Must be 6 characters at least.',
                ]">
                  <template v-slot:append>
                    <q-icon
                      @click="togglePwdVisibility"
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
                  <a href="/#/register">Create an Account</a>
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
import { useLoginUserStore } from "../stores/loginUserStrore" 
import { Notify } from 'quasar'
import { requiredValidate } from "../utils/validations";
export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      username: null,
      password: null,
      isPwd: false // Add this property to control password visibility
    };
  },
  methods: {
    requiredValidate,
    onSubmit() {
      // Handle form submission
      const data = {
        username: this.username,
        password: this.password
      }
      this.$api.post("/auth/login",data)
      .then((res)=>{
        if(res.status == 200){
            Notify.create({
              type: "positive",
              message: "Login sucessfully"
            });
            this.storeLogUser.userid = res.data.id;
            this.storeLogUser.roleId = res.data.role_id;
            this.storeLogUser.name = res.data.name;
            this.storeLogUser.lastname = res.data.lastname;
            this.storeLogUser.accessToken = res.data.accessToken;
           
            if (res.data.role_id===1){
              this.$router.push("/director/dashboard");
            }else{
              this.$router.push("/user/alcohol");
            }
          }
      })
      .catch((err)=>{
        console.log(err);
        Notify.create({
          type: "negative",
          message: "Invalid username or password"
        })
      })
      // this.$refs.loginForm.reset();
    },
    onReset() {
      // Handle form reset
      this.username = null;
      this.password = null;
      this.isPwd = false;
    },
    togglePwdVisibility() {
      this.isPwd = !this.isPwd; // Toggle password visibility
    }
  },
});
</script>
