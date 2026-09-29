<template>
  <div class="container-fluid p-4 bg-light min-vh-100">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h2 class="fw-bold text-primary">Quản Lý Tài Khoản Người Dùng</h2>
        <p class="text-muted">Quản lý và phân quyền tài khoản thành viên trong hệ thống</p>
      </div>

      <button class="btn btn-primary px-4" @click="openAdd">
        + Thêm tài khoản mới
      </button>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>TỔNG TÀI KHOẢN</small>
          <h2>{{ users.length }}</h2>
          <span>Tài khoản trong hệ thống</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>ĐANG HOẠT ĐỘNG</small>
          <h2>{{ activeCount }}</h2>
          <span>Thành viên đang truy cập</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>BỊ KHÓA</small>
          <h2>{{ lockCount }}</h2>
          <span>Hạn chế quyền truy cập</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow border-0 p-3">
          <small>CHỜ DUYỆT</small>
          <h2>{{ pendingCount }}</h2>
          <span>Tài khoản đăng ký mới</span>
        </div>
      </div>
    </div>

    <div class="card shadow border-0 mb-3">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <button class="btn me-2" :class="filter==''?'btn-primary':'btn-light'" @click="filter=''">Tất cả</button>
          <button class="btn me-2" :class="filter=='active'?'btn-success':'btn-light'" @click="filter='active'">Đang hoạt động</button>
          <button class="btn me-2" :class="filter=='lock'?'btn-danger':'btn-light'" @click="filter='lock'">Bị khóa</button>
          <button class="btn" :class="filter=='pending'?'btn-warning':'btn-light'" @click="filter='pending'">Chờ duyệt</button>
        </div>

        <input
          v-model="keyword"
          class="form-control"
          style="width:280px"
          placeholder="Tìm kiếm tài khoản..."
        />
      </div>
    </div>

    <div class="card shadow border-0">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>MÃ TK</th>
              <th>HỌ TÊN</th>
              <th>EMAIL</th>
              <th>SĐT</th>
              <th>VAI TRÒ</th>
              <th>TRẠNG THÁI</th>
              <th class="text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="u in filteredUsers" :key="u.id">
              <td>TK{{ u.id }}</td>
              <td>{{ u.fullname }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.phone }}</td>

              <td>
                <span class="badge rounded-pill" :class="roleClass(u.role)">
                  {{ roleName(u.role) }}
                </span>
              </td>

              <td>
                <span class="badge rounded-pill" :class="statusClass(u)">
                  {{ statusText(u) }}
                </span>
              </td>

              <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1" @click="editUser(u)">✏</button>
                <button class="btn btn-sm btn-outline-warning me-1" @click="toggleLock(u)">🔒</button>
                <button class="btn btn-sm btn-outline-danger" @click="removeUser(u.id)">🗑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal d-block" v-if="showModal" style="background:rgba(0,0,0,.4)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ isEdit ? "Cập nhật tài khoản" : "Thêm tài khoản" }}</h5>
            <button class="btn-close" @click="close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label>Họ tên</label>
              <input v-model="form.fullname" class="form-control">
            </div>

            <div class="mb-3">
              <label>Email</label>
              <input v-model="form.email" class="form-control">
            </div>

            <div class="mb-3">
              <label>SĐT</label>
              <input v-model="form.phone" class="form-control">
            </div>

            <div class="mb-3">
              <label>Địa chỉ</label>
              <input v-model="form.address" class="form-control">
            </div>

            <div class="mb-3">
              <label>Vai trò</label>
              <select v-model="form.role" class="form-select">
                <option value="admin">Admin</option>
                <option value="staff">Nhân viên</option>
                <option value="customer">Khách thuê</option>
              </select>
            </div>

            <div class="mb-3">
              <label>Mật khẩu</label>
              <input v-model="form.password" class="form-control" type="password">
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="saveUser">Lưu</button>
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
      users: [],
      keyword: "",
      filter: "",
      showModal: false,
      isEdit: false,
      form: {}
    };
  },

  mounted() {
    this.load();
  },

  computed: {
    activeCount() {
      return this.users.filter(i => i.active).length;
    },

    lockCount() {
      return this.users.filter(i => !i.active).length;
    },

    pendingCount() {
      return this.users.filter(i => i.pending).length;
    },

    filteredUsers() {
      return this.users.filter(i => {
        const key =
          i.fullname.toLowerCase().includes(this.keyword.toLowerCase()) ||
          i.email.toLowerCase().includes(this.keyword.toLowerCase()) ||
          (i.phone || "").includes(this.keyword);

        if (this.filter == "active") return i.active && key;
        if (this.filter == "lock") return !i.active && key;
        if (this.filter == "pending") return i.pending && key;

        return key;
      });
    }
  },

  methods: {
    load() {
      this.users = JSON.parse(localStorage.getItem("users")) || [];
    },

    openAdd() {
      this.isEdit = false;

      this.form = {
        id: Date.now(),
        fullname: "",
        email: "",
        phone: "",
        address: "",
        role: "customer",
        password: "123456",
        active: true
      };

      this.showModal = true;
    },

    editUser(u) {
      this.isEdit = true;
      this.form = { ...u };
      this.showModal = true;
    },

    saveUser() {
      if (this.isEdit) {
        const index = this.users.findIndex(i => i.id == this.form.id);
        this.users[index] = { ...this.form };
      } else {
        this.users.push(this.form);
      }

      localStorage.setItem("users", JSON.stringify(this.users));
      this.close();
      this.load();
    },

    toggleLock(u) {
      u.active = !u.active;
      localStorage.setItem("users", JSON.stringify(this.users));
      this.load();
    },

    removeUser(id) {
      if (!confirm("Xóa tài khoản?")) return;

      this.users = this.users.filter(i => i.id != id);
      localStorage.setItem("users", JSON.stringify(this.users));
    },

    close() {
      this.showModal = false;
    },

    roleName(r) {
      if (r == "admin") return "Admin";
      if (r == "staff") return "Nhân viên";
      return "Khách thuê";
    },

    roleClass(r) {
      if (r == "admin") return "bg-primary";
      if (r == "staff") return "bg-info text-dark";
      return "bg-secondary";
    },

    statusText(u) {
      if (u.pending) return "Chờ duyệt";
      return u.active ? "Hoạt động" : "Bị khóa";
    },

    statusClass(u) {
      if (u.pending) return "bg-warning text-dark";
      return u.active ? "bg-success" : "bg-danger";
    }
  }
};
</script>

<style scoped>
.table th,
.table td{
  vertical-align: middle;
}

.card{
  border-radius:16px;
}

.badge{
  padding:8px 14px;
  font-size:13px;
}
</style>