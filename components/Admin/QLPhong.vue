<template>
  <div class="container-fluid p-4 bg-light min-vh-100">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h2 class="fw-bold">Quản Lý Phòng</h2>
        <p class="text-muted">
          Theo dõi tình trạng và cập nhật thông tin phòng thuê
        </p>
      </div>

      <button class="btn btn-primary px-4" @click="openAdd">
        + Thêm phòng mới
      </button>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card border-0 shadow p-3">
          <small>TỔNG SỐ PHÒNG</small>
          <h2>{{ rooms.length }}</h2>
          <span>Tổng quy mô phòng trọ</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow p-3">
          <small>PHÒNG TRỐNG</small>
          <h2>{{ roomTrong }}</h2>
          <span>Sẵn sàng đón khách mới</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow p-3">
          <small>ĐÃ THUÊ</small>
          <h2>{{ roomThue }}</h2>
          <span>Đang được vận hành thuê</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow p-3">
          <small>ĐANG BẢO TRÌ</small>
          <h2>{{ roomBaoTri }}</h2>
          <span>Cần kiểm tra khắc phục</span>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow mb-3">
      <div class="card-body d-flex justify-content-between">
        <div>
          <button
            class="btn me-2"
            :class="filter==''?'btn-primary':'btn-light'"
            @click="filter=''"
          >
            Tất cả
          </button>

          <button
            class="btn me-2"
            :class="filter=='Trống'?'btn-success':'btn-light'"
            @click="filter='Trống'"
          >
            Trống
          </button>

          <button
            class="btn me-2"
            :class="filter=='Đã thuê'?'btn-info':'btn-light'"
            @click="filter='Đã thuê'"
          >
            Đã thuê
          </button>

          <button
            class="btn"
            :class="filter=='Đang bảo trì'?'btn-warning':'btn-light'"
            @click="filter='Đang bảo trì'"
          >
            Đang bảo trì
          </button>
        </div>

        <input
          v-model="keyword"
          class="form-control"
          style="width:250px"
          placeholder="Tìm kiếm phòng..."
        />
      </div>
    </div>

    <div class="card border-0 shadow">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>MÃ PHÒNG</th>
              <th>TÊN PHÒNG</th>
              <th>TẦNG</th>
              <th>LOẠI PHÒNG</th>
              <th>GIÁ THUÊ</th>
              <th>TÌNH TRẠNG</th>
              <th class="text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="r in filteredRooms" :key="r.id">
              <td class="fw-bold text-primary">{{ r.ma }}</td>
              <td>{{ r.ten }}</td>
              <td>{{ r.tang }}</td>
              <td>{{ r.loai }}</td>
              <td>{{ formatMoney(r.gia) }}</td>

              <td>
                <span class="badge rounded-pill" :class="statusClass(r.tinhTrang)">
                  {{ r.tinhTrang }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm btn-outline-primary me-1"
                  @click="editRoom(r)"
                >
                  ✏
                </button>

                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteRoom(r.id)"
                >
                  🗑
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-3 text-muted">
        Hiển thị {{ filteredRooms.length }} trong tổng số {{ rooms.length }} phòng
      </div>
    </div>

    <div
      class="modal d-block"
      v-if="showModal"
      style="background:rgba(0,0,0,.35)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ isEdit ? "Cập nhật phòng" : "Thêm phòng mới" }}</h5>
            <button class="btn-close" @click="close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-2">
              <label>Mã phòng</label>
              <input v-model="form.ma" class="form-control" />
            </div>

            <div class="mb-2">
              <label>Tên phòng</label>
              <input v-model="form.ten" class="form-control" />
            </div>

            <div class="mb-2">
              <label>Tầng</label>
              <input v-model="form.tang" class="form-control" />
            </div>

            <div class="mb-2">
              <label>Loại phòng</label>
              <select v-model="form.loai" class="form-select">
                <option>Phòng Đơn</option>
                <option>Phòng Đôi</option>
                <option>Studio</option>
              </select>
            </div>

            <div class="mb-2">
              <label>Giá thuê</label>
              <input v-model.number="form.gia" type="number" class="form-control" />
            </div>

            <div class="mb-2">
              <label>Tình trạng</label>
              <select v-model="form.tinhTrang" class="form-select">
                <option>Trống</option>
                <option>Đã thuê</option>
                <option>Đang bảo trì</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="saveRoom">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      keyword: "",
      filter: "",
      showModal: false,
      isEdit: false,
      form: {},
    };
  },

  mounted() {
    this.loadRooms();
  },

  computed: {
    filteredRooms() {
      return this.rooms.filter((r) => {
        const match =
          r.ma.toLowerCase().includes(this.keyword.toLowerCase()) ||
          r.ten.toLowerCase().includes(this.keyword.toLowerCase());

        if (this.filter) return r.tinhTrang == this.filter && match;
        return match;
      });
    },

    roomTrong() {
      return this.rooms.filter((i) => i.tinhTrang == "Trống").length;
    },

    roomThue() {
      return this.rooms.filter((i) => i.tinhTrang == "Đã thuê").length;
    },

    roomBaoTri() {
      return this.rooms.filter((i) => i.tinhTrang == "Đang bảo trì").length;
    },
  },

  methods: {
    loadRooms() {
      const data = JSON.parse(localStorage.getItem("room_status"));

      if (data) {
        this.rooms = data;
      } else {
        this.rooms = [
          {
            id: 1,
            ma: "P101",
            ten: "Phòng Standard P101",
            tang: "Tầng 1",
            loai: "Phòng Đơn",
            gia: 2200000,
            tinhTrang: "Trống",
          },
          {
            id: 2,
            ma: "P102",
            ten: "Phòng Double P102",
            tang: "Tầng 1",
            loai: "Phòng Đôi",
            gia: 3500000,
            tinhTrang: "Đã thuê",
          },
          {
            id: 3,
            ma: "P201",
            ten: "Phòng Standard P201",
            tang: "Tầng 2",
            loai: "Phòng Đơn",
            gia: 2300000,
            tinhTrang: "Trống",
          },
          {
            id: 4,
            ma: "P202",
            ten: "Phòng Double P202",
            tang: "Tầng 2",
            loai: "Phòng Đôi",
            gia: 3600000,
            tinhTrang: "Đang bảo trì",
          },
        ];

        localStorage.setItem("room_status", JSON.stringify(this.rooms));
      }
    },

    openAdd() {
      this.isEdit = false;
      this.form = {
        id: Date.now(),
        ma: "",
        ten: "",
        tang: "",
        loai: "Phòng Đơn",
        gia: 0,
        tinhTrang: "Trống",
      };
      this.showModal = true;
    },

    editRoom(room) {
      this.isEdit = true;
      this.form = { ...room };
      this.showModal = true;
    },

    saveRoom() {
      if (this.isEdit) {
        const index = this.rooms.findIndex((i) => i.id == this.form.id);
        this.rooms[index] = { ...this.form };
      } else {
        this.rooms.push({ ...this.form });
      }

      localStorage.setItem("room_status", JSON.stringify(this.rooms));
      this.close();
      this.loadRooms();
    },

    deleteRoom(id) {
      if (!confirm("Xóa phòng này?")) return;

      this.rooms = this.rooms.filter((i) => i.id != id);
      localStorage.setItem("room_status", JSON.stringify(this.rooms));
    },

    close() {
      this.showModal = false;
    },

    formatMoney(value) {
      return Number(value).toLocaleString("vi-VN") + " VNĐ";
    },

    statusClass(status) {
      if (status == "Trống") return "bg-success";
      if (status == "Đã thuê") return "bg-info text-dark";
      return "bg-warning text-dark";
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 16px;
}

.table th,
.table td {
  vertical-align: middle;
}

.badge {
  padding: 8px 14px;
  font-size: 13px;
}
</style>