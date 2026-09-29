<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header" style="
                background: linear-gradient(
                  135deg,
                  rgb(0, 255, 47) 0%,
                  rgb(0, 255, 153) 11%,
                  rgb(2, 250, 209) 50%,
                  rgb(0, 218, 242) 92%,
                  rgb(0, 187, 255) 100%
                );
              ">
        <h5 class="mb-0 text-dark"><i class="bx bx-home"></i> ĐĂNG KÝ THUÊ PHÒNG</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <div class="mb-3">
              <label class="form-label fw-bold">Họ và tên người thuê</label>
              <input v-model="valueThuePhong.fullname" type="text" class="form-control" />
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Số CCCD / CMND</label>
                <input v-model="valueThuePhong.cccd" type="text" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Số điện thoại</label>
                <input v-model="valueThuePhong.phone" type="text" class="form-control" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Nghề nghiệp</label>
                <input v-model="valueThuePhong.job" type="text" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Số người ở</label>
                <input
                  v-model.number="valueThuePhong.people"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Địa chỉ thường trú</label>
              <input v-model="valueThuePhong.address" type="text" class="form-control" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label class="form-label fw-bold">Ngày bắt đầu thuê</label>
              <input
                v-model="valueThuePhong.startDate"
                type="date"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Thời hạn thuê (tháng)</label>
              <input
                v-model.number="valueThuePhong.months"
                type="number"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Phương thức thanh toán</label>
              <select v-model="valueThuePhong.payment" class="form-select">
                <option>Tiền mặt</option>
                <option>Chuyển khoản</option>
                <option>Ví điện tử</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Ghi chú thêm</label>
              <textarea
                v-model="valueThuePhong.note"
                class="form-control"
                rows="3"
              ></textarea>
            </div>
            <button
              class="btn btn-primary w-100 text-dark"
              style="
                background: linear-gradient(
                  135deg,
                  rgb(0, 255, 47) 0%,
                  rgb(0, 255, 153) 11%,
                  rgb(2, 250, 209) 50%,
                  rgb(0, 218, 242) 92%,
                  rgb(0, 187, 255) 100%
                );
              "
            >
              XÁC NHẬN THUÊ PHÒNG
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
      valueThuePhong: {
        fullname: "",
        cccd: "",
        phone: "",
        job: "",
        people: 1,
        address: "",
        startDate: "",
        months: 1,
        payment: "Tiền mặt",
        note: "",
      },
    };
  },
};
</script>

<style>
body {
  padding-top: 125px;
}
</style>
