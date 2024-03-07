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
          @click="toggleNotifications"
          style="font-size: 30px; position: relative;"
          color="black"
          class="q-mr-md"
        >
        <q-badge v-if="totals.length > 0" style="position: absolute; top: -8px; right: -8px">{{ totals[0].totals }}</q-badge>

          <q-menu
            ref="notificationsMenu"
            anchor="down right"
            :content-class="'bg-white text-primary'"
          >
            <q-list>
              <!-- Add individual notifications here -->
              <q-item clickable v-for="(notification, index) in notifications" :key="index">
                <q-item-section>{{ notification.room }} don't have Alcohol</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
        <q-btn @click="handleLogout" to="/login" style="background: #F24C65; color: white" no-caps label="Logout" class="q-mr-md" />
      </q-toolbar>
      <q-toolbar class="bg-primary text-white">
        <q-btn @click="handleDashboard"  to="/director/dashboard" style="color: white"  no-caps label="Dashboard" class="q-mr-md" />
        <q-btn @click="handleManagement"  to="/director/role" style="color: white"  no-caps label="Role" class="q-mr-md" />
        <q-btn @click="handleAlcohol"  to="/director/RoomAlcohol" style="color: white"  no-caps label="Alcohol" class="q-mr-md" />
        <q-btn @click="handleUser"  to="/director/user" style="color: white"  no-caps label="ListUser" class="q-mr-md" />
        <q-btn @click="handleProfile"  to="/director/profile" style="color: white"  no-caps label="Profile" class="q-mr-md" />
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
    const notifications = ref([]);
    const totals = ref([]);

    const fetchNotifications = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:3000/api/notify/Less',{
          headers:{
            "x-access-token": token,
          }
        });
        notifications.value = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchTotal = async () => {
      const token = localStorage.getItem('accessToken');
      try{
        const response = await axios.get('http://localhost:3000/api/notify/count',{
          headers:{
            "x-access-token": token,
          }
        });
        totals.value = response.data;
      }catch(error){
        console.error('Error fetching total:', error);
      }
    }

    name.value = localStorage.getItem('name') || '';
    lastname.value = localStorage.getItem('lastname') || '';

    const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('accessToken');
    };

    const toggleNotifications = () => {
      notificationsMenu.value?.$refs.notificationsMenu.toggle();
    };

    const notificationsMenu = ref(null);

    onMounted(() => {
      fetchNotifications();
      fetchTotal();
    });

    return {
      name,
      lastname,
      handleLogout,
      toggleNotifications,
      notifications,
      fetchNotifications,
      notificationsMenu,
      totals,
    };
  },
};

</script>
