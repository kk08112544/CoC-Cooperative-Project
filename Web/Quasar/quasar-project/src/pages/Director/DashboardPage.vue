<!-- <template>
  <q-page class="q-pa-md">
    <h4 class="text-center">Dashboard</h4>
  
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
          <q-card-section class="bg-primary text-white" style="width: 250px;" v-if="!loading && dashboard.total !== undefined">
            <div class="text-subtitle2">{{ dashboard.total }} Person</div>
          </q-card-section>
          <q-card-section v-else>
            Loading...
          </q-card-section>
      </q-card>
      <q-card class="my-card">
          <q-card-section class="bg-primary text-white" style="width: 250px;" v-if="!loading && day.Day !== undefined">
            <div class="text-subtitle2">{{ day.Day }} Person</div>
          </q-card-section>
          <q-card-section v-else>
            Loading...
          </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>


<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "DashboardPage",
  setup() {
    const dashboard = ref({ total: 0 });
    const loading = ref(true);
    const day = ref({ day: 0})

    const fetchTotal = async () => {
      const userId = localStorage.getItem("user_id");
      const name = localStorage.getItem("name");
      const lastname = localStorage.getItem("lastname");
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/total`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        dashboard.value.total = response.data; // Assigning to total property
        loading.value = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        loading.value = false;
      }
    };
    const fetchDay = async () => {
      const userId = localStorage.getItem("user_id");
      const name = localStorage.getItem("name");
      const lastname = localStorage.getItem("lastname");
      const token = localStorage.getItem("accessToken");

      try{
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/day`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        day.value.Day = response.data

        
      }catch (error){

      }
    };

    onMounted(fetchTotal);

    return {
      dashboard,
      loading,
      day,
    };
  },
});
</script>

<style scoped>
.my-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.text-h6 {
  font-size: 20px;
  font-weight: bold;
}

.text-subtitle2 {
  font-size: 24px;
  color: #333;
  margin-top: 10px;
}

.bg-primary {
  background-color: #2196f3 !important;
}
.bg-negative {
  background-color: #f44336 !important;
}
</style> -->
<template>
  <q-page class="q-pa-md">
    <h4 class="text-center">Dashboard</h4>
  
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white" style="width: 250px;">
          <div class="text-subtitle2">{{ dashboard.total }} Person</div>
      </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-negative text-white" style="width: 250px;">
          <div class="text-subtitle2">{{ day.Day }} Person</div>
        </q-card-section>
      </q-card>
    </div>
    <!-- <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white" v-if="!loading && dashboard.total !== undefined">
          <div class="text-subtitle2">{{ dashboard.total }} Person</div>
        </q-card-section>
        <q-card-section v-else>
          Loading...
        </q-card-section>
      </q-card>

    </div> -->
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "DashboardPage",
  setup() {
    const dashboard = ref({ total: 0 });
    const loading = ref(true);
    const day = ref({ Day: 0 });

    const fetchTotal = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/total`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        dashboard.value.total = response.data;
        loading.value = false;
      } catch (error) {
        console.error("Error fetching total data:", error);
        loading.value = false;
      }
    };

    const fetchDay = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/dashboard/day`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        day.value.Day = response.data;
      } catch (error) {
        console.error("Error fetching day data:", error);
      }
    };
  

    onMounted(() => {
      fetchTotal();
      fetchDay();
    });

    return {
      dashboard,
      loading,
      day,
    };
  },
});
</script>

<style scoped>
.my-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.text-subtitle2 {
  font-size: 24px;
  color: #333;
  margin-top: 10px;
}

.bg-primary {
  background-color: #2196f3 !important;
}

.bg-negative {
  background-color: #f44336 !important;
}
</style>
