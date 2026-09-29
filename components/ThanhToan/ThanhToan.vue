<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Thanh Toán</h4>

            <div class="mb-3">
              <label class="form-label">Tên người thanh toán</label>
              <input
                v-model="payment.fullname"
                type="text"
                class="form-control"
                readonly
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Phòng</label>
              <input
                v-model="payment.room"
                type="text"
                class="form-control"
                placeholder="Nhập tên phòng"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Số tiền</label>
              <input
                v-model="payment.amount"
                type="number"
                class="form-control"
                placeholder="Nhập số tiền"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Phương thức thanh toán</label>
              <select v-model="payment.method" class="form-select">
                <option value="">-- Chọn phương thức --</option>
                <option value="Tiền mặt">Tiền mặt</option>
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Ví điện tử">Ví điện tử</option>
              </select>
            </div>

            <button @click="handlePayment" class="btn btn-dark w-100">
              Thanh toán
            </button>

            <button
              @click="$router.push('/lich-su-thanh-toan')"
              class="btn btn-outline-secondary w-100 mt-2"
            >
              Xem lịch sử thanh toán
            </button>
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
      payment: {
        fullname: "",
        room: "",
        amount: "",
        method: "",
      },
    };
  },

  mounted() {
    const loginUser = localStorage.getItem("userLogin");

    if (!loginUser) {
      alert("Vui lòng đăng nhập trước!");
      this.$router.push("/dang-nhap");
      return;
    }

    const user = JSON.parse(loginUser);

    this.payment.fullname = user.fullname;

    // Nếu trước đó có lưu phòng đã chọn
    const phongDaChon = localStorage.getItem("phongDaChon");

    if (phongDaChon) {
      const phong = JSON.parse(phongDaChon);
      this.payment.room = phong.tenPhong || phong.room || "";
      this.payment.amount = phong.gia || phong.price || "";
    }
  },

  methods: {
    handlePayment() {
      if (
        !this.payment.room ||
        !this.payment.amount ||
        !this.payment.method
      ) {
        alert("Vui lòng nhập đầy đủ thông tin thanh toán!");
        return;
      }

      const loginUser = JSON.parse(
        localStorage.getItem("userLogin")
      );

      let payments = localStorage.getItem("lichSuThanhToan");

      if (!payments) {
        payments = [];
      } else {
        payments = JSON.parse(payments);
      }

      const newPayment = {
        id: Date.now(),
        userId: loginUser.id,
        username: loginUser.username,
        fullname: loginUser.fullname,
        room: this.payment.room,
        amount: Number(this.payment.amount),
        method: this.payment.method,
        status: "Đã thanh toán",
        date: new Date().toLocaleString("vi-VN"),
      };

      payments.push(newPayment);

      localStorage.setItem(
        "lichSuThanhToan",
        JSON.stringify(payments)
      );

      alert("Thanh toán thành công!");

      this.$router.push("/lichSuThanhToan");
    },
  },
};
</script>

<style>
body {
  padding-top: 110px;
}
</style>