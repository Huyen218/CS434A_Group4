<template>
  <div class="container-fluid p-4 bg-light min-vh-100">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h2 class="fw-bold text-dark">Xử Lý Báo Cáo Vi Phạm</h2>
        <p class="text-muted">
          Tiếp nhận, xử lý và theo dõi các báo cáo vi phạm nội quy.
        </p>
      </div>

      <button class="btn btn-primary px-4" @click="openAdd">
        + Tạo báo cáo mới
      </button>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>TỔNG BÁO CÁO</small>
          <h2>{{ reports.length }}</h2>
          <span>Tổng số phản hồi tiếp nhận</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>CHƯA XỬ LÝ</small>
          <h2>{{ countPending }}</h2>
          <span>Cần nhanh chóng khắc phục</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>ĐÃ XỬ LÝ</small>
          <h2>{{ countDone }}</h2>
          <span>Đã giải quyết ổn thỏa</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>ĐANG XEM XÉT</small>
          <h2>{{ countReview }}</h2>
          <span>Đang thẩm định thực tế</span>
        </div>
      </div>
    </div>

    <div class="card shadow border-0 mb-3">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <button
            class="btn me-2"
            :class="filter=='' ? 'btn-primary':'btn-light'"
            @click="filter=''"
          >
            Tất cả
          </button>

          <button
            class="btn me-2"
            :class="filter=='Chưa xử lý' ? 'btn-danger':'btn-light'"
            @click="filter='Chưa xử lý'"
          >
            Chưa xử lý
          </button>

          <button
            class="btn me-2"
            :class="filter=='Đã xử lý' ? 'btn-success':'btn-light'"
            @click="filter='Đã xử lý'"
          >
            Đã xử lý
          </button>

          <button
            class="btn"
            :class="filter=='Đang xem xét' ? 'btn-warning':'btn-light'"
            @click="filter='Đang xem xét'"
          >
            Đang xem xét
          </button>
        </div>

        <input
          v-model="keyword"
          class="form-control"
          style="width:260px"
          placeholder="Tìm kiếm báo cáo..."
        />
      </div>
    </div>

    <div class="card shadow border-0">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>MÃ BC</th>
              <th>NGƯỜI VI PHẠM</th>
              <th>NỘI DUNG VI PHẠM</th>
              <th>PHÒNG</th>
              <th>NGÀY GỬI</th>
              <th>TRẠNG THÁI</th>
              <th class="text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="r in filteredReports" :key="r.id">
              <td class="fw-bold text-primary">{{ r.code }}</td>
              <td>{{ r.name }}</td>
              <td>{{ r.content }}</td>
              <td>{{ r.room }}</td>
              <td>{{ r.date }}</td>

              <td>
                <span class="badge rounded-pill" :class="statusClass(r.status)">
                  {{ r.status }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm btn-outline-primary me-1"
                  @click="editReport(r)"
                >
                  ✏
                </button>

                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="removeReport(r.id)"
                >
                  🗑
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-3 text-muted">
        Hiển thị 1–{{ filteredReports.length }} trong tổng số
        {{ reports.length }} báo cáo
      </div>
    </div>

    <div
      class="modal d-block"
      v-if="showModal"
      style="background:rgba(0,0,0,.4)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ isEdit ? "Cập nhật báo cáo" : "Tạo báo cáo mới" }}</h5>
            <button class="btn-close" @click="close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label>Người vi phạm</label>
              <input v-model="form.name" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Phòng</label>
              <input v-model="form.room" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Nội dung vi phạm</label>
              <textarea
                v-model="form.content"
                class="form-control"
                rows="3"
              ></textarea>
            </div>

            <div class="mb-3">
              <label>Trạng thái</label>
              <select v-model="form.status" class="form-select">
                <option>Chưa xử lý</option>
                <option>Đang xem xét</option>
                <option>Đã xử lý</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="saveReport">Lưu</button>
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
      keyword: "",
      filter: "",
      showModal: false,
      isEdit: false,
      reports: [],
      form: {}
    };
  },

  mounted() {
    this.load();
  },

  computed: {
    filteredReports() {
      return this.reports.filter(r => {
        const match =
          r.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
          r.code.toLowerCase().includes(this.keyword.toLowerCase());

        if (this.filter) return r.status == this.filter && match;
        return match;
      });
    },

    countPending() {
      return this.reports.filter(i => i.status == "Chưa xử lý").length;
    },

    countDone() {
      return this.reports.filter(i => i.status == "Đã xử lý").length;
    },

    countReview() {
      return this.reports.filter(i => i.status == "Đang xem xét").length;
    }
  },

  methods: {
    load() {
      const data = JSON.parse(localStorage.getItem("violation_reports"));

      if (data) {
        this.reports = data;
      } else {
        this.reports = [
          {
            id: 1,
            code: "BC-101",
            name: "Võ Tạ Tiến Đạt",
            content: "Cố tình gây tiếng ồn lớn, mở nhạc karaoke sau 22h.",
            room: "P102",
            date: "20/10/2023",
            status: "Chưa xử lý"
          },
          {
            id: 2,
            code: "BC-102",
            name: "Võ Tạ Tiến Đạt",
            content: "Nuôi thú cưng trái quy định của dãy trọ.",
            room: "P102",
            date: "19/10/2023",
            status: "Chưa xử lý"
          },
          {
            id: 3,
            code: "BC-103",
            name: "Võ Tạ Tiến Đạt",
            content: "Chậm thanh toán tiền phòng và điện nước hơn 15 ngày.",
            room: "P102",
            date: "18/10/2023",
            status: "Đang xem xét"
          },
          {
            id: 4,
            code: "BC-104",
            name: "Võ Tạ Tiến Đạt",
            content: "Tự ý sửa phòng khi chưa có sự đồng ý của chủ nhà.",
            room: "P102",
            date: "17/10/2023",
            status: "Đã xử lý"
          }
        ];

        localStorage.setItem(
          "violation_reports",
          JSON.stringify(this.reports)
        );
      }
    },

    openAdd() {
      this.isEdit = false;

      this.form = {
        id: Date.now(),
        code: "BC-" + (100 + this.reports.length + 1),
        name: "",
        room: "",
        content: "",
        date: new Date().toLocaleDateString("vi-VN"),
        status: "Chưa xử lý"
      };

      this.showModal = true;
    },

    editReport(r) {
      this.isEdit = true;
      this.form = { ...r };
      this.showModal = true;
    },

    saveReport() {
      if (this.isEdit) {
        const index = this.reports.findIndex(i => i.id == this.form.id);
        this.reports[index] = { ...this.form };
      } else {
        this.reports.push({ ...this.form });
      }

      localStorage.setItem(
        "violation_reports",
        JSON.stringify(this.reports)
      );

      this.close();
      this.load();
    },

    removeReport(id) {
      if (!confirm("Xóa báo cáo này?")) return;

      this.reports = this.reports.filter(i => i.id != id);

      localStorage.setItem(
        "violation_reports",
        JSON.stringify(this.reports)
      );
    },

    close() {
      this.showModal = false;
    },

    statusClass(s) {
      if (s == "Chưa xử lý") return "bg-danger";
      if (s == "Đang xem xét") return "bg-warning text-dark";
      return "bg-success";
    }
  }
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