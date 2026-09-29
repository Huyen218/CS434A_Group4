<template>
  <div class="report-page">

    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>📊 Báo cáo & Thống kê</h1>
        <p>Quản lý và theo dõi các báo cáo doanh thu, phòng trọ và hoạt động hệ thống</p>
      </div>

      <div class="header-right">
        <span class="today">
          Hôm nay: +24 tin mới
        </span>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="report-content">

      <!-- BỘ LỌC -->
      <div class="filter-box">

        <div class="filter-item">
          <label>Loại báo cáo</label>

          <select v-model="reportType">
            <option value="">Tất cả báo cáo</option>
            <option value="Báo cáo doanh thu tháng">Báo cáo doanh thu tháng</option>
            <option value="Báo cáo kiểm duyệt tin đăng">
              Báo cáo kiểm duyệt tin đăng
            </option>
            <option value="Báo cáo phòng trọ">Báo cáo phòng trọ</option>
            <option value="Báo cáo khách thuê">Báo cáo khách thuê</option>
            <option value="Báo cáo vi phạm">Báo cáo vi phạm</option>
          </select>
        </div>

        <div class="filter-item">
          <label>Từ ngày</label>

          <input
            type="date"
            v-model="fromDate"
          />
        </div>

        <div class="filter-item">
          <label>Đến ngày</label>

          <input
            type="date"
            v-model="toDate"
          />
        </div>

        <button class="search-btn" @click="searchReports">
          🔍 Tìm kiếm
        </button>

        <button class="reset-btn" @click="resetFilter">
          Đặt lại
        </button>

      </div>

      <!-- THỐNG KÊ NHANH -->
      <div class="summary-row">

        <div class="summary-card">
          <span>Tổng báo cáo</span>
          <strong>{{ filteredReports.length }}</strong>
          <small>báo cáo</small>
        </div>

        <div class="summary-card">
          <span>Tổng doanh thu</span>
          <strong>{{ formatMoney(totalRevenue) }}</strong>
          <small>VNĐ</small>
        </div>

        <div class="summary-card">
          <span>Tổng số phòng</span>
          <strong>{{ totalRooms }}</strong>
          <small>phòng</small>
        </div>

      </div>

      <!-- TABLE -->
      <div class="table-card">

        <div class="table-header">
          <div>
            <h2>Danh sách báo cáo</h2>
            <p>
              Hiển thị {{ filteredReports.length }} báo cáo
            </p>
          </div>
        </div>

        <div class="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>STT</th>
                <th>Mã báo cáo</th>
                <th>Loại báo cáo</th>
                <th>Thời gian</th>
                <th>Tổng doanh thu</th>
                <th>Số phòng</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="(report, index) in filteredReports"
                :key="report.id"
              >

                <td>{{ index + 1 }}</td>

                <td>
                  <strong class="report-code">
                    {{ report.id }}
                  </strong>
                </td>

                <td>
                  <span class="report-name">
                    {{ report.type }}
                  </span>
                </td>

                <td>
                  {{ report.date }}
                </td>

                <td>
                  <strong class="money">
                    {{ formatMoney(report.revenue) }}
                  </strong>
                </td>

                <td>
                  {{ report.rooms }} phòng
                </td>

                <td>
                  <div class="actions">

                    <button
                      class="view-btn"
                      @click="viewReport(report)"
                    >
                      Xem chi tiết
                    </button>

                    <button
                      class="pdf-btn"
                      @click="downloadReport(report)"
                    >
                      Tải PDF
                    </button>

                  </div>
                </td>

              </tr>

              <!-- KHÔNG CÓ DỮ LIỆU -->
              <tr v-if="filteredReports.length === 0">

                <td colspan="7" class="empty-row">
                  <div class="empty-icon">📂</div>

                  <strong>Không tìm thấy báo cáo</strong>

                  <span>
                    Vui lòng thay đổi điều kiện tìm kiếm.
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        <!-- PHÂN TRANG -->
        <div class="pagination">

          <button disabled>‹</button>

          <button class="active">1</button>

          <button>2</button>

          <button>3</button>

          <button>4</button>

          <button>›</button>

        </div>

      </div>

    </div>

    <!-- MODAL CHI TIẾT -->
    <div
      v-if="selectedReport"
      class="modal-overlay"
      @click.self="selectedReport = null"
    >

      <div class="modal">

        <div class="modal-header">

          <div>
            <h2>Chi tiết báo cáo</h2>
            <p>{{ selectedReport.id }}</p>
          </div>

          <button
            class="close-btn"
            @click="selectedReport = null"
          >
            ✕
          </button>

        </div>

        <div class="modal-body">

          <div class="detail-row">
            <span>Mã báo cáo</span>
            <strong>{{ selectedReport.id }}</strong>
          </div>

          <div class="detail-row">
            <span>Loại báo cáo</span>
            <strong>{{ selectedReport.type }}</strong>
          </div>

          <div class="detail-row">
            <span>Thời gian</span>
            <strong>{{ selectedReport.date }}</strong>
          </div>

          <div class="detail-row">
            <span>Tổng doanh thu</span>
            <strong class="money">
              {{ formatMoney(selectedReport.revenue) }}
            </strong>
          </div>

          <div class="detail-row">
            <span>Số phòng</span>
            <strong>{{ selectedReport.rooms }} phòng</strong>
          </div>

        </div>

        <div class="modal-footer">

          <button
            class="cancel-btn"
            @click="selectedReport = null"
          >
            Đóng
          </button>

          <button
            class="download-btn"
            @click="downloadReport(selectedReport)"
          >
            📄 Tải PDF
          </button>

        </div>

      </div>

    </div>

    <!-- TOAST -->
    <transition name="toast">

      <div
        v-if="message"
        class="toast"
      >
        {{ message }}
      </div>

    </transition>

  </div>
