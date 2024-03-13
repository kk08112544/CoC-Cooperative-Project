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
        <div @click="toggleNotifications" v-if="notifications.length > 0" style="position: absolute; top: -8px; right: -8px" class="text-red">{{ notifications.length }}</div>
        
        <q-btn outline round color="primary" @click="toggleNotifications" style="position: relative;">
          <q-icon
            name="notifications"
            style="font-size: 30px; position: absolute; right: -12px; top: -10px;"
            color="black"
            class="q-mr-md"
          />
          <div v-if="notifications.length > 0" style="position: absolute; top: -8px; right: -8px" class="text-red">{{ notifications.length }}</div>
          <q-img
            :src="img" 
            :ratio="1"
            spinner-color="primary"
            spinner-size="32px"
            style="border-radius: 50%;"
          />
        </q-btn>
        <h6>{{ name }} {{ lastname }}</h6>
       
      </q-toolbar>
      <q-toolbar class="bg-primary text-white">
        <q-btn @click="handleDashboard" to="/director/dashboard" style="color: white" no-caps label="Dashboard" class="q-mr-md" />
        <q-btn @click="handleManagement" to="/director/role" style="color: white" no-caps label="Role" class="q-mr-md" />
        <q-btn @click="handleAlcohol" to="/director/RoomAlcohol" style="color: white" no-caps label="Alcohol" class="q-mr-md" />
        <q-btn @click="handleUser" to="/director/user" style="color: white" no-caps label="ListUser" class="q-mr-md" />
        <q-btn @click="handleProfile" to="/director/profile" style="color: white" no-caps label="Profile" class="q-mr-md" />
        <q-btn @click="handleLogout" to="/login" style="background: #F24C65; color: white" no-caps label="Logout" class="q-mr-md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'DirectorLayout',
  setup() {
    const name = ref('');
    const lastname = ref('');
    const img = ref('');
    const notifications = ref([]);
    const profile = ref(null);

    const fetchNotifications = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:3000/api/notify/Less', {
          headers: {
            "x-access-token": token,
          }
        });
        notifications.value = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchUserId = async () => {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/profile/${userId}`, {
          headers: {
            "x-access-token": token,
          }
        });
        profile.value = response.data;
        img.value = getImageUrl(response.data.img);
      } catch (error) {
        console.log(error);
      }
    }

    const getImageUrl = (img) => {
      return `http://localhost:3000/api/file/${img}`;
    };

    name.value = localStorage.getItem('name') || '';
    lastname.value = localStorage.getItem('lastname') || '';

    const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('accessToken');
    };

    const toggleNotifications = () => {
      if (notificationsMenu.value) notificationsMenu.value.$refs.notificationsMenu.toggle();
    };

    const fetchUserData = () => {
      fetchUserId();
    };

    const notificationsMenu = ref(null);

    onMounted(() => {
      fetchNotifications();
      fetchUserData();
    });

    return {
      name,
      lastname,
      handleLogout,
      toggleNotifications,
      notifications,
      fetchNotifications,
      notificationsMenu,
      img,
      profile,
    };
  },
};
</script>
