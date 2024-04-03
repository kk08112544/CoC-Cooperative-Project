<template>
  <q-page padding>
    <h4 class="text-center">List Room</h4>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="q-pa-md">
        <q-table
          flat
          bordered
          :rows="filteredItems" 
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search by User Id"
              :style="{ width: '300px', maxWidth: '500px' }"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="room" :props="props">{{ props.row.room }}</q-td>
              <q-td key="detect" :props="props">{{ props.row.detect }}</q-td>
              <q-td key="status_name" :props="props">
                <q-badge
                  :color="getStatusColor(props.row.status_name)"
                  text-color="white"
                >
                  {{ props.row.status_name }}
                </q-badge>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AlcoholPage",
  
  data() {
    return {
      historyItems: [],
      loading: true,
      filter: '',
      columns: [
        { name: "id", label: "ID", align: "left", field: "id", sortable: true },
        { name: "room", label: "Room", field: "room" },
        { name: "detect", label: "Have/Not Have", field: "detect" },
        { name: "status_name", label: "Status", field: "status_name" },
      ],
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loading = true;
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://localhost:3000/api/alcohol/`, {
          headers: { "x-access-token": token }
        });
        this.historyItems = response.data;
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        this.loading = false;
      }
    },
    getStatusColor(status) {
      const lowerCaseStatus = status.toLowerCase();
      if (lowerCaseStatus === "non-active") {
        return "negative";
      } else if (lowerCaseStatus === "active") {
        return "positive";
      } else {
        return "";
      }
    },
  },

  computed: {
    filteredItems() {
      // const filterText = this.filter.toLowerCase();
      // return this.historyItems.filter(item =>
      //   item.id.toString().toLowerCase().includes(filterText) ||
      //   item.room.toString().toLowerCase().includes(filterText) ||
      //   item.detect.toString().toLowerCase().includes(filterText) ||
      //   item.status_name.toLowerCase().includes(filterText)
      // );
      const filterText = this.filter.toLowerCase();
  const filterLength = filterText.length;

  return this.historyItems.filter(item => {
    if (filterLength === 1) {
      return (
          item.id.toString().includes(filterText) ||
          item.detect.toString().includes(filterText)
        );
    }
    else if (filterLength === 2) {
      return (
        item.id.toString().includes(filterText) ||
        item.room.toString().includes(filterText)
      );
    }
    else {
      return (
        item.id.toString().toLowerCase().includes(filterText) ||
        item.room.toString().toLowerCase().includes(filterText) ||
        item.detect.toString().toLowerCase().includes(filterText) ||
        item.status_name.toLowerCase().includes(filterText)
      );
    }
  });
    },
  },

  watch: {
    filter(newFilter) {
      // Nothing needs to be done here
      // The computed property `filteredItems` will automatically update
      // based on the new value of `filter`
      console.log("Filtered items:", this.filteredItems);
    },
  },
});
</script>
