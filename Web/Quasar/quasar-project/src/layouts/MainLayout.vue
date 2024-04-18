<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>

      <div class="row no-wrap shadow-1" style="height: 5px;">
        <q-toolbar class="col-8 col-md-7 bg-negative text-white q-pa-xs">
          <!-- Adjusted padding to q-pa-xs -->
        </q-toolbar>
        <q-toolbar class="col-4 col-md-5 bg-primary text-white q-pa-xs">
          <!-- Adjusted padding to q-pa-xs -->
        </q-toolbar>
      </div>

      <!-- Main Header Toolbar -->
      <q-toolbar class="bg-white text-primary q-pa-none" style="height: 100px;">
    
        <q-img
          src="Bangkok_Hospital_Phuket-logo-48EE6B9950-seeklogo.com.png" 
          :ratio="16/9"
          spinner-color="primary"
          spinner-size="82px"
          style="width: 270px; height: 75px; margin-left: 20px; margin-right: auto;"
          @click="handleIndex"
        />

        <q-btn @click="handleLogin" to="/login" style="background: #F24C65; color: white" no-caps label="Login" class="q-mr-md" />
        <q-btn @click="handleRegister" to="/register" style="background: #F24C65; color: white" no-caps label="Register" class="q-mr-md" />
        &nbsp;&nbsp;
      </q-toolbar>
       
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  methods: {
    handleIndex() {
      this.$router.push({ path: '/' }); // Navigate to the root path
    },
    handleLogin() {
      // handle login logic
    },
    handleRegister() {
      // handle register logic
    }
  },

  setup() {
    return {}
  }
})
</script>
