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
              @submit.prevent="onSubmit"
              class="q-gutter-md"
            >
              <!-- Your form content -->
              <div>
                <q-input v-model="username" type="text" label="Username"/>
              </div>
              <div>
                
                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password">
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

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      username: null,
      password: null,
      isPwd: false // Add this property to control password visibility
    };
  },
  methods: {
    async onSubmit(){
      try{
        const response = await this.$axios.post(`http://localhost:3000/api/auth/login`,{
            username:this.username,
            password:this.password,
        });
        
        const AccessToken = response.data.accessToken;
        const role_Id = response.data.role_id;
        if(role_Id == 1){
          const user_id= response.data.id;
          const name = response.data.name;
          const lastname = response.data.lastname;
          this.name = name;
          this.lastname = lastname;
          const token = AccessToken;
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem('name', name);
          localStorage.setItem('lastname', lastname);
            this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Login successfully",
        });
          this.$router.push({
            path: '/director/dashboard',
            // query: {
            //   name: this.name,
            //   lastname: this.lastname
            // }
          });
        }else{
          const userId = response.data.id;
          const names = response.data.name;
          const lastnames = response.data.lastname;
          const Token = AccessToken;
          this.names = names;
          this.lastnames = lastnames;
          // localStorage.setItem("Token", Token);
          // localStorage.setItem("userId", userId);
          // localStorage.setItem('names', names);
          // localStorage.setItem('lastnames', lastnames);
          localStorage.setItem("Token", Token);
          localStorage.setItem("userId", userId);
          localStorage.setItem('names', names);
          localStorage.setItem('lastnames', lastnames);
          this.$router.push({
            path: '/user/alcohol',
            // query: {
            //   name: this.name,
            //   lastname: this.lastname
            // }
          });
        }
        // const user_Id = response.data.id;
        // const name = response.data.name;
        // const lastname = response.data.lastname;
        // this.name = name;
        // this.lastname = lastname;
        // console.log("Token:",AccessToken);
        // console.log("Role Id:",role_Id);
        // console.log("User Id:",user_Id);
        // console.log(response.data);
       
        // // localStorage.setItem("accessToken", accessToken);
        // // localStorage.setItem("userId", userId);
        // // localStorage.setItem('name', name);
        // // localStorage.setItem('lastname', lastname);

        // this.$q.notify({
        //   color: "green-4",
        //   textColor: "white",
        //   icon: "cloud_done",
        //   message: "Login successfully",
        // });
        // if(roleId == 1){
        //   localStorage.setItem("AccessToken", AccessToken);
        //   localStorage.setItem("user_Id", user_Id);
        //   localStorage.setItem('name', name);
        //   localStorage.setItem('lastname', lastname);

        // }else{
        //   localStorage.setItem("accessToken", accessToken);
        //   localStorage.setItem("userId", userId);
        //   localStorage.setItem('names', name);
        //   localStorage.setItem('lastnames', lastname);
        // }
        //this.$router.push(parseInt(roleId, 10) === 1 ? "/director/dashboard" : "/user/alcohol");
        // this.$q.notify({
        //   color: "green-4",
        //   textColor: "white",
        //   icon: "cloud_done",
        //   message: "Login successfully",
        // });
        // if (parseInt(roleId, 10) === 1) {
        //   this.$router.push({
        //     path: '/director/dashboard',
        //     // query: {
        //     //   name: this.name,
        //     //   lastname: this.lastname
        //     // }
        //   });
        // } else {
        //   this.$router.push({
        //     path: '/user/alcohol',
        //     // query: {
        //     //   // name: this.name,
        //     //   // lastname: this.lastname
        //     // }
        //   });
        // }
      } catch(error) {
        console.log("Login error", error);
        this.$q.notify({
          color: "red-4",
          textColor: "white",
          icon: "warning",
          message: "Login failed",
        });
      }
    },
    togglePwdVisibility() {
      this.isPwd = !this.isPwd; // Toggle password visibility
    }
  },
});


</script>