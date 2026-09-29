<template>
  <div class="container-fluid p-4 bg-light min-vh-100">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h2 class="fw-bold text-primary mb-1">Khách hàng</h2>
        <p class="text-muted">Quản lý thông tin khách hàng</p>
      </div>

      <div class="input-group" style="width:300px">
        <input
          v-model="keyword"
          type="text"
          class="form-control"
          placeholder="Tìm theo tên hoặc SĐT"
        >
        <span class="input-group-text bg-primary text-white">
          🔍
        </span>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-3" v-for="card in cards" :key="card.title">
        <div class="card shadow border-0 text-center py-4">
          <div class="fs-1">{{ card.icon }}</div>
          <h1 class="fw-bold text-primary my-2">{{ card.value }}</h1>
          <div>{{ card.title }}</div>
        </div>
      </div>
    </div>

    <div class="card shadow border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <h3 class="fw-bold">Danh sách khách hàng</h3>

          <button class="btn btn-primary" @click="openAdd">
            + Thêm khách hàng
          </button>
        </div>

        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item,index) in filteredCustomers" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.fullname }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address }}</td>

              <td>
                <span
                  class="badge rounded-pill px-3 py-2"
                  :class="statusClass(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="viewCustomer(item)"
                >
                  👁
                </button>

                <button
                  class="btn btn-sm btn-outline-warning me-2"
                  @click="editCustomer(item)"
                >
                  ✏
                </button>

                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteCustomer(item.id)"
                >
                  🗑
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <div
      v-if="showModal"
      class="modal d-block"
      style="background:rgba(0,0,0,.4)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ isEdit ? "Cập nhật khách hàng" : "Thêm khách hàng" }}</h5>
            <button class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label>Họ tên</label>
              <input v-model="form.fullname" class="form-control">
            </div>

            <div class="mb-3">
              <label>SĐT</label>
              <input v-model="form.phone" class="form-control">
            </div>

            <div class="mb-3">
              <label>Email</label>
              <input v-model="form.email" class="form-control">
            </div>

            <div class="mb-3">
              <label>Địa chỉ</label>
              <input v-model="form.address" class="form-control">
            </div>

            <div class="mb-3">
              <label>Trạng thái</label>
              <select v-model="form.status" class="form-select">
                <option>Đang thuê</option>
                <option>Sắp hết hạn</option>
                <option>Đã trả</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">
              Hủy
            </button>

            <button class="btn btn-primary" @click="saveCustomer">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showView"
      class="modal d-block"
      style="background:rgba(0,0,0,.4)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Thông tin khách hàng</h5>
            <button class="btn-close" @click="showView=false"></button>
          </div>

          <div class="modal-body">
            <p><b>Họ tên:</b> {{ form.fullname }}</p>
            <p><b>SĐT:</b> {{ form.phone }}</p>
            <p><b>Email:</b> {{ form.email }}</p>
            <p><b>Địa chỉ:</b> {{ form.address }}</p>
            <p><b>Trạng thái:</b> {{ form.status }}</p>
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
      customers: [],
      showModal: false,
      showView: false,
      isEdit: false,
      form: {
        id: "",
        fullname: "",
        phone: "",
        email: "",
        address: "",
        status: "Đang thuê"
      }
    };
  },

  computed: {
    filteredCustomers() {
      return this.customers.filter(i =>
        i.fullname.toLowerCase().includes(this.keyword.toLowerCase()) ||
        i.phone.includes(this.keyword)
      );
    },

    cards() {
      return [
        {
          title: "Tổng khách hàng",
          value: this.customers.length,
          icon: "👥"
        },
        {
          title: "Khách hàng mới",
          value: this.customers.slice(-12).length,
          icon: "➕"
        },
        {
          title: "Đang thuê",
          value: this.customers.filter(i=>i.status==="Đang thuê").length,
          icon: "🏠"
        },
        {
          title: "Sắp hết hạn",
          value: this.customers.filter(i=>i.status==="Sắp hết hạn").length,
          icon: "🕒"
        }
      ];
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      this.customers = users
        .filter(i => i.role === "customer")
        .map(i => ({
          id: i.id,
          fullname: i.fullname,
          phone: i.phone || "",
          email: i.email,
          address: i.address || "",
          status: i.status || "Đang thuê"
        }));
    },

    openAdd() {
      this.isEdit = false;

      this.form = {
        id: "",
        fullname: "",
        phone: "",
        email: "",
        address: "",
        status: "Đang thuê"
      };

      this.showModal = true;
    },

    editCustomer(item) {
      this.isEdit = true;
      this.form = { ...item };
      this.showModal = true;
    },

    viewCustomer(item) {
      this.form = { ...item };
      this.showView = true;
    },

    closeModal() {
      this.showModal = false;
    },

    saveCustomer() {
      if (!this.form.fullname || !this.form.phone) {
        alert("Nhập đầy đủ thông tin");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (this.isEdit) {
        const index = users.findIndex(i => i.id === this.form.id);

        users[index] = {
          ...users[index],
          fullname: this.form.fullname,
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
          status: this.form.status
        };
      } else {
        users.push({
          id: Date.now(),
          fullname: this.form.fullname,
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
          status: this.form.status,
          role: "customer",
          username: this.form.phone,
          password: "123456",
          active: true
        });
      }

      localStorage.setItem("users", JSON.stringify(users));

      this.showModal = false;
      this.loadData();
    },

    deleteCustomer(id) {
      if (!confirm("Xóa khách hàng này?")) return;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      users = users.filter(i => i.id !== id);

      localStorage.setItem("users", JSON.stringify(users));

      this.loadData();
    },

    statusClass(status) {
      if (status === "Đang thuê") return "bg-success";
      if (status === "Sắp hết hạn") return "bg-warning text-dark";
      return "bg-secondary";
    }
  }
};
</script>

<style scoped>
.table td,
.table th{
  vertical-align: middle;
}

.card{
  border-radius:16px;
}

.badge{
  font-size:14px;
}
</style>