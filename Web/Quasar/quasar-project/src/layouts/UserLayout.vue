<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="row no-wrap shadow-1" style="height: 5px;">
        <q-toolbar class="col-8 col-md-7 bg-negative text-white q-pa-xs">
        </q-toolbar>
        <q-toolbar class="col-4 col-md-5 bg-primary text-white q-pa-xs">
        </q-toolbar>
      </div>
      <q-toolbar class="bg-white text-primary q-pa-none" style="height: 100px;">

        <q-img
          src="Bangkok_Hospital_Phuket-logo-48EE6B9950-seeklogo.com.png" 
          :ratio="16/9"
          spinner-color="primary"
          spinner-size="82px"
          style="width: 270px; height: 75px; margin-left: 20px; margin-right: auto;"
        />
  
        <q-btn outline round color="primary">
          <q-img
            :src="img" 
            :ratio="1"
            spinner-color="primary"
            spinner-size="32px"
            style="border-radius: 50%;"
          />
        </q-btn>
        &nbsp;
        <div style="display: flex; align-items: center; position: relative;">
          <h6 style="margin-right: 10px;">{{ name }} {{ lastname }}</h6>
        </div>
       
       
<div style="display: flex; align-items: center; position: relative;">
 
  <div @click="toggleNotifications" style="position: relative;">
    &nbsp;&nbsp;
    <div @click="toggleNotifications" style="position: relative; flex-grow: 1;">
    <div class="row justify-content-end"> 
      <div class="col"> 
        
        <div v-if="totals && totals.length > 0">
  <template v-for="(total, index) in totals">
    <span v-if="total.total !== 0" :key="index" style="color: red;">
     &nbsp;&nbsp; {{ total.total }}
    </span>
  </template>
</div>
      </div>
    </div>
  </div>
  <q-icon
      name="notifications"
      style="font-size: 30px; width: 15px; height: 20px;"
      color="black"
      class="q-mr-md"
      @click="insertDataToDatabase"
    />
    
  </div> 
 
  


<q-menu ref="notificationsMenu" style="position: absolute; top: 100%; left: 0; width: 350px; height: 500px;">
  <q-list>
    <q-item v-for="notification in sortedNotifications" :key="notification.id">
     
    
      <div class="horizontal-line" v-if="index !== sortedNotifications.length - 1">
      <q-item-section v-if="notification.detect === 0">
        <div style="display: none;">{{ notification.id }}</div>
        <div style="display: none;">{{ notification.alcohol_id }}</div>
        <div style="display: none;">{{ notification.detect }}</div>
        Room {{ notification.room }} have alcohol 
        <br/>
        Date:   {{ notification.date }}
        <br/>
        Times:  {{ notification.times }}
      </q-item-section>
     
      <q-item-section v-else>
        Room {{ notification.room }} don't have alcohol.
        <br/>
        Date:   {{ notification.date }}
        <br/>
        Times:  {{ notification.times }}
      </q-item-section>
    </div>
    </q-item>
    <q-item v-for="item in sortedReads" :key="item.id">
  <div class="horizontal-line" v-if="index !== sortedNotifications.length - 1">
    <q-item-section v-if="item.detect === 0">
      <div style="display: none;">{{ item.id }}</div>
      <div style="display: none;">{{ item.alcohol_id }}</div>
      <div style="display: none;">{{ item.detect }}</div>
      Room {{ item.room }} have alcohol 
      <br/>
      Date:   {{ item.date }}
      <br/>
      Times:  {{ item.times }}
    </q-item-section>
   
    <q-item-section v-else>
      Room {{ item.room }} don't have alcohol.
      <br/>
      Date:   {{ item.date }}
      <br/>
      Times:  {{ item.times }}
    </q-item-section>
  </div> 
</q-item>

  </q-list>
  
</q-menu>

</div>

        <q-btn @click="handleLogout" to="/login" style="background: #F24C65; color: white" no-caps label="Logout" class="q-mr-md" />
        
      </q-toolbar>
     
      <q-toolbar class="bg-primary text-white">
    <q-item clickable @click="handleAlcoho" to="/user/alcohol">
        <q-item-section>
            <q-item-label style="color: white" class="q-mr-md" no-caps>
                Alcohol
            </q-item-label>
        </q-item-section>
    </q-item>
    <q-item clickable @click="handleProfile" to="/user/profileuser">
        <q-item-section>
            <q-item-label style="color: white" class="q-mr-md" no-caps>
                Profile
            </q-item-label>
        </q-item-section>
    </q-item>

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
  name: 'UserLayout',
 
  setup() {
    const name = ref('');
    const lastname = ref('');
    const img = ref('');
    const notifications = ref([]);
    const profile = ref(null);
    const totals = ref([]);
    const reads = ref([]);

    const getHistoryUserIdLook = async () => {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      try{
        const response = await axios.get(`http://localhost:3000/api/HistoryUserId/look/${userId}`, {
          headers: {
            "x-access-token": token,
          }
        });
        reads.value = response.data;
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }
    
    const fetchNotifications = async () => {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/api/HistoryUserId/${userId}`, {
          headers: {
            "x-access-token": token,
          }
        });
        notifications.value = response.data;
        // console.log(notifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchTotalNotifications = async () => {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/api/HistoryUserId/total/${userId}`, {
          headers: {
            "x-access-token": token,
          }
        });
        totals.value = response.data;
        // console.log(notifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

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
      fetchTotalNotifications();
      getHistoryUserIdLook();
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
      totals,
      profile,
      fetchTotalNotifications,
      getHistoryUserIdLook,
      reads,
    };
  },
  methods: {
    async insertDataToDatabase() {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  try {
    // Iterate over notifications and collect data
    for (const notification of this.notifications) {
      const data = {
        his_id: notification.id,
        alcohol_id: notification.alcohol_id,
        room: notification.room,
        dates: notification.dates,
        times: notification.times,
        detect: notification.detect,
        user_id: userId, // Fix variable name
      };

      // Make HTTP POST request to the API endpoint
      const response =await axios.post('http://localhost:3000/api/HistoryUserId/createHistory', data, {
        headers: {
          "x-access-token": token,
        }
      });
      console.log(response.data);
    }

    // If insertion is successful, clear the notifications list
    this.notifications = [];
  } catch (error) {
    console.error('Error inserting data:', error);
    // Handle error as needed
  }
}
  },
  computed: {
  sortedNotifications() {
    // ทำการคัดลอกรายการการแจ้งเตือนก่อน
    const copiedNotifications = [...this.notifications];
    
    // เรียงลำดับรายการตามวันที่และเวลา
    copiedNotifications.sort((a, b) => {
      // ใช้ Date object เพื่อทำการเปรียบเทียบวันที่และเวลา
      const dateA = new Date(`${a.date}T${a.times}`);
      const dateB = new Date(`${b.date}T${b.times}`);
      
      // เรียงลำดับจากมากไปน้อย
      return dateB - dateA;
    });
    
    return copiedNotifications;
  },
  sortedReads() {
    return this.reads.slice().sort((a, b) => b.id - a.id);
  }
},
};
</script>
<style>
  .horizontal-line {
    width: calc(100% + 20px); /* 100% width plus padding on both sides */
    border-bottom: 1px solid #ccc; /* You can adjust the style as needed */
    margin: 10px -10px; /* Negative margin to stick to the edges */
    
  }
</style>