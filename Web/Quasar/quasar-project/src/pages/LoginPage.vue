<template>
  <q-page>
    <q-img src="Building07-scaled.jpg" style="height: 100vh;">  <!-- ภาพพื้นหลังหน้านี้ ความสูง 100 vh-->
      <!--  form login อยู่ตรงกลาง-->
      <div class="flex flex-center absolute-full text-subtitle2">
        <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7);">
          <!-- Adjust the opacity value as needed -->
          <div class="flex flex-center">
            <q-icon name="account_circle" color="grey-6" size="4rem" />
          </div>
          <q-card-section>
            <!-- เมื่อมีการกดปุ่ม login แล้ว onSubmit จะไปทำ ตรง async onSubmit ตรง Script -->
            <q-form @submit.prevent="onSubmit" class="q-gutter-md">
              <!-- Your form content -->
              <div>
                <q-input v-model="username" type="text" label="Username"/>
              </div>
              <div>
                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password">
                   <!--  เปิดปิดเพื่อดู password-->
                  <template v-slot:append>
                    <q-icon @click="togglePwdVisibility" :name="isPwd ? 'visibility_off' : 'visibility'"/>
                  </template>
                </q-input>
              </div>
              <div>
                <q-btn label="Login" no-caps type="submit" color="primary" style="width: 100%;" />
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      username: null,
      password: null,
      isPwd: false, // Added isPwd property
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await this.$axios.post(`http://localhost:3000/api/auth/login`, { // ส่งข้อมูล username , password ท
          username: this.username,
          password: this.password,
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
          type: "positive",
          message: "Logged in successfully",
        });

        console.log(response.data);
        // Check if roleId is a number (remove quotes around 1) // ถ้า roleId = 1 ให้ไปหน้า dashboard ถ้า roleId เป็นอื่นๆ ไปหน้า alcohol
        this.$router.push(parseInt(roleId, 10) === 1 ? "/director/dashboard" : "/user/alcohol");
      } catch (error) {
        console.log("Login error", error);
        //notify ว่า login ไม่สำเร็จ
        this.$q.notify({
          color: "negative",
          textColor: "white",
          type: "negative",
          message: "This username or password are not matches ",
        });
      }
    },
    togglePwdVisibility() {
      this.isPwd = !this.isPwd; // Toggle password visibility
    },
  },
});
</script>
