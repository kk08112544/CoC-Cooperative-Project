<template>
  <q-page padding>
    <h4 class="text-center">Alcohol Room</h4>
    <div align="right" class="q-mr-sm">
      <q-btn style="background:#F24C65;" icon="add" label="Add" class="text-white" no-caps @click="form_add = true" />

  </div>
  <q-dialog v-model="form_add">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="add" color="primary" text-color="white" />
        <div class="text-h6">Add Room</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <span class="q-ml-sm"
                >Room:</span
        >
        <q-input outlined v-model="room" label="Room number" />
      </q-card-section>
      <q-card-actions align="right">
              <q-btn flat label="NO" color="primary" v-close-popup />
              <q-btn
                flat
                label="YES"
                color="primary"
                @click="addToAlcohol"
              />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
  placeholder="Search by id"
  :style="{ width: '300px', maxWidth: '500px' }"
  @input="filterData"
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
            <q-td key="edit" :props="props">
              <input
  v-model="props.row.edit"
  type="number"
  placeholder="1=Active, 2=Non-active"

  @keydown.enter="updateStatus(props.row.id, props.row.edit)"
/>
      </q-td>
            <q-td key="action" :props="props">
              <q-btn
                color="primary"
                flat
                round
                icon="edit"
                @click="editRecord(props.row)"
              />
              <q-btn
                color="primary"
                flat
                round
                icon="delete"
                @click="deleteRecord(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
        
      </q-table>
    </div>
  </div>
  <q-dialog v-model="form_edit" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="edit" color="primary" text-color="white" />
                <span class="q-ml-sm">Update Room ID: {{ input.id }}</span>
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
              <q-card-section>
                <span class="q-ml-sm"
                  >Room Number: {{ input.room }}</span
                >
              </q-card-section>
             <q-card-section>
              <q-input
  v-model="input.inputRoom"
  outlined
  label="Room number"
/>

             </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="NO" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="YES"
                  color="primary"
                  @click="onEdit(input)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="form_delete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="primary" text-color="white" />
            <span class="q-ml-sm">Delete Room ID: {{ input.id }}</span>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="NO" color="primary" v-close-popup />
            <q-btn flat label="YES" color="primary" @click="onDelete" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useQuasar } from 'quasar'
import { Notify } from 'quasar';

export default defineComponent({
  name: "RoomAlcoholPage",

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
        { name: "edit", label: "Edit Status", field: "edit", align: "center" },
        { name: "action", label: "Action", field: "action", align: "center" },
      ],
      form_delete: false,
      form_edit: false,
      form_add: false,
      room: '',
      input: {
        id: '',
        room: '',
        inputRoom: '',
        inputValue: ''
      },
      getStatusColor: (status) => {
        const lowerCaseStatus = status.toLowerCase();

        if (lowerCaseStatus === "non-active") {
          return "negative";
        } else if (lowerCaseStatus === "active") {
          return "positive";
        } else {
          return "";
        }
      },
    };
  },

  computed: {
    filteredItems() {
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

  setup() {
    return {};
  },

  methods: {
    filterData() {
    if (!this.filter) {
      this.loading = true; // ให้ loading = true เมื่อทำการกรองข้อมูล
      this.fetchData(); // โหลดข้อมูลเดิมทั้งหมดเมื่อไม่มีคำค้นหา
      this.loading = false; // หยุด loading เมื่อโหลดข้อมูลเสร็จสมบูรณ์
    } else {
      // กรองข้อมูลเฉพาะที่ตรงกับคำค้นหา
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
    }
  },

  async fetchData() {
    const token = localStorage.getItem("accessToken");
    try {
      this.loading = true;
      const response = await axios.get(`http://localhost:4000/api/alcohol/`, {
        headers: {
          "x-access-token": token,
        },
      });
      this.historyItems = response.data;
      
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      this.loading = false;
    }
  },

    async addToAlcohol() {
      const token = localStorage.getItem("accessToken");
      try {
        if (!this.room) {
          this.$q.notify({
            color: "negative",
            textColor: "white",
            type: "negative",
            message: "Content is not empty",
            timeout: 1000
          });
        } else {
          const digitRegex = /^[0-9.-]+$/;
          if (!digitRegex.test(this.room)) {
            this.$q.notify({
              color: "negative",
              textColor: "white",
              type: "negative",
              message: "Room Value only Number",
              timeout: 1000
            });
          } else {
            const response = await axios.post(
              `http://localhost:4000/api/alcohol/addToAlcohol`,
              { room: this.room },
              {
                headers: {
                  "x-access-token": token,
                },
              }
            );
            this.form_add = false;
            this.$q.notify({
              color: "green",
              textColor: "white",
              type: "positive",
              message: "Add Room ID: " + response.data.id + " Successfully",
              timeout: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      } catch (error) {
        console.error("Error adding room:", error);
      }
    },

  
    handleUpdate(id, newStatus) {
  // แปลง newStatus เป็นตัวเลข
  const statusNumber = parseInt(newStatus);

  // เรียกใช้งานฟังก์ชัน updateStatus โดยส่งค่าตัวเลขให้
  this.updateStatus(id, statusNumber);
},

async updateStatus(id, newStatus) {
  const token = localStorage.getItem("accessToken");
  try {
    if (newStatus !== 1 && newStatus !== 2) {
      this.$q.notify({
        color: "negative",
        textColor: "white",
        type: "negative",
        message: "Status must be either 1 or 2",
        timeout: 1000
      });
    } else {
      const response = await axios.put(
        `http://localhost:4000/api/alcohol/updateStatusToAlcohol/${id}`,
        { status_id: newStatus },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      this.$q.notify({
        color: "green",
        textColor: "white",
        type: "positive",
        message: "Update  Status of Room ID : "  +  response.data.id  + " Successfully",
        timeout: 1000
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
},


    editRecord(row) {
      this.input.id = row.id;
      this.input.room = row.room;
      this.input.inputRoom = row.room;
      this.form_edit = true;
    },

    async onEdit(input) {
      const token = localStorage.getItem("accessToken");
      try {
        if (!input.inputRoom) {
          this.$q.notify({
            color: "negative",
            textColor: "white",
            type: "negative",
            message: "Content is not empty",
            timeout: 1000
          });
        } else {
          const digitRegex = /^[0-9.-]+$/;
          if (!digitRegex.test(input.inputRoom)) {
            this.$q.notify({
              color: "negative",
              textColor: "white",
              type: "negative",
              message: "Room Value only Number",
              timeout: 1000
            });
          } else {
            const response = await this.$axios.put(
              `http://localhost:4000/api/alcohol/updateToAlcohol/${input.id}`,
              { room: input.inputRoom },
              {
                headers: {
                  "x-access-token": token,
                },
              }
            );

            this.form_edit = false;
            this.$q.notify({
              color: "green",
              textColor: "white",
              type: "positive",
              message: "Update Room  ID : " + response.data.id + " Successfully",
              timeout: 1000
            });

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      } catch (error) {
        console.error("Error updating room:", error);
      }
    },

    deleteRecord(row) {
      this.input.id = row.id;
      this.form_delete = true;
    },

    async onDelete() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/alcohol/deleteToAlcohol/${this.input.id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        this.form_delete = false;
        this.$q.notify({
          color: "green",
          textColor: "white",
          type: "positive",
          message: "Delete Room  ID : " + response.data.id + " Successfully",
          timeout: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    },
    computed: {
    filteredItems() {
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
      // return filtered;
    },
  },
  },

  mounted() {
    this.fetchData();
  },
});
</script>