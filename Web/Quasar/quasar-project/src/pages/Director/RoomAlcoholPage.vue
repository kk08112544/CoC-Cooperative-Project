<template>
  <q-page padding>
      <h4 class="text-center">Alcohol Room</h4>
      <div align="right" class="q-mr-sm">
    <q-btn style="background:#F24C65;" icon="add" label="Add" class="text-white" no-caps @click="addMenu" />
  </div>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
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
      <div class="q-pa-md">
          <q-table
              title="Alcohol Room"
              :rows="filteredRows"
              :columns="columns"
              row-key="name"
          >
          <template v-slot:top-right>
              <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search by Alcohol Room"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          </template>
          <template v-slot:body-cell-status_name="props">
          <q-td :props="props">
            <q-badge
              :color="getStatusColor(props.row.status_name)"
              text-color="white"
            >
              {{ props.row.status_name }}
            </q-badge>
          </q-td>
          
        </template>
        <template v-slot:body-cell-edit="props">
          <q-td :props="props">
              <q-input
v-model="props.row.edit"
type="text"
label="1=Active, 2=Non-active"
dense
@keydown.enter="updateStatus(props.row.id, props.row.edit)"
:pattern="'[1-2]'"
maxlength="1"
/>

          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <!-- <q-btn style="background:#F24C65;" icon="edit"  class="text-blue" no-caps @click="addMenu" /> -->
            <q-icon name="edit" size="24px" color="blue" @click="editMenu(props.row)"/>
            &nbsp;
            <q-icon name="delete" size="24px" color="blue"  @click="deleteMenu"/>

          </q-td>

        </template>
          </q-table>
      </div>
       <q-dialog v-model="edit">
         
          <q-card>
              <!-- ส่วนหัวของ dialog -->
              <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Edit Room</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
              <!-- ส่วนเนื้อหาของ dialog -->
              <q-card-section>
                  <span class="q-ml-sm">Room:</span>
                  <q-input outlined v-model="room" label="Room number" />
              </q-card-section>
              <!-- ส่วนแอ็คชันของ dialog -->
              <q-card-actions align="right">
                  <q-btn flat label="NO" color="primary" v-close-popup />
                  <q-btn flat label="YES" color="primary" @click="updateRoom" />
              </q-card-actions>
          </q-card>
      </q-dialog> 
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
// import { $q } from 'quasar'; 
import { useQuasar } from 'quasar'
import { Notify } from 'quasar';

const columns = [
{ name: "id", label: "ID", align: "left", field: "id",sortable:true },
{ name: "room", label: "Room", field: "room" },
{ name: "detect", label: "Have/Not Have", field: "detect"},
{ name: "status_name", label: "Status", field: "status_name" },
{ name: "edit", label:"Edit Status",field:"edit",align:"center"},
{ name: "action", label: "Action",  field: "action", align: "center" },
];
export default defineComponent({
  name:"RoomAlcoholPage",
  setup(){
    const $q = useQuasar()
    const filter = ref(null);
    const rows = ref([]);
    const dialogVisible = ref(false);
    const edit = ref(false);
    const room = ref("");
    const addMenu = () => {
      dialogVisible.value = true; // เมื่อคลิกที่ปุ่ม "Add" ให้ตั้งค่า dialogVisible เป็น true เพื่อเปิด Dialog
    };
    const editMenu = (rows) =>{
      edit.value = true;
    };
    const getStatusColor = (status) => {
      const lowerCaseStatus = status.toLowerCase();

      if (lowerCaseStatus === "non-active") {
        return "red";
      }else if (lowerCaseStatus === "active") {
        return "green";
      } else {
        return ""; // คืนค่าว่างหากไม่ตรงเงื่อนไขใดๆ
      }
    };
    const addToAlcohol = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/alcohol/addToAlcohol",
        { room: room.value },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Add Room Successfully",
        onComplete: function() {
          dialogVisible.value = false;
          fetchData(); // เมื่อเพิ่มห้องเรียบร้อยแล้ว ให้ดึงข้อมูลใหม่
        }
      });
      window.location.reload();
      return;
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try{
        const response = await axios.get(
          "http://localhost:3000/api/alcohol/",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        rows.value = response.data;

      }catch(error){
        console.error("Error fetching data:", error);
      }
    };
    const updateStatus = async (id, newStatus) => {
const token = localStorage.getItem("accessToken");
try {
  // ตรวจสอบว่า newStatus เป็น 1 หรือ 2 หรือไม่
  if (newStatus !== "1" && newStatus !== "2") {
      $q.notify({
        color: "red-4",
        textColor: "white",
        icon: "warning",
        message: "No this Status"
      })
      return;
  }else{
      const response = await axios.put(
    `http://localhost:3000/api/alcohol/updateStatusToAlcohol/${id}`,
    { status_id: newStatus },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  $q.notify({
color: "green-4",
textColor: "white",
icon: "cloud_done",
message: "Update New Status Successfully",
//timeout: 100,
onComplete: function() {
  window.location.reload(); // โหลดหน้าเว็บใหม่ เมื่อ Notification แสดงเสร็จสิ้น
}
});
return;
// window.location.reload();



}
} catch (error) {
  console.error("Error updating status:", error);
}
};

    const filteredRows = computed(() => {
      if (!filter.value) {
        return rows.value;
      }
      const searchQuery = filter.value.toLowerCase();
      return rows.value.filter((row) =>
        row.room.toLowerCase().includes(searchQuery)
      );
    });
    onMounted(() => {
      fetchData();
    });

    return {
      filter,
    columns,
    rows,
    getStatusColor,
    updateStatus,
    filteredRows,
    addMenu,
    dialogVisible,
    room,
    editMenu,
    addToAlcohol
    };
  },
});
</script>