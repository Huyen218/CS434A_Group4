<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card shadow">
          <div class="card-body p-4">

            <h4 class="text-center mb-4">Quên Mật Khẩu</h4>

            <div class="mb-3">
              <label class="form-label">Tên đăng nhập</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                placeholder="Nhập username"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input
                v-model="fullname"
                type="text"
                class="form-control"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Mật khẩu mới</label>
              <input
                v-model="newPassword"
                type="password"
                class="form-control"
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Xác nhận mật khẩu</label>
              <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <button
              @click="handleForgotPassword"
              class="btn btn-dark w-100"
            >
              Đổi mật khẩu
            </button>

            <div class="mt-3 text-center">
              <router-link to="/dang-nhap">
                Quay lại đăng nhập
              </router-link>
            </div>

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
      username: "",
      fullname: "",
      newPassword: "",
      confirmPassword: "",
    };
  },

  methods: {
    handleForgotPassword() {
      const ListUsers = localStorage.getItem("users");

      if (!ListUsers) {
        alert("Hệ thống chưa có dữ liệu người dùng!");
        return;
      }

      if (
        !this.username ||
        !this.fullname ||
        !this.newPassword ||
        !this.confirmPassword
      ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      const users = JSON.parse(ListUsers);

      const userIndex = users.findIndex(
        (user) =>
          user.username === this.username.trim() &&
          user.fullname === this.fullname.trim()
      );

      if (userIndex === -1) {
        alert("Không tìm thấy tài khoản!");
        return;
      }

      users[userIndex].password = this.newPassword;

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      alert("Đổi mật khẩu thành công!");

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