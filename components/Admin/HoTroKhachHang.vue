<template>
  <div class="support-page">
    <div class="page-header">
      <div>
        <h1>Hỗ trợ & Chăm sóc khách hàng</h1>
        <p>Quản lý các yêu cầu hỗ trợ từ khách hàng</p>
      </div>

      <div class="today">
        Hôm nay: +24 yêu cầu mới
      </div>
    </div>

    <div class="filter-box">
      <div class="filter-item">
        <label>Loại yêu cầu</label>
        <select v-model="filterType">
          <option value="">Chọn loại</option>
          <option value="Báo cáo mất nước">Báo cáo mất nước</option>
          <option value="Sửa chữa">Sửa chữa</option>
          <option value="Hỏi đáp">Hỏi đáp</option>
          <option value="Khiếu nại">Khiếu nại</option>
        </select>
      </div>

      <div class="filter-item">
        <label>Trạng thái</label>
        <select v-model="filterStatus">
          <option value="">Chọn trạng thái</option>
          <option value="Đã xử lý">Đã xử lý</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
        </select>
      </div>

      <div class="filter-item">
        <label>Từ ngày</label>
        <input type="date" v-model="fromDate" />
      </div>

      <div class="filter-item">
        <label>Đến ngày</label>
        <input type="date" v-model="toDate" />
      </div>

      <button class="search-btn" @click="searchTickets">
        Tìm kiếm
      </button>

      <button class="reset-btn" @click="resetFilter">
        Đặt lại
      </button>
    </div>

    <div class="table-card">
      <div class="table-header">
        <h2>Danh sách yêu cầu hỗ trợ</h2>
        <span>{{ filteredTickets.length }} yêu cầu</span>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã yêu cầu</th>
              <th>Khách hàng</th>
              <th>Loại yêu cầu</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(ticket, index) in filteredTickets"
              :key="ticket.id"
            >
              <td>{{ index + 1 }}</td>

              <td>
                <strong class="ticket-code">
                  {{ ticket.id }}
                </strong>
              </td>

              <td>{{ ticket.customer }}</td>

              <td>{{ ticket.type }}</td>

              <td>{{ ticket.date }}</td>

              <td>
                <span
                  class="status"
                  :class="ticket.statusClass"
                >
                  {{ ticket.status }}
                </span>
              </td>

              <td>
                <button
                  class="detail-btn"
                  @click="viewTicket(ticket)"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>

            <tr v-if="filteredTickets.length === 0">
              <td colspan="7" class="empty-row">
                Không tìm thấy yêu cầu hỗ trợ
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button disabled>‹</button>
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>›</button>
      </div>
    </div>

    <div
      v-if="selectedTicket"
      class="modal-overlay"
      @click.self="selectedTicket = null"
    >
      <div class="modal">
        <div class="modal-header">
          <div>
            <h2>Chi tiết yêu cầu hỗ trợ</h2>
            <span>{{ selectedTicket.id }}</span>
          </div>

          <button
            class="close-btn"
            @click="selectedTicket = null"
          >
            ✕
          </button>
        </div>

        <div class="modal-body">
          <div class="detail-item">
            <label>Mã yêu cầu</label>
            <strong>{{ selectedTicket.id }}</strong>
          </div>

          <div class="detail-item">
            <label>Khách hàng</label>
            <strong>{{ selectedTicket.customer }}</strong>
          </div>

          <div class="detail-item">
            <label>Loại yêu cầu</label>
            <strong>{{ selectedTicket.type }}</strong>
          </div>

          <div class="detail-item">
            <label>Ngày gửi</label>
            <strong>{{ selectedTicket.date }}</strong>
          </div>

          <div class="detail-item">
            <label>Trạng thái</label>

            <span
              class="status"
              :class="selectedTicket.statusClass"
            >
              {{ selectedTicket.status }}
            </span>
          </div>

          <div class="content-box">
            <label>Nội dung yêu cầu</label>
            <p>{{ selectedTicket.content }}</p>
          </div>

          <div
            v-if="selectedTicket.reply"
            class="reply-box"
          >
            <label>Phản hồi</label>
            <p>{{ selectedTicket.reply }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <button
            class="close-modal"
            @click="selectedTicket = null"
          >
            Đóng
          </button>

          <button
            v-if="selectedTicket.status !== 'Đã xử lý'"
            class="process-btn"
            @click="processTicket(selectedTicket)"
          >
            Xử lý yêu cầu
          </button>
        </div>
      </div>
    </div>

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
  name: "HoTroKhachHang",

  data() {
    return {
      filterType: "",
      filterStatus: "",
      fromDate: "",
      toDate: "",
      message: "",
      selectedTicket: null,

      tickets: [
        {
          id: "YTC-0001",
          customer: "Nguyễn Thu Thảo",
          type: "Báo cáo mất nước",
          date: "01/09/2026",
          status: "Đã xử lý",
          statusClass: "completed",
          content:
            "Phòng 204 bị mất nước sinh hoạt từ sáng nay. Vui lòng kiểm tra giúp.",
          reply:
            "Nhân viên kỹ thuật đã kiểm tra và khắc phục tình trạng mất nước."
        },
        {
          id: "YTC-0002",
          customer: "Phạm Minh Hải",
          type: "Sửa chữa",
          date: "03/09/2026",
          status: "Đang xử lý",
          statusClass: "processing",
          content:
            "Khóa cửa phòng bị hỏng, không thể khóa cửa bằng chìa khóa.",
          reply:
            "Nhân viên kỹ thuật đang được điều phối để kiểm tra."
        },
        {
          id: "YTC-0003",
          customer: "Lê Văn Lâm",
          type: "Hỏi đáp",
          date: "05/09/2026",
          status: "Chờ xử lý",
          statusClass: "waiting",
          content:
            "Khách hàng muốn hỏi về quy định giờ giấc và nội quy của khu trọ.",
          reply: ""
        },
        {
          id: "YTC-0004",
          customer: "Tần Thị Mai",
          type: "Sửa chữa",
          date: "07/09/2026",
          status: "Đang xử lý",
          statusClass: "processing",
          content:
            "Khu vực tầng trệt có vấn đề cần nhân viên kiểm tra.",
          reply:
            "Yêu cầu đã được tiếp nhận và đang được xử lý."
        },
        {
          id: "YTC-0005",
          customer: "Hoàng Văn Bình",
          type: "Khiếu nại",
          date: "09/09/2026",
          status: "Đã xử lý",
          statusClass: "completed",
          content:
            "Khách hàng cần được hỗ trợ kiểm tra tiền điện tháng này.",
          reply:
            "Thông tin tiền điện đã được kiểm tra và cập nhật."
        },
        {
          id: "YTC-0006",
          customer: "Ngô Thị Lan",
          type: "Hỏi đáp",
          date: "12/09/2026",
          status: "Chờ xử lý",
          statusClass: "waiting",
          content:
            "Khách hàng cần hỗ trợ về thông tin hợp đồng thuê phòng.",
          reply: ""
        }
      ],

      filteredTickets: []
    };
  },

  mounted() {
    this.filteredTickets = [...this.tickets];
  },

  methods: {
    searchTickets() {
      let result = [...this.tickets];

      if (this.filterType) {
        result = result.filter(
          ticket => ticket.type === this.filterType
        );
      }

      if (this.filterStatus) {
        result = result.filter(
          ticket => ticket.status === this.filterStatus
        );
      }

      if (this.fromDate) {
        const from = new Date(this.fromDate);

        result = result.filter(ticket => {
          const parts = ticket.date.split("/");

          const ticketDate = new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
          );

          return ticketDate >= from;
        });
      }

      if (this.toDate) {
        const to = new Date(this.toDate);

        result = result.filter(ticket => {
          const parts = ticket.date.split("/");

          const ticketDate = new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
          );

          return ticketDate <= to;
        });
      }

      this.filteredTickets = result;

      this.showMessage(
        `Đã tìm thấy ${result.length} yêu cầu`
      );
    },

    resetFilter() {
      this.filterType = "";
      this.filterStatus = "";
      this.fromDate = "";
      this.toDate = "";
      this.filteredTickets = [...this.tickets];

      this.showMessage("Đã đặt lại bộ lọc");
    },

    viewTicket(ticket) {
      this.selectedTicket = ticket;
    },

    processTicket(ticket) {
      ticket.status = "Đã xử lý";
      ticket.statusClass = "completed";

      this.showMessage(
        `${ticket.id} đã được xử lý`
      );
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
.support-page {
  min-height: calc(100vh - 80px);
  background: #f5f6f8;
  color: #202938;
}

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

.filter-box {
  margin: 18px 24px 0;
  background: #fff;
  border: 1px solid #e1e5ea;
  border-radius: 7px;
  padding: 15px;
  display: flex;
  align-items: end;
  gap: 14px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-item label {
  font-size: 11px;
  color: #657184;
  font-weight: 600;
}

.filter-item select,
.filter-item input {
  height: 35px;
  min-width: 145px;
  border: 1px solid #d9dee6;
  border-radius: 5px;
  padding: 0 9px;
  background: #fff;
  color: #4b5565;
  outline: none;
  font-size: 11px;
}

.filter-item select:focus,
.filter-item input:focus {
  border-color: #2563eb;
}

.search-btn {
  height: 35px;
  padding: 0 18px;
  border: none;
  border-radius: 5px;
  background: #2563eb;
  color: white;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.search-btn:hover {
  background: #1d4ed8;
}

.reset-btn {
  height: 35px;
  padding: 0 15px;
  border: 1px solid #d9dee6;
  border-radius: 5px;
  background: white;
  color: #657184;
  font-size: 11px;
  cursor: pointer;
}

.table-card {
  margin: 18px 24px 30px;
  background: white;
  border: 1px solid #e1e5ea;
  border-radius: 7px;
  overflow: hidden;
}

.table-header {
  padding: 15px 17px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-header h2 {
  margin: 0;
  font-size: 15px;
}

.table-header span {
  color: #7b8493;
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
  padding: 12px 13px;
  text-align: left;
  color: #697586;
  font-size: 10px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

td {
  padding: 13px;
  font-size: 11px;
  border-bottom: 1px solid #edf0f3;
  white-space: nowrap;
}

tbody tr:hover {
  background: #fafcff;
}

.ticket-code {
  color: #2563eb;
  font-size: 11px;
}

.status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 9px;
  font-weight: 600;
}

.completed {
  color: #079669;
  background: #e5faf3;
}

.processing {
  color: #d28a00;
  background: #fff5dc;
}

.waiting {
  color: #e44b67;
  background: #ffe9ed;
}

.detail-btn {
  border: none;
  background: transparent;
  color: #2563eb;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
}

.detail-btn:hover {
  text-decoration: underline;
}

.empty-row {
  height: 150px;
  text-align: center;
  color: #8a94a4;
  font-size: 12px;
}

.pagination {
  padding: 14px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination button {
  width: 29px;
  height: 29px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  background: white;
  color: #657184;
  cursor: pointer;
}

.pagination button.active {
  background: #2563eb;
  border-color: #2563eb;
  color: white;
}

.pagination button:disabled {
  color: #aaa;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, .4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 500px;
  max-width: calc(100% - 30px);
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, .2);
}

.modal-header {
  padding: 16px 19px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;
  font-size: 16px;
}

.modal-header span {
  display: block;
  margin-top: 4px;
  color: #2563eb;
  font-size: 11px;
}

.close-btn {
  border: none;
  background: none;
  color: #6b7280;
  font-size: 17px;
  cursor: pointer;
}

.modal-body {
  padding: 18px 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #edf0f3;
}

.detail-item label {
  color: #7b8493;
  font-size: 11px;
}

.detail-item strong {
  color: #303a4a;
  font-size: 11px;
}

.content-box,
.reply-box {
  margin-top: 15px;
  padding: 12px;
  border-radius: 6px;
  background: #f7f8fa;
}

.content-box label,
.reply-box label {
  display: block;
  margin-bottom: 7px;
  color: #697586;
  font-size: 10px;
  font-weight: 600;
}

.content-box p,
.reply-box p {
  margin: 0;
  color: #3f4958;
  font-size: 11px;
  line-height: 1.6;
}

.reply-box {
  background: #f0f0ff;
}

.modal-footer {
  padding: 13px 20px;
  background: #fafafa;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.close-modal,
.process-btn {
  height: 34px;
  padding: 0 14px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}

.close-modal {
  border: 1px solid #d9dee6;
  background: white;
  color: #596579;
}

.process-btn {
  border: none;
  background: #2563eb;
  color: white;
}

.toast {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 10000;
  padding: 12px 18px;
  border-radius: 6px;
  background: #202938;
  color: white;
  font-size: 11px;
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

@media (max-width: 900px) {
  .filter-box {
    flex-wrap: wrap;
  }

  .filter-item {
    flex: 1;
    min-width: 180px;
  }

  .search-btn,
  .reset-btn {
    margin-top: 5px;
  }
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .filter-box {
    margin: 15px;
    flex-direction: column;
    align-items: stretch;
  }

  .filter-item {
    width: 100%;
  }

  .filter-item select,
  .filter-item input {
    width: 100%;
  }

  .search-btn,
  .reset-btn {
    width: 100%;
  }

  .table-card {
    margin: 15px;
  }
}
</style>