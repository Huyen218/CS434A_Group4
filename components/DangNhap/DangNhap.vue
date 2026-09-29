<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Đăng Nhập</h4>
            <div class="mb-3">
              <label class="form-label">Tên đăng nhập</label>
              <input
                v-model="inputUser"
                type="text"
                class="form-control"
                placeholder="Nhập username"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input
                v-model="inputPass"
                type="password"
                class="form-control"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <button @click="handleLogin" class="btn btn-dark w-100">Đăng nhập</button>
            <div class="mt-3 text-center">
              <router-link to="/QuenMatKhau">
                Quên mật khẩu?
              </router-link>
            </div>
            <div class="mt-2 text-center">
              <span>Chưa có tài khoản? </span>
              <router-link to="/dang-ky">
                Đăng ký ngay
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
      inputUser: "",
      inputPass: "",
    };
  },

  methods: {
    handleLogin() {
      const ListUsers = localStorage.getItem("users");
      if (!ListUsers) {
        alert("Hệ thống chưa có dữ liệu người dùng!");
        return;
      }

      const users = JSON.parse(ListUsers);
      const username = this.inputUser.trim();
      const password = this.inputPass.trim();

      if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        alert("Sai tài khoản / mật khẩu");
        return;
      }

      if (!user.active) {
        alert("Tài khoản đã bị khóa!");
        return;
      }

      const loginUser = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      };

      localStorage.setItem(
        "userLogin",
        JSON.stringify({
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          role: user.role,
        })
      );
      window.dispatchEvent(new Event("auth-change"));

      alert("Đăng nhập thành công!");
      if (user.role === "admin") {
        this.$router.push("/admin/dashboard");
      } else {
        this.$router.push("/trang-chu");
      }
    },
  },
  mounted() {
    const ListUsers = localStorage.getItem("users");

    if (!ListUsers) {
      const defaultUsers = [
        {
          id: 1,
          username: "admin",
          password: "123",
          fullname: "Admin",
          role: "admin",
          active: true,
        },
        {
          id: 2,
          username: "quoc26",
          password: "123",
          fullname: "Quốc",
          role: "user",
          active: true,
        },
      ];

      localStorage.setItem("users", JSON.stringify(defaultUsers));
      console.log("Đã khởi tạo users mặc định");
    }
  },
};
</script>
<style>
body {
  padding-top: 110px;
}
</style>
