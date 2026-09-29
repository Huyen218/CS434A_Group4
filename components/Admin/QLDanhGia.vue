<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <h2>
          <span class="text-secondary">Quản Lý</span>/<b>Quản Lý Đánh Giá</b>
        </h2>
      </div>

      <div class="col-lg-6">
        <div class="input-group">
          <input
            v-model="keyword"
            class="form-control"
            type="text"
            placeholder="Tìm tên trọ, khách thuê, số điện thoại..."
          />
          <input v-model="dateFilter" class="form-control" type="date" />
          <button @click="searchReview" class="btn btn-primary px-4">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>

    <div
      class="row mt-2"
      v-for="(review, index) in filteredReviews"
      :key="review.id || index"
    >
      <div class="col-md-6 col-lg-12">
        <div class="card shadow-sm review-card">
          <div
            class="card-header text-dark"
            style="background: linear-gradient(88deg, rgb(254, 224, 0) 40%, rgb(255, 255, 0) 80%, rgb(255, 255, 255) 100%);"
          >
            <h5>
              <i class="fa-solid fa-house me-2"></i>
              <b>{{ review.room }}</b>
            </h5>
          </div>

          <div class="card-body">
            <h6 class="mb-1">
              <i class="fa-solid fa-location-dot text-danger me-1"></i>
              {{ review.address }}
            </h6>

            <h6 class="mb-1">
              <i class="fa-solid fa-user me-1"></i>
              Chủ nhà: {{ review.owner }}
            </h6>

            <h6 class="mb-1">
              <i class="fa-solid fa-phone me-1 text-success"></i>
              {{ review.phone }}
            </h6>

            <h6 v-if="review.customer" class="mb-3">
              <i class="fa-solid fa-user-check me-1 text-primary"></i>
              Khách đánh giá: {{ review.customer }}
            </h6>

            <div class="mb-2">
              <i
                v-for="n in 5"
                :key="n"
                class="fa-star me-1"
                :class="
                  n <= review.star
                    ? 'fa-solid text-warning fa-2x'
                    : 'fa-regular text-secondary fa-2x'
                "
              ></i>
            </div>

            <div class="review-content">
              <h5>{{ review.content }}</h5>
            </div>

            <div v-if="review.createdAt" class="mt-2 text-secondary">
              <small>
                Ngày đánh giá:
                {{ formatDate(review.createdAt) }}
              </small>
            </div>
          </div>

          <div class="card-footer text-end bg-light">
            <button
              @click="deleteReview(review.id)"
              class="btn btn-sm btn-outline-danger me-2"
            >
              <i class="fa-solid fa-trash"></i>
            </button>

            <button
              @click="viewReview(review)"
              class="btn btn-sm btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#xemDanhGia"
            >
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="filteredReviews.length === 0"
      class="text-center mt-5 text-secondary"
    >
      <i class="fa-solid fa-comment-slash fa-2x mb-2"></i>
      <p>Không tìm thấy đánh giá nào.</p>
    </div>

    <div
      class="modal fade"
      id="xemDanhGia"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title">
              <i class="fa-solid fa-star me-2"></i>
              Chi tiết đánh giá
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body" v-if="selectedReview">
            <h5>
              <b>Tên phòng:</b>
              {{ selectedReview.room }}
            </h5>

            <p>
              <b>Địa chỉ:</b>
              {{ selectedReview.address }}
            </p>

            <p>
              <b>Chủ nhà:</b>
              {{ selectedReview.owner }}
            </p>

            <p>
              <b>SĐT:</b>
              {{ selectedReview.phone }}
            </p>

            <p v-if="selectedReview.customer">
              <b>Khách đánh giá:</b>
              {{ selectedReview.customer }}
            </p>

            <div class="mb-3">
              <i
                v-for="n in 5"
                :key="n"
                class="fa-star me-1 fa-2x"
                :class="
                  n <= selectedReview.star
                    ? 'fa-solid text-warning'
                    : 'fa-regular text-secondary'
                "
              ></i>
            </div>

            <div class="p-3 bg-light rounded">
              {{ selectedReview.content }}
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
      reviews: [],
      keyword: "",
      dateFilter: "",
      searchKeyword: "",
      searchDate: "",
      selectedReview: null,
      defaultReviews: [
        {
          id: "DEFAULT_1",
          room: "Phòng Trọ Sinh Viên Liên Chiểu",
          address: "16 Sư Hy Nhan, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng",
          owner: "Hà",
          phone: "1234567890",
          star: 5,
          content: "Phòng sạch sẽ, chủ nhà thân thiện, an ninh tốt."
        },
        {
          id: "DEFAULT_2",
          room: "Nhà trọ Thanh Lương 21",
          address: "35 Thanh Lương 21, Hoà Xuân, Cẩm Lệ",
          owner: "Anh Tuấn",
          phone: "0988888888",
          star: 4,
          content: "Phòng ổn, giá hợp lý, gần trường."
        },
        {
          id: "DEFAULT_3",
          room: "Phòng trọ Bách Khoa",
          address: "Gần ĐH Bách Khoa Đà Nẵng",
          owner: "Chị Lan",
          phone: "0909999999",
          star: 3,
          content: "Phòng nhỏ nhưng đầy đủ tiện nghi."
        }
      ]
    };
  },

  computed: {
    filteredReviews() {
      return this.reviews.filter((review) => {
        const keyword = this.searchKeyword.toLowerCase().trim();

        const matchKeyword =
          keyword === "" ||
          (review.room || "").toLowerCase().includes(keyword) ||
          (review.customer || "").toLowerCase().includes(keyword) ||
          (review.phone || "").includes(keyword);

        let matchDate = true;

        if (this.searchDate && review.createdAt) {
          matchDate =
            new Date(review.createdAt).toISOString().slice(0, 10) ===
            this.searchDate;
        }

        return matchKeyword && matchDate;
      });
    }
  },

  methods: {
    loadReviews() {
      const savedReviews =
        JSON.parse(localStorage.getItem("database_reviews")) || [];

      this.reviews = [...this.defaultReviews, ...savedReviews];
    },

    searchReview() {
      this.searchKeyword = this.keyword;
      this.searchDate = this.dateFilter;
    },

    formatDate(date) {
      if (!date) {
        return "";
      }

      const d = new Date(date);

      return d.toLocaleDateString("vi-VN");
    },

    deleteReview(id) {
      if (id && id.toString().startsWith("DEFAULT_")) {
        alert("Không thể xóa đánh giá mẫu!");
        return;
      }

      const confirmDelete = confirm("Bạn có chắc muốn xóa đánh giá này?");

      if (!confirmDelete) {
        return;
      }

      let reviews =
        JSON.parse(localStorage.getItem("database_reviews")) || [];

      reviews = reviews.filter((review) => review.id !== id);

      localStorage.setItem(
        "database_reviews",
        JSON.stringify(reviews)
      );

      this.loadReviews();

      alert("Đã xóa đánh giá!");
    },

    viewReview(review) {
      this.selectedReview = review;
    }
  },

  mounted() {
    this.loadReviews();
  }
};
</script>

<style>
.review-card {
  border-radius: 12px;
  transition: 0.2s;
}

.review-card:hover {
  transform: translateY(-5px);
}

.review-content {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}
</style>