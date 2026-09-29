import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/cus',
        component: ()=>import('../layout/wrapper/index_customer.vue')
    },

    {
        path : '/',
        redirect: '/trang-chu'
    },

    {
        path : '/trang-chu',
        component: ()=>import('../components/TrangChu/trangchu.vue')
    },

    {
        path : '/TimKiem',
        component: ()=>import('../components/TimKiem/TimKiem.vue')
    },

    {
        path : '/DangNhap',
        component: ()=>import('../components/DangNhap/DangNhap.vue')
    },
    {
        path: '/ThanhToan',
        component: () => import('../components/ThanhToan/ThanhToan.vue'),
        meta: { requiresAuth: true },
    },
    
    {
        path: '/QuenMatKhau',
        component: () => import('../components/QuenMatKhau/QuenMatKhau.vue'),
    },

    {
        path : '/DangKy',
        component: ()=>import('../components/DangKy/DangKy.vue')
    },

    {
        path : '/DangTin',
        component: ()=>import('../components/DangTin/DangTin.vue'),
        meta: { requiresAuth: true },
    },

    {
        path : '/ThuePhong',
        component: ()=>import('../components/ThuePhong/ThuePhong.vue'),
        meta: { requiresAuth: true },
    },

    {
        path : '/BaoCaoViPham',
        component: ()=>import('../components/BaoCaoViPham/BaoCaoViPham.vue'),
        meta: { requiresAuth: true },
    },

    {
        path : '/Profile',
        component: () => import('../layout/wrapper/index_customer.vue'),
        children: [
            {
                path: '',
                component: () => import('../components/Profile/Profile.vue')
            }
        ],
        meta: { requiresAuth: true },
    },

    {
  path: "/admin",
  component: () => import("../layout/admin/AdminLayout.vue"),
  meta: { requiresAuth: true, role: "admin" },
  redirect: "/admin/dashboard",
  children: [
    {
      path: "Dashboard",
      component: () => import("../components/Admin/Dashboard.vue"),
    },
    {
      path: "QLTaiKhoan",
      component: () => import("../components/Admin/QLTaiKhoan.vue"),
    },
    {
      path: "QLTinDang",
      component: () => import("../components/Admin/QLTinDang.vue"),
    },
    {
     path: "KiemDuyetTin",
     component: () => import("../components/Admin/KiemDuyetTin.vue"),
    },
    {
      path: "QLKhachHang",
      component: () => import("../components/Admin/QLKhachHang.vue"),
    },
    {
      path: "QLDanhGia",
      component: () => import("../components/Admin/QLDanhGia.vue"),
    },
    {
      path: "QLPhong",
      component: () => import("../components/Admin/QLPhong.vue"),
    },
    {
      path: "XuLyViPham",
      component: () => import("../components/Admin/XuLyViPham.vue"),
    },
    { path: "BaoCaoThongKe", 
      component: () => import("../components/Admin/BaoCaoThongKe.vue") 
    },
    { path: "HoTroKhachHang", 
      component: () => import("../components/Admin/HoTroKhachHang.vue") 
    },
  ],
}


]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
  const rawUser = localStorage.getItem("userLogin");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const rawUsers = localStorage.getItem("users");
  const users = rawUsers ? JSON.parse(rawUsers) : [];
  // Cần đăng nhập
  if (to.meta.requiresAuth && !user) {
    alert("Bạn cần đăng nhập!");
    return next("/DangNhap");
  }

  // đăng nhập nhưng tài khoản bị khóa
  if (user) {
    const currentUser = users.find(u => u.id === user.id);

    if (!currentUser || !currentUser.active) {
      localStorage.removeItem("userLogin");
      window.dispatchEvent(new Event("auth-change"));
      alert("Tài khoản của bạn đã bị khóa");
      return next("/DangNhap");
    }
  }

  // Cần quyền admin
  if (to.meta.role && user?.role !== to.meta.role) {
    alert("Bạn không có quyền truy cập!");
    return next("/trang-chu");
  }

  next();
});


export default router
