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
        <q-btn outline round color="primary" @click="handleProfile" style="border-radius: 50%;">
          <q-img
            v-if="img"
            :src="img"
            :ratio="1"
            spinner-color="primary"
            spinner-size="32px"
            style="border-radius: 50%;"
          />
        </q-btn>
        &nbsp;
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
        <q-btn @click="handleProfile"  to="/user/profileuser" style="color: white"  no-caps label="Profile" class="q-mr-md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'UserLayout',
  setup() {
    const name = ref('');
    const lastname = ref(''); 
    const img = ref('');
    const profile = ref(null); // เพิ่ม ref สำหรับข้อมูลโปรไฟล์

    const fetchUserId = async () => {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/profile/${userId}`, {
          headers: {
            "x-access-token": token,
          }
        });
        profile.value = response.data; // กำหนดค่าข้อมูลโปรไฟล์
        img.value = getImageUrl(response.data.img); // กำหนดค่ารูปภาพโปรไฟล์
      } catch (error) {
        console.log(error);
      }
    }

    const getImageUrl = (img) => {
      return `http://localhost:3000/api/file/${img}`;
    };

    name.value = localStorage.getItem('name') || '';
    lastname.value = localStorage.getItem('lastname') || '';


    const fetchUserData = () => {
      // Fetch user data from Local Storage
      fetchUserId(); // เรียกใช้งานเมื่อมีการอัพเดทข้อมูลผู้ใช้
    };

    onMounted(() => {
      fetchUserData();
    });
    
    const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('accessToken');
    };

    const handleProfile = () => {
      // handle profile click
      console.log('Profile clicked');
    };
    
    return {
      name,
      lastname,
      handleLogout,
      img,
      profile, 
      handleProfile, // return handleProfile function
    }
  },
})
</script>
