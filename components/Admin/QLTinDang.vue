<template>
  <div class="container-fluid py-4">
    <div class="page-title mb-4">
      <h2><span>Quản Lý</span> / Quản Lý Tin Đăng</h2>
    </div>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h5 class="mb-1 text-primary">Danh Sách Tin Đăng</h5>
            <p class="text-muted mb-0">Quản lý các tin đăng của website</p>
          </div>

          <div class="col-lg-6">
            <div class="search-box">
              <input
                v-model="loc_timkiem"
                type="text"
                class="form-control"
                placeholder="Tìm kiếm tên phòng, loại phòng, chủ sở hữu, số điện thoại"
              />
              <button class="btn btn-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Danh sách tin đăng</h5>
        <span class="badge bg-primary">
          {{ search.length }} tin đăng
        </span>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle mb-0">
            <thead>
              <tr class="text-center">
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên phòng</th>
                <th>Loại phòng</th>
                <th>Chủ sở hữu</th>
                <th>Số điện thoại</th>
                <th>Giá thuê</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(value, index) in search" :key="value.id">
                <td class="text-center">
                  {{ index + 1 }}
                </td>

                <td class="text-center">
                  <img
                    v-if="value.img"
                    :src="value.img"
                    class="room-image"
                    alt="Hình ảnh phòng"
                  />
                  <div v-else class="no-image">
                    <i class="fa-regular fa-image"></i>
                  </div>
                </td>

                <td>
                  <strong>{{ value.productName }}</strong>
                </td>

                <td>
                  {{ value.categoryName }}
                </td>

                <td>
                  {{ value.supplierName }}
                </td>

                <td>
                  {{ value.phone }}
                </td>

                <td class="text-end">
                  <strong>
                    {{ formatPrice(value.rental?.price_month) }}
                  </strong>
                  <span class="text-muted"> đ/tháng</span>
                </td>

                <td class="text-center">
                  <button
                    @click="btntext(value)"
                    class="status-btn"
                    :class="btncolor(value.status)"
                  >
                    {{ value.status }}
                  </button>
                </td>

                <td class="text-center">
                  <button
                    @click="them_data_model(value)"
                    data-bs-toggle="modal"
                    data-bs-target="#chinhsua"
                    class="btn btn-sm btn-primary me-1"
                    title="Chỉnh sửa"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    @click="them_data_model(value)"
                    data-bs-toggle="modal"
                    data-bs-target="#xoa"
                    class="btn btn-sm btn-danger"
                    title="Xóa"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>

              <tr v-if="search.length === 0">
                <td colspan="9" class="text-center py-5 text-muted">
                  Không tìm thấy tin đăng
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="chinhsua"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title text-white">
              Chỉnh Sửa Chi Tiết Phòng
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Tên phòng</label>
                <input
                  v-model="Arraydata.productName"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Mã phòng</label>
                <input
                  v-model="Arraydata.productId"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Loại phòng</label>
                <input
                  v-model="Arraydata.categoryName"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Mã loại</label>
                <input
                  v-model="Arraydata.categoryId"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Diện tích</label>
                <input
                  v-model.number="Arraydata.area"
                  class="form-control"
                  type="number"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Tình trạng nội thất</label>
                <input
                  v-model="Arraydata.furnitureStatus"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Chủ sở hữu</label>
                <input
                  v-model="Arraydata.supplierName"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Số điện thoại</label>
                <input
                  v-model="Arraydata.phone"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Địa chỉ</label>
                <input
                  v-model="Arraydata.location0"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-3">
                <label class="form-label">Quận/Huyện</label>
                <input
                  v-model="Arraydata.location1"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-3">
                <label class="form-label">Thành phố</label>
                <input
                  v-model="Arraydata.location2"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Giá thuê tháng</label>
                <input
                  v-model.number="Arraydata.rental.price_month"
                  class="form-control"
                  type="number"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Đánh giá</label>
                <input
                  v-model.number="Arraydata.star"
                  class="form-control"
                  type="number"
                  min="0"
                  max="5"
                />
              </div>

              <div class="col-12">
                <label class="form-label">Tiện ích</label>

                <div class="amenities">
                  <span
                    v-for="(item, i) in Arraydata.amenities"
                    :key="i"
                    class="badge bg-secondary"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>

              <div class="col-12">
                <label class="form-label">Ghi chú</label>

                <textarea
                  v-model="Arraydata.notes"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>

            <button
              @click="capnhatPhong"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="xoa"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white">
              Xác Nhận Xóa Phòng
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <h5>
              Bạn có chắc chắn muốn xóa phòng
              <span class="text-danger">
                "{{ Arraydata.productName }}"
              </span>
              không?
            </h5>

            <p class="text-muted mb-0">
              Sau khi xóa sẽ không thể khôi phục.
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>

            <button
              @click="xoaphong"
              data-bs-dismiss="modal"
              class="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QLTinDang",

  data() {
    return {
      house: [],

      Arraydata: {
        id: "",
        img: "",
        productId: "",
        productName: "",
        sku: "",
        categoryId: "",
        categoryName: "",
        unit: "",
        area: 0,
        furnitureStatus: "",
        location0: "",
        location1: "",
        location2: "",
        status: "",
        amenities: [],
        rental: {
          byMonth: false,
          price_month: 0
        },
        supplierName: "",
        phone: "",
        star: 0,
        sum_danhgia: 0,
        notes: ""
      },

      loc_timkiem: ""
    };
  },

  methods: {
    them_data_model(value) {
      this.Arraydata = {
        id: value.id,
        img: value.img,
        productId: value.productId,
        productName: value.productName,
        sku: value.sku,
        categoryId: value.categoryId,
        categoryName: value.categoryName,
        unit: value.unit,
        area: value.area,
        furnitureStatus: value.furnitureStatus,
        location0: value.location0,
        location1: value.location1,
        location2: value.location2,
        status: value.status,
        rental: {
          ...(value.rental || {}),
          price_month: value.rental?.price_month || 0
        },
        amenities: [...(value.amenities || [])],
        supplierName: value.supplierName,
        phone: value.phone,
        star: value.star,
        sum_danhgia: value.sum_danhgia,
        notes: value.notes
      };
    },

    btntext(room) {
      if (room.status === "Còn phòng") {
        room.status = "Đang sửa chữa";
      } else if (room.status === "Đang sửa chữa") {
        room.status = "Hết phòng";
      } else {
        room.status = "Còn phòng";
      }

      localStorage.setItem(
        "database_rooms",
        JSON.stringify(this.house)
      );
    },

    btncolor(status) {
      if (status === "Còn phòng") {
        return "status-available";
      }

      if (status === "Đang sửa chữa") {
        return "status-repair";
      }

      return "status-full";
    },

    capnhatPhong() {
      const index = this.house.findIndex(
        item => item.id === this.Arraydata.id
      );

      if (index === -1) {
        return;
      }

      this.house[index] = {
        ...this.Arraydata,
        rental: {
          ...this.Arraydata.rental
        },
        amenities: [
          ...this.Arraydata.amenities
        ]
      };

      localStorage.setItem(
        "database_rooms",
        JSON.stringify(this.house)
      );

      alert("Cập nhật thành công!");
    },

    xoaphong() {
      this.house = this.house.filter(
        value => value.id !== this.Arraydata.id
      );

      localStorage.setItem(
        "database_rooms",
        JSON.stringify(this.house)
      );

      alert("Xóa thành công!");
    },

    loadData() {
      this.house =
        JSON.parse(
          localStorage.getItem("database_rooms")
        ) || [];
    },

    formatPrice(price) {
      if (!price) {
        return "0";
      }

      return Number(price).toLocaleString("vi-VN");
    }
  },

  computed: {
    search() {
      const keyword = this.loc_timkiem
        ? this.loc_timkiem.toLowerCase().trim()
        : "";

      if (!keyword) {
        return this.house;
      }

      return this.house.filter(value => {
        const productName =
          value.productName?.toLowerCase() || "";

        const categoryName =
          value.categoryName?.toLowerCase() || "";

        const supplierName =
          value.supplierName?.toLowerCase() || "";

        const phone =
          value.phone?.toLowerCase() || "";

        return (
          productName.includes(keyword) ||
          categoryName.includes(keyword) ||
          supplierName.includes(keyword) ||
          phone.includes(keyword)
        );
      });
    }
  },

  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.page-title h2 {
  font-size: 22px;
  font-weight: 600;
}

.page-title h2 span {
  color: #6c757d;
}

.search-box {
  display: flex;
  gap: 8px;
}

.search-box input {
  height: 38px;
}

.search-box button {
  min-width: 100px;
}

.room-image {
  width: 90px;
  height: 65px;
  object-fit: cover;
  border-radius: 5px;
}

.no-image {
  width: 90px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f3f5;
  color: #9aa0a6;
  border-radius: 5px;
  font-size: 22px;
}

table th {
  background: #f8f9fa;
  font-size: 13px;
  white-space: nowrap;
}

table td {
  font-size: 13px;
}

.status-btn {
  min-width: 115px;
  border: none;
  border-radius: 5px;
  padding: 6px 10px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.status-available {
  background: #0d6efd;
}

.status-repair {
  background: #ffc107;
  color: #212529;
}

.status-full {
  background: #dc3545;
}

.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.amenities .badge {
  font-size: 12px;
  padding: 7px 10px;
}

@media (max-width: 768px) {
  .search-box {
    margin-top: 15px;
    flex-direction: column;
  }

  .search-box button {
    width: 100%;
  }
}
</style>