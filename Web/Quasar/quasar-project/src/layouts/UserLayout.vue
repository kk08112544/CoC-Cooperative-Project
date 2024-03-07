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
        <q-icon name="account_circle" color="grey-6" size="3rem" />
        <h6>{{ name }} {{ lastname }}</h6>

        <q-icon
           name="notifications"
           class="q-mr-md"
           style="font-size: 30px; position: relative;"
           color="black"
        />
        <q-btn @click="handleLogout" to="/login" style="background: #F24C65; color: white" no-caps label="Logout" class="q-mr-md" />
      </q-toolbar>
      <q-toolbar class="bg-primary text-white">
        <q-btn @click="handleAlcohol"  to="/user/alcohol" style="color: white"  no-caps label="Alcohol" class="q-mr-md" />
        <q-btn @click="handleProfile"  to="/user/profile" style="color: white"  no-caps label="Profile" class="q-mr-md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UserLayout',
  setup() {
    const name = ref('');
    const lastname = ref(''); 
    
    name.value = localStorage.getItem('name');
    lastname.value = localStorage.getItem('lastname');
    
    const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('accessToken');
    };
    
    return {
      name,
      lastname,
      handleLogout,
    }
  },
})
</script>