</template>


<script>
export default {

  name: "BaoCaoThongKe",

  data() {
    return {

      reportType: "",

      fromDate: "",

      toDate: "",

      message: "",

      selectedReport: null,

      reports: [
        {
          id: "BC001",
          type: "Báo cáo doanh thu tháng 10",
          date: "31/10/2025",
          revenue: 142500000,
          rooms: 120
        },

        {
          id: "BC002",
          type: "Báo cáo kiểm duyệt tin đăng",
          date: "15/10/2025",
          revenue: 67300000,
          rooms: 115
        },

        {
          id: "BC003",
          type: "Báo cáo phòng trọ tháng 9",
          date: "30/09/2025",
          revenue: 68750000,
          rooms: 108
        },

        {
          id: "BC004",
          type: "Báo cáo phòng trọ tháng 8",
          date: "31/08/2025",
          revenue: 120500000,
          rooms: 119
        },

        {
          id: "BC005",
          type: "Báo cáo khách thuê mới tháng 8",
          date: "20/08/2025",
          revenue: 3500000,
          rooms: 112
        },

        {
          id: "BC006",
          type: "Báo cáo vi phạm tháng 7",
          date: "20/07/2025",
          revenue: 95000000,
          rooms: 110
        }
      ],

      filteredReports: []

    };
  },

  computed: {

    totalRevenue() {

      return this.filteredReports.reduce(
        (total, report) => total + report.revenue,
        0
      );

    },

    totalRooms() {

      return this.filteredReports.reduce(
        (total, report) => total + report.rooms,
        0
      );

    }

  },

  mounted() {

    this.filteredReports = [...this.reports];

  },

  methods: {

    searchReports() {

      let result = [...this.reports];

      // Lọc theo loại báo cáo
      if (this.reportType) {

        result = result.filter(
          report => report.type === this.reportType
        );

      }

      // Lọc từ ngày
      if (this.fromDate) {

        const from = new Date(this.fromDate);

        result = result.filter(report => {

          const parts = report.date.split("/");

          const reportDate = new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
          );

          return reportDate >= from;

        });

      }

      // Lọc đến ngày
      if (this.toDate) {

        const to = new Date(this.toDate);

        result = result.filter(report => {

          const parts = report.date.split("/");

          const reportDate = new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
          );

          return reportDate <= to;

        });

      }

      this.filteredReports = result;

      this.showMessage(
        `Đã tìm thấy ${result.length} báo cáo`
      );

    },


    resetFilter() {

      this.reportType = "";
      this.fromDate = "";
      this.toDate = "";

      this.filteredReports = [...this.reports];

      this.showMessage("Đã đặt lại bộ lọc");

    },


    viewReport(report) {

      this.selectedReport = report;

    },


    downloadReport(report) {

      this.showMessage(
        `Đang chuẩn bị file PDF ${report.id}...`
      );

      setTimeout(() => {

        this.showMessage(
          `Đã tạo báo cáo ${report.id}`
        );

      }, 1200);

    },


    formatMoney(value) {

      return new Intl.NumberFormat("vi-VN").format(value);

    },


    showMessage(text) {

      this.message = text;

      setTimeout(() => {

        this.message = "";

      }, 2500);

    }

  }

};
</script>


