<template>
  <div class="topbar d-flex align-items-center bg-dark" style="height: 80px">
    <nav class="navbar navbar-expand bg-dark">
      <div class="topbar-logo-header">
        <div class="header-logo">
          <a href="https://duytan.edu.vn/" title="Đại học Duy Tân" target="_blank"
            ><img
              src="https://nhatro.duytan.edu.vn/Content/Home/images/logo-duy-tan-Square.png"
              style="height: 65px"
              class="logo_dtu me-2"
            />
          </a>
        </div>
        <div class="col text-center">
          <div class="row" style="height: 40px">
            <div class="col">
              <a href="/"><h1 class="text-white">TroGo</h1></a>
            </div>
          </div>
          <div class="row">
            <a href="/"><div class="col text-white">Kênh Phòng Trọ Số 1</div></a>
          </div>
        </div>
      </div>
      <div class="ms-auto d-flex align-items-center gap-3">
        <button
          @click="$router.push('/DangTin')"
          class="btn btn-outline-danger radius-30 px-4"
        >
          <i class="bx bx-edit"></i> Đăng tin +
        </button>
        <template v-if="!userLogged">
          <button @click="$router.push('/DangNhap')" class="btn btn-dark me-2">
            Đăng nhập
          </button>
          <button @click="$router.push('/DangKy')" class="btn btn-outline-warning">
            Đăng ký
          </button>
        </template>

        <template v-else>
          <router-link to="/Profile" class="text-white text-decoration-none me-3 fw-bold">
            <span>Chào, {{ userLogged?.ho_ten || userLogged?.ten || userLogged?.name || userLogged?.username || 'Hoàng Hà' }}</span>
          </router-link>
          <button @click="logout" class="btn btn-sm btn-danger">Đăng xuất</button>
        </template>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "TopRocker",
  data() {
    return {
      userLogged: null,
    };
  },
  created() {
    this.syncAuth();
    window.addEventListener("auth-change", this.syncAuth);
  },
  beforeUnmount() {
    window.removeEventListener("auth-change", this.syncAuth);
  },
  methods: {
    syncAuth() {
      const raw = localStorage.getItem("userLogin");
      this.userLogged = raw ? JSON.parse(raw) : null;
    },
    logout() {
      localStorage.removeItem("userLogin");
      window.dispatchEvent(new Event("auth-change"));
      this.$router.push("/dang-nhap");
    },
  },
  
};
</script>

<style></style>
