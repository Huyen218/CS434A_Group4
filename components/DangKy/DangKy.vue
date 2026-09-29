<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-sm">
          <div class="card-body p-5">
            <h3 class="text-center mb-4">Đăng Ký Tài Khoản</h3>

            <div class="mb-3">
              <label class="form-label">Họ và Tên</label>
              <input
                v-model="newName"
                type="text"
                class="form-control"
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Tên đăng nhập</label>
              <input
                v-model="newUsername"
                type="text"
                class="form-control"
                placeholder="Ví dụ: admin123"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input
                v-model="newPassword"
                type="password"
                class="form-control"
                placeholder="••••••••"
              />
            </div>

            <button @click="handleRegister" class="btn btn-warning w-100 mb-3">
              Đăng ký ngay
            </button>
          </div>

          <p class="text-center">
            Đã có tài khoản?
            <router-link to="/dang-nhap">Đăng nhập tại đây</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newUsername: "",
      newPassword: "",
      newName: "",
    };
  },
  methods: {
    handleRegister() {
      // Kiểm tra xem người dùng có bỏ trống ô nào không
      if (!this.newName || !this.newUsername || !this.newPassword) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      // Lấy danh sách user hiện tại ra (hoặc mảng rỗng nếu chưa có ai)
      const listUsers  = localStorage.getItem("users");
      const users = listUsers  ? JSON.parse(listUsers ) : [];

      // Kiểm tra xem tên đăng nhập đã tồn tại chưa
      const check = users.some((u) => u.username === this.newUsername.trim());
      if (check) {
        alert("Username đã tồn tại");
        return;
      }

      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        username: this.newUsername.trim(),
        password: this.newPassword.trim(),
        fullname: this.newName.trim(),
        role: "user",
        active: true,
      };

      // Thêm user mới từ form
      users.push(newUser);
      // 3. Lưu lại vào localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Đăng ký thành công!");
      this.$router.push("/dang-nhap");
    },
  },
};
</script>
<style>
body {
  padding-top: 110px;
}
</style>