<style scoped>

.report-page {
  min-height: calc(100vh - 80px);
  background: #f5f6f8;
  color: #202938;
}


/* HEADER */

.page-header {
  background: #fff;
  padding: 20px 28px;
  border-bottom: 1px solid #e5e7eb;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.page-header p {
  margin: 6px 0 0;
  color: #7b8493;
  font-size: 13px;
}

.today {
  background: #eef2ff;
  color: #4f46e5;
  padding: 9px 14px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
}


/* CONTENT */

.report-content {
  padding: 20px 25px 35px;
}


/* FILTER */

.filter-box {
  background: #fff;
  border: 1px solid #e1e5ea;
  border-radius: 7px;
  padding: 15px;

  display: flex;
  align-items: end;
  gap: 15px;

  box-shadow: 0 2px 7px rgba(0,0,0,.03);
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-item label {
  font-size: 12px;
  color: #657184;
  font-weight: 600;
}

.filter-item select,
.filter-item input {
  height: 36px;
  min-width: 170px;

  border: 1px solid #d9dee6;
  border-radius: 5px;

  padding: 0 10px;

  background: #fff;
  color: #394456;

  outline: none;
}

.filter-item select:focus,
.filter-item input:focus {
  border-color: #2563eb;
}


/* BUTTON */

.search-btn {
  height: 36px;
  border: none;
  border-radius: 5px;

  padding: 0 18px;

  background: #2563eb;
  color: #fff;

  cursor: pointer;
  font-weight: 600;
}

.search-btn:hover {
  background: #1d4ed8;
}

.reset-btn {
  height: 36px;

  border: 1px solid #d9dee6;
  border-radius: 5px;

  padding: 0 15px;

  background: #fff;
  color: #596579;

  cursor: pointer;
}

.reset-btn:hover {
  background: #f3f4f6;
}


/* SUMMARY */

.summary-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  margin-top: 15px;
}

.summary-card {
  background: #fff;

  border: 1px solid #e1e5ea;
  border-radius: 7px;

  padding: 15px 18px;
}

.summary-card span {
  display: block;

  color: #7a8597;
  font-size: 12px;
}

.summary-card strong {
  display: block;

  margin-top: 7px;

  font-size: 21px;
}

.summary-card small {
  display: block;

  margin-top: 4px;

  color: #9aa3b1;
  font-size: 11px;
}


/* TABLE */

.table-card {
  margin-top: 15px;

  background: #fff;

  border: 1px solid #e1e5ea;
  border-radius: 7px;

  overflow: hidden;
}

.table-header {
  padding: 16px 18px;

  border-bottom: 1px solid #e5e7eb;
}

