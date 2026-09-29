<template>
  <div class="profile-container container mt-5 pt-5">
    <div class="row g-4">
      <!-- ========================================== -->
      <!-- 1. THANH MENU ĐIỀU HƯỚNG BÊN TRÁI (SIDEBAR) -->
      <!-- ========================================== -->
      <div class="col-md-3">
        <div class="list-group shadow-sm border-0 rounded-3">
          <button 
            type="button"
            class="list-group-item list-group-item-action py-3 d-flex align-items-center gap-2 border-0"
            :class="{ 'active-tab': currentTab === 'profile' }"
            @click="currentTab = 'profile'">
            <i class="bx bx-user fs-5"></i> 
            <span class="fw-medium">Quản lý thông tin cá nhân</span>
          </button>
          
          <button 
            type="button"
            class="list-group-item list-group-item-action py-3 d-flex align-items-center gap-2 border-0 border-top"
            :class="{ 'active-tab': currentTab === 'password' }"
            @click="currentTab = 'password'">
            <i class="bx bx-lock-alt fs-5"></i> 
            <span class="fw-medium">Đổi mật khẩu</span>
          </button>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- 2. KHU VỰC HIỂN THỊ NỘI DUNG BÊN PHẢI      -->
      <!-- ========================================== -->
      <div class="col-md-9">
        
        <!-- TAB 1: FORM QUẢN LÝ THÔNG TIN CÁ NHÂN -->
        <div v-if="currentTab === 'profile'" class="card border-0 shadow-sm rounded-3 p-4">
          <!-- Ảnh đại diện & Thông tin tóm tắt -->
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="avatar-wrapper">
              <img 
                :src="user.avatar || 'https://via.placeholder.com/80'" 
                class="rounded-circle object-fit-cover border" 
                width="80" 
                height="80" 
                alt="Avatar"
              />
            </div>
            <div>
              <h5 class="fw-bold mb-1">{{ user.name }}</h5>
              <p class="text-muted mb-0">{{ user.phone }}</p>
            </div>
          </div>

          <!-- Nút Đổi ảnh đại diện -->
          <div class="mb-4">
            <label class="btn btn-light border btn-sm rounded-2 cursor-pointer">
              Đổi ảnh đại diện
              <input type="file" @change="onAvatarChange" hidden accept="image/*">
            </label>
          </div>

          <!-- Form cập nhật thông tin -->
          <form @submit.prevent="handleSaveProfile">
            <div class="mb-3">
              <label class="form-label text-muted fw-medium">Họ tên:</label>
              <input type="text" class="form-control form-control-lg fs-6" v-model="user.name" placeholder="Nguyễn Văn A" required>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fw-medium">Email:</label>
              <input type="email" class="form-control form-control-lg fs-6" v-model="user.email" placeholder="abc@gmail.com" required>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fw-medium">CCCD:</label>
              <input type="text" class="form-control form-control-lg fs-6" v-model="user.cccd" placeholder="1234567890987">
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fw-medium">Số điện thoại:</label>
              <input type="text" class="form-control form-control-lg fs-6" v-model="user.phone" placeholder="0123456789" required>
            </div>

            <div class="mb-4">
              <label class="form-label text-muted fw-medium">Địa chỉ:</label>
              <input type="text" class="form-control form-control-lg fs-6" v-model="user.address" placeholder="Thanh Khê-Đà Nẵng">
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-secondary px-5 py-2 rounded-pill fw-medium">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>

        <!-- TAB 2: FORM THAY ĐỔI MẬT KHẨU -->
        <div v-if="currentTab === 'password'" class="card border-0 shadow-sm rounded-3 p-4">
          <h5 class="fw-bold mb-4">Thay đổi mật khẩu</h5>
          
          <form @submit.prevent="handleChangePassword">
            <div class="mb-3">
              <input 
                type="password" 
                class="form-control form-control-lg fs-6" 
                v-model="passwordForm.oldPassword" 
                placeholder="Nhập mật khẩu cũ" 
                required
              >
            </div>

            <div class="mb-3">
              <input 
                type="password" 
                class="form-control form-control-lg fs-6" 
                v-model="passwordForm.newPassword" 
                placeholder="Nhập mật khẩu mới" 
                required
              >
            </div>

            <div class="mb-4">
              <input 
                type="password" 
                class="form-control form-control-lg fs-6" 
                v-model="passwordForm.confirmPassword" 
                placeholder="Xác nhận mật khẩu mới" 
                required
              >
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-secondary px-5 py-2 rounded-pill fw-medium">
                Cập nhật mật khẩu
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      currentTab: 'profile',
      user: {
        name: '',
        phone: '',
        email: '',
        cccd: '',
        address: '',
        avatar: ''
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  created() {
    this.loadUserData();
  },
  methods: {
    // Tự động đọc dữ liệu tài khoản đã đăng nhập
    loadUserData() {
      const rawUser = localStorage.getItem("userLogin");
      if (rawUser) {
        try {
          const userData = JSON.parse(rawUser);
          
          this.user.name = userData.fullname || userData.ho_ten || userData.ten || "";
          this.user.email = userData.email || "";
          this.user.phone = userData.phone || userData.so_dien_thoai || "";
          this.user.cccd = userData.cccd || "";
          this.user.address = userData.address || userData.dia_chi || "";
          this.user.avatar = userData.avatar || "";
          
        } catch (e) {
          console.error("Lỗi đọc dữ liệu người dùng:", e);
        }
      } else {
        this.user.name = "";
        this.user.email = "";
        this.user.phone = "";
        this.user.cccd = "";
        this.user.address = "";
        this.user.avatar = "";
      }
    },

    onAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.user.avatar = URL.createObjectURL(file);
      }
    },

    handleSaveProfile() {
      const rawUser = localStorage.getItem("userLogin");
      let userData = {};
      
      if (rawUser) {
        try {
          userData = JSON.parse(rawUser);
        } catch (e) {
          console.error("Lỗi khi đọc dữ liệu cũ:", e);
        }
      }

      userData.name = this.user.name;
      userData.ho_ten = this.user.name; 
      userData.email = this.user.email;
      userData.phone = this.user.phone;
      userData.so_dien_thoai = this.user.phone;
      userData.cccd = this.user.cccd;
      userData.address = this.user.address;
      userData.dia_chi = this.user.address;
      
      userData.avatar = this.user.avatar;

      localStorage.setItem("userLogin", JSON.stringify(userData));
      
      window.dispatchEvent(new Event("auth-change"));
      
      alert('Cập nhật thông tin cá nhân thành công!');
    },

    handleChangePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        alert('Mật khẩu mới và Xác nhận mật khẩu không trùng khớp!');
        return;
      }
      
      if (this.passwordForm.newPassword.length < 6) {
        alert('Mật khẩu mới phải có tối thiểu 6 ký tự!');
        return;
      }

      alert('Thay đổi mật khẩu thành công!');
      this.passwordForm.oldPassword = '';
      this.passwordForm.newPassword = '';
      this.passwordForm.confirmPassword = '';
    }
  }
}
</script>

<style scoped>
/* Sửa khoảng cách phía trên để không bị Header che khuất */
.profile-container {
  padding-top: 180px !important;
  padding-bottom: 50px;
}

.active-tab {
  background-color: #e9ecef !important;
  color: #000 !important;
  font-weight: 600;
}

.cursor-pointer {
  cursor: pointer;
}

.form-control:focus {
  border-color: #adb5bd;
  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.25);
}
</style>