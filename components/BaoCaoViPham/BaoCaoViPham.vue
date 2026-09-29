<template>
  <div class="container mt-4">
    <h2><b>Báo Cáo Vi Phạm</b></h2>
    <p>
      Nếu bạn phát hiện phòng trọ có thông tin sai lệch, lừa đảo hoặc vi phạm quy định,
      hãy gửi báo cáo cho chúng tôi.
    </p>
    <div v-for="(room, index) in rooms" :key="index" class="card mb-3 rounded-4">
      <div class="row g-0">
        <div class="col-lg-4">
          <img :src="room.img" class="img-fluid rounded-start w-100" style="height: 220px; object-fit: cover" />
        </div>
        <div class="col-lg-8">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <h4>
                  <b>{{ room.productName }}</b>
                </h4>
              </div>
              <div class="col-lg-6 text-end">
                <button class="btn btn-sm text-white bg-success">
                  {{ room.status }}
                </button>
              </div>
            </div>
            <div class="text-danger fs-5 fw-bold">
              {{ room.price.toLocaleString() }} đ / tháng
            </div>
            <div class="text-muted mt-2">
              <i class="fa-solid fa-location-dot"></i>
              {{ room.location }}
            </div>
            <div class="mt-2"><b>Chủ phòng:</b> {{ room.owner }}</div>
            <div class="mt-1"><b>SĐT:</b> {{ room.phone }}</div>
            <div class="row">
              <div class="col-lg-6">
                {{ room.notes }}
              </div>
              <div class="col-lg-6 text-end">
                <button class="btn btn-danger rounded-pill btn-sm" @click="reportRoom(room)" data-bs-toggle="modal"
                  data-bs-target="#modalReport">
                  <i class="fa-solid fa-flag"></i>
                  Báo cáo vi phạm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalReport" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header" style="
            background: linear-gradient(
              89deg,
              rgb(255, 27, 27) 30%,
              rgb(254, 123, 123) 100%
            );
          ">
          <h5 class="text-white mb-0">
            <i class="fa-solid fa-flag"></i>
            Lập Báo Cáo Vi Phạm Phòng Trọ
          </h5>

          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <label class="fw-bold">Tên phòng:</label>
              <input v-model="report.productName" class="form-control bg-light" disabled />
            </div>

            <div class="col-lg-4">
              <label class="fw-bold">Địa điểm:</label>
              <input v-model="report.location" class="form-control bg-light" disabled />
            </div>

            <div class="col-lg-2">
              <label class="fw-bold">Tên chủ trọ:</label>
              <input v-model="report.owner" class="form-control bg-light" disabled />
            </div>

            <div class="col-lg-2">
              <label class="fw-bold">Số điện thoại:</label>
              <input v-model="report.phone" class="form-control bg-light" disabled />
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-6">
              <label class="fw-bold">Tên khách thuê vi phạm:</label>
              <input v-model="report.violator" class="form-control" placeholder="Nhập tên người vi phạm" />
            </div>

            <div class="col-lg-6">
              <label class="fw-bold">Phòng vi phạm (Mã số):</label>
              <input v-model="report.roomId" class="form-control bg-light" disabled />
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-6">
              <label class="fw-bold text-danger">Loại vi phạm:</label>

              <select v-model="report.type" class="form-select border-danger">
                <option value="">-- Chọn loại vi phạm --</option>
                <option>Gây mất trật tự / Tiếng ồn</option>
                <option>Vệ sinh chung</option>
                <option>An toàn cháy nổ</option>
                <option>Quá số người quy định</option>
                <option>Khác</option>
              </select>
            </div>

            <div class="col-lg-6">
              <label class="fw-bold">Ngày lập báo cáo:</label>
              <input type="date" v-model="report.date" class="form-control" />
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-12">
              <label class="fw-bold"> Mô tả chi tiết / Nội dung vi phạm </label>

              <textarea v-model="report.description" class="form-control" rows="3"
                placeholder="Nhập chi tiết hành vi vi phạm..."></textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="resetReport">
            <i class="fa-solid fa-rotate-right"></i>
            Nhập lại
          </button>

          <button class="btn text-white" style="
              background: linear-gradient(
                89deg,
                rgb(255, 27, 27) 30%,
                rgb(254, 123, 123) 100%
              );
            " @click="submitReport">
            <i class="fa-solid fa-paper-plane"></i>
            Gửi Báo Cáo Vi Phạm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rooms: [
          {
            id: 1,
            img: "https://picsum.photos/500/300?1",
            productName: "Phòng trọ sinh viên gần DTU",
            price: 1500000,
            location: "Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng",
            owner: "Nguyễn Văn A",
            phone: "0905000000",
            status: "Còn phòng",
            notes: "Phòng sạch sẽ, gần trường, có wifi và chỗ để xe.",
          },
        ],

        report: {
          productName: "",
          location: "",
          owner: "",
          phone: "",
          roomId: "",
          violator: "",
          type: "",
          date: "",
          description: "",
        },
      };
    },

    methods: {
      reportRoom(room) {
        this.report.productName = room.productName;
        this.report.location = room.location;
        this.report.owner = room.owner;
        this.report.phone = room.phone;
        this.report.roomId = room.id;
      },

      resetReport() {
        this.report.violator = "";
        this.report.type = "";
        this.report.date = "";
        this.report.description = "";
      },

      submitReport() {
        alert("Gửi báo cáo thành công!");
      },
    },
  };
</script>

<style>
  body {
    padding-top: 120px;
  }
</style>