.table-header h2 {
  margin: 0;

  font-size: 16px;
}

.table-header p {
  margin: 4px 0 0;

  color: #8a94a4;
  font-size: 11px;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #fafbfc;
}

th {
  padding: 13px 12px;

  text-align: left;

  font-size: 11px;
  color: #697586;

  font-weight: 600;

  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 13px 12px;

  font-size: 12px;

  border-bottom: 1px solid #edf0f3;
}

tbody tr:hover {
  background: #fafcff;
}

.report-code {
  color: #2563eb;
}

.report-name {
  color: #303a4a;
}

.money {
  color: #16855b;
}


/* ACTION */

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  border: none;
  background: none;

  cursor: pointer;

  font-size: 11px;
  font-weight: 600;
}

.view-btn {
  color: #2563eb;
}

.pdf-btn {
  color: #e11d48;
}

.view-btn:hover,
.pdf-btn:hover {
  text-decoration: underline;
}


/* EMPTY */

.empty-row {
  height: 180px;

  text-align: center;

  color: #8993a3;
}

.empty-row div {
  font-size: 30px;
}

.empty-row strong {
  display: block;

  margin-top: 8px;

  color: #596579;
}

.empty-row span {
  display: block;

  margin-top: 5px;

  font-size: 11px;
}


/* PAGINATION */

.pagination {
  display: flex;
  justify-content: center;

  gap: 5px;

  padding: 15px;
}

.pagination button {
  width: 30px;
  height: 30px;

  border: 1px solid #e0e4e9;
  background: #fff;

  border-radius: 5px;

  cursor: pointer;
}

.pagination button.active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.pagination button:disabled {
  color: #aaa;
  cursor: not-allowed;
}


/* MODAL */

.modal-overlay {
  position: fixed;

  inset: 0;

  background: rgba(0,0,0,.4);

  display: flex;

  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.modal {
  width: 500px;
  max-width: calc(100% - 30px);

  background: #fff;

  border-radius: 9px;

  box-shadow: 0 15px 50px rgba(0,0,0,.2);

  overflow: hidden;
}

.modal-header {
  padding: 17px 20px;

  border-bottom: 1px solid #e5e7eb;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 17px;
}

.modal-header p {
  margin: 4px 0 0;

  color: #2563eb;

  font-size: 12px;
}

.close-btn {
  border: none;
  background: none;

  font-size: 18px;

  cursor: pointer;

  color: #6b7280;
}

.modal-body {
  padding: 20px;
}

.detail-row {
  display: flex;

  justify-content: space-between;

  padding: 12px 0;

  border-bottom: 1px solid #edf0f3;
}

.detail-row span {
  color: #7b8493;
  font-size: 13px;
}

.detail-row strong {
  font-size: 13px;
}

.modal-footer {
  padding: 15px 20px;

  display: flex;
  justify-content: flex-end;

  gap: 10px;

  background: #fafafa;
}

.cancel-btn,
.download-btn {
  height: 35px;

  padding: 0 15px;

  border-radius: 5px;

  cursor: pointer;
}

.cancel-btn {
  border: 1px solid #ddd;

  background: #fff;
}

.download-btn {
  border: none;

  background: #2563eb;

  color: #fff;
}


/* TOAST */

.toast {
  position: fixed;

  right: 25px;
  bottom: 25px;

  background: #202938;
  color: #fff;

  padding: 12px 18px;

  border-radius: 6px;

  font-size: 12px;

  z-index: 10000;
}

.toast-enter-active,
.toast-leave-active {
  transition: .25s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}


/* RESPONSIVE */

@media (max-width: 900px) {

  .filter-box {
    flex-wrap: wrap;
  }

  .summary-row {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 600px) {

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .report-content {
    padding: 15px;
  }

  .filter-item {
    width: 100%;
  }

  .filter-item select,
  .filter-item input {
    width: 100%;
  }

}
</style>