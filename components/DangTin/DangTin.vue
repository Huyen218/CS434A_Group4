<template>
  <div class="post-page">
    <div class="post-card">
      <div class="post-title">
        <i class="bx bx-edit"></i>
        ĐĂNG TIN
      </div>

      <div class="post-body">
        <div class="form-row">
          <div class="form-group full">
            <label>Tiêu đề bài đăng</label>
            <input
              v-model="newPost.productName"
              type="text"
              placeholder="Ví dụ: Phòng Studio cao cấp gần ĐH Duy Tân"
            />
          </div>

          <div class="form-group">
            <label>Loại phòng</label>
            <select v-model="newPost.loaiphong">
              <option value="">Chọn loại phòng</option>
              <option value="Nội thất cao cấp">Nội thất cao cấp</option>
              <option value="Nội thất cơ bản">Nội thất cơ bản</option>
              <option value="Nội thất trống">Nội thất trống</option>
              <option value="Nội thất đầy đủ">Nội thất đầy đủ</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>URL img phòng</label>
            <input
              v-model="newPost.url_img"
              type="text"
              placeholder="URL ảnh phòng"
            />
          </div>

          <div class="form-group">
            <label>Giá thuê (/tháng) VNĐ</label>
            <input
              v-model.number="newPost.gia_thang"
              type="number"
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label>Địa điểm</label>
            <input
              v-model="newPost.location"
              type="text"
              placeholder="Địa điểm chi tiết"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Chủ trọ</label>
            <input
              v-model="newPost.namechutro"
              type="text"
              placeholder="Họ và tên chủ trọ"
            />
          </div>

          <div class="form-group">
            <label>Số điện thoại</label>
            <input
              v-model="newPost.phone"
              type="text"
              placeholder="Số điện thoại"
            />
          </div>

          <div class="form-group">
            <label>Quận/Huyện</label>
            <select v-model="newPost.quan">
              <option value="">Chọn quận/huyện</option>
              <option value="Quận Hải Châu">Quận Hải Châu</option>
              <option value="Quận Thanh Khê">Quận Thanh Khê</option>
              <option value="Quận Liên Chiểu">Quận Liên Chiểu</option>
              <option value="Quận Ngũ Hành Sơn">Quận Ngũ Hành Sơn</option>
              <option value="Quận Sơn Trà">Quận Sơn Trà</option>
              <option value="Quận Cẩm Lệ">Quận Cẩm Lệ</option>
            </select>
          </div>
        </div>

        <div class="form-row description-row">
          <div class="form-group description-group">
            <label>Mô tả chi tiết</label>
            <textarea
              v-model="newPost.notes"
              placeholder="Nhập mô tả chi tiết về phòng trọ"
            ></textarea>
          </div>

          <div class="form-group area-group">
            <label>Diện tích (m2)</label>
            <input
              v-model.number="newPost.dientich"
              type="number"
              placeholder="0"
            />
          </div>
        </div>

        <div class="button-row">
          <button @click="handlePost">
            XÁC NHẬN ĐĂNG TIN
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DangTin",

  data() {
    return {
      newPost: {
        productName: "",
        url_img: "",
        gia_thang: 0,
        namechutro: "",
        phone: "",
        notes: "",
        loaiphong: "",
        location: "",
        quan: "",
        dientich: 0
      }
    };
  },

  methods: {
    handlePost() {
      const rawUser = localStorage.getItem("userLogin");
      const user = rawUser ? JSON.parse(rawUser) : null;

      if (!user) {
        alert("Vui lòng đăng nhập trước khi đăng tin!");
        return;
      }

      if (
        !this.newPost.productName ||
        !this.newPost.loaiphong ||
        !this.newPost.location ||
        !this.newPost.quan ||
        !this.newPost.namechutro ||
        !this.newPost.phone
      ) {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
        return;
      }

      if (this.newPost.gia_thang <= 0) {
        alert("Vui lòng nhập giá thuê theo tháng!");
        return;
      }

      if (this.newPost.dientich <= 0) {
        alert("Vui lòng nhập diện tích phòng!");
        return;
      }

      const newRoom = {
        id: "ROOM_" + Date.now(),
        img: this.newPost.url_img,
        productId: "PRD_" + Date.now(),
        productName: this.newPost.productName,
        sku: "USER-" + String(user.username || "").toUpperCase(),
        categoryId: "CAT_" + Date.now(),
        categoryName: this.newPost.loaiphong,
        unit: "Phòng",
        area: Number(this.newPost.dientich),
        furnitureStatus: this.newPost.loaiphong,
        location0: this.newPost.location,
        location1: this.newPost.quan,
        location2: "Đà Nẵng",
        status: "Còn phòng",
        amenities: ["Wifi", "Máy lạnh"],
        rental: {
          byNight: false,
          byMonth: true,
          price_night: 0,
          price_month: Number(this.newPost.gia_thang)
        },
        supplierName: this.newPost.namechutro || user.fullname,
        phone: this.newPost.phone,
        star: 5,
        sum_danhgia: 0,
        notes: this.newPost.notes
      };

      const listRooms =
        JSON.parse(localStorage.getItem("database_rooms")) || [];

      listRooms.push(newRoom);

      localStorage.setItem(
        "database_rooms",
        JSON.stringify(listRooms)
      );

      alert("Đăng tin thành công!");

      this.newPost = {
        productName: "",
        url_img: "",
        gia_thang: 0,
        namechutro: "",
        phone: "",
        notes: "",
        loaiphong: "",
        location: "",
        quan: "",
        dientich: 0
      };

      this.$router.push("/TimKiem");
    }
  }
};
</script>

<style scoped>
.post-page {
  min-height: calc(100vh - 125px);
  padding: 25px 35px 40px;
  background: #f5f6f8;
}

.post-card {
  max-width: 1100px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.post-title {
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 22px;
  background: #c62828;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
}

.post-title i {
  margin-right: 9px;
  font-size: 20px;
}

.post-body {
  padding: 25px 28px 22px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 17px;
}

.form-row:first-child {
  grid-template-columns: 2fr 1fr;
}

.form-group {
  min-width: 0;
}

.form-group.full {
  grid-column: auto;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  color: #444444;
  font-size: 12px;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  border: 1px solid #d9dde3;
  border-radius: 5px;
  padding: 9px 11px;
  background: #ffffff;
  color: #444444;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
}

.form-group input,
.form-group select {
  height: 38px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #c62828;
}

.form-group textarea {
  height: 105px;
  resize: vertical;
}

.description-row {
  grid-template-columns: 2fr 1fr;
  align-items: start;
}

.description-group {
  min-height: 130px;
}

.area-group {
  max-width: 100%;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.button-row button {
  border: none;
  border-radius: 5px;
  padding: 11px 24px;
  background: #c62828;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.button-row button:hover {
  background: #a91f1f;
}

@media (max-width: 850px) {
  .post-page {
    padding: 20px 15px;
  }

  .form-row,
  .form-row:first-child,
  .description-row {
    grid-template-columns: 1fr;
  }

  .button-row {
    justify-content: stretch;
  }

  .button-row button {
    width: 100%;
  }
}
</style>