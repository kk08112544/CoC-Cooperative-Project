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
        />
        <h6>{{ name }} {{ lastname }}</h6>
        <q-icon
           name="notifications"
           class="q-mr-md"
           style="font-size: 30px; position: relative;"
           color="black"
        />
        <q-btn @click="handleLogout" style="background: #F24C65; color: white" no-caps label="Logout" class="q-mr-md" />
      </q-toolbar>
       <q-toolbar class="bg-primary text-white">
        <q-btn @click="handleDashboard"  to="/director/dashboard" style="color: white"  no-caps label="Dashboard" class="q-mr-md" />
        <q-btn @click="handleManagement"  to="/director/management" style="color: white"  no-caps label="Management" class="q-mr-md" />
        <q-btn @click="handleAlcohol"  to="/director/RoomAlcohol" style="color: white"  no-caps label="Management" class="q-mr-md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MainLayout',
  setup() {
    const name = ref('')
    const lastname = ref('')

    //const user_id = localStorage.getItem('user_id');
    name.value = localStorage.getItem('name');
    lastname.value = localStorage.getItem('lastname');
    // const token = localStorage.getItem('accessToken');
   // accessToken.value = localStorage.getItem('accessToken');
    
    const handleLogout = () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('accessToken');
    };

    return {
      name,
      lastname,
      handleLogout
    }
  },
}
</script>
