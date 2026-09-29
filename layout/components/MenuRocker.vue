<template>
  <div class="nav-container primary-menu mt-3">
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item">
          <router-link to="/trang-chu" class="nav-link">
            <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
            <div class="menu-title">Trang Chủ</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/TimKiem" class="nav-link">
            <div class="parent-icon">
              <i class="fa-solid fa-sm fa-magnifying-glass"></i>
            </div>
            <div class="menu-title">Tìm Kiếm</div>
          </router-link>
        </li>

        <!-- quyền: ADMIN -->
        <li class="nav-item" v-if="auth && auth.role === 'admin'">
          <router-link to="/admin/Dashboard" class="nav-link">
            <div class="menu-title">Dashboard</div>
          </router-link>
        </li>
        <li class="nav-item dropdown" v-if="auth && auth.role === 'admin'">
          <a
            href="javascript:;"
            class="nav-link dropdown-toggle dropdown-toggle-nocaret"
            data-bs-toggle="dropdown"
          >
            <div class="menu-title">Quản lý</div>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/admin/QLTaiKhoan" class="dropdown-item">
                Quản lý tài khoản
              </router-link>
            </li>
            <li>
              <router-link to="/admin/QLTinDang" class="dropdown-item">
                Quản lý tin đăng
              </router-link>
            </li>
            <li>
              <router-link to="/admin/QLKhachHang" class="dropdown-item">
                Quản lý khách hàng
              </router-link>
            </li>
            <li>
              <router-link to="/admin/QLDanhGia" class="dropdown-item">
                Quản lý đánh giá
              </router-link>
            </li>
            <li>
              <router-link to="/admin/QLPhong" class="dropdown-item">
                Quản lý phòng
              </router-link>
            </li>
            <li>
              <router-link to="/admin/HoTroKhachHang" class="dropdown-item">
                Hỗ trợ khách hàng
              </router-link>
            </li>
            <li>
              <router-link to="/admin/BaoCaoThongKe" class="dropdown-item">
                Báo cáo thống kê
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item" v-if="auth && auth.role === 'admin'">
          <router-link to="/admin/XuLyViPham" class="nav-link">
            <div class="menu-title">Xử Lý Vi Phạm</div>
          </router-link>
        </li>

        <li class="nav-item text-end">
          <router-link to="/BaoCaoViPham" class="nav-link">
            <div class="parent-icon">
              <i class="fa-solid fa-flag"></i>
            </div>
            <div class="menu-title">Báo Cáo Vi Phạm</div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MenuRocker",
  props: {
    auth: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style></style>
