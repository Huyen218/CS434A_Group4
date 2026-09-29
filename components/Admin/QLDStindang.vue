<template>
  <div class="quan-ly-danh-sach-tin">

    <!-- ================= HEADER ================= -->

    <div class="page-header">

      <div class="header-content">

        <h1>
          Quản lý danh sách tin đăng
        </h1>

        <p>
          Nhân viên & Admin kiểm soát toàn bộ hệ thống tin phòng trọ
        </p>

      </div>


      <div class="header-actions">

        <button class="notification-btn">
          🔔
        </button>

        <div class="new-post">
          Hôm nay:
          <strong>+24 tin mới</strong>
        </div>

      </div>

    </div>


    <!-- ================= CONTENT ================= -->

    <div class="content-wrapper">


      <!-- ================= BỘ LỌC ================= -->

      <div class="filter-box">

        <!-- Tìm kiếm -->

        <div class="search-box">

          <span class="search-icon">
            🔍
          </span>

          <input
            v-model="searchText"
            type="text"
            placeholder="Tìm kiếm theo tên phòng, chủ phòng..."
          />

        </div>


        <!-- Trạng thái -->

        <div class="filter-item">

          <span>
            Trạng thái:
          </span>

          <select v-model="statusFilter">

            <option value="">
              Tất cả
            </option>

            <option value="Đã duyệt">
              Đã duyệt
            </option>

            <option value="Chờ duyệt">
              Chờ duyệt
            </option>

          </select>

        </div>


        <!-- Địa điểm -->

        <div class="filter-item">

          <span>
            Địa điểm:
          </span>

          <select v-model="locationFilter">

            <option value="">
              Tất cả
            </option>

            <option value="Hải Châu">
              Đà Nẵng
            </option>

            <option value="Hòa Khánh">
              Hòa Khánh
            </option>

          </select>

        </div>

      </div>


      <!-- ================= TABLE ================= -->

      <div class="table-container">

        <table>

          <thead>

            <tr>

              <th class="image-column">
                Hình ảnh
              </th>

              <th>
                Tên phòng / Loại tin
              </th>

              <th>
                Chủ phòng
              </th>

              <th>
                Địa điểm
              </th>

              <th>
                Trạng thái
              </th>

              <th>
                Thao tác
              </th>

            </tr>

          </thead>


          <tbody>

            <tr
              v-for="room in filteredRooms"
              :key="room.id"
            >

              <!-- Hình -->

              <td>

                <img
                  :src="room.image"
                  class="room-image"
                  alt="Phòng trọ"
                />

              </td>


              <!-- Tên -->

              <td>

                <div class="room-name">
                  {{ room.name }}
                </div>

                <div class="room-type">

                  Chuyên mục:

                  <span>
                    {{ room.type }}
                  </span>

                </div>

              </td>


              <!-- Chủ phòng -->

              <td>

                <span class="owner">
                  {{ room.owner }}
                </span>

              </td>


              <!-- Địa điểm -->

              <td>

                <span class="location">
                  {{ room.location }}
                </span>

              </td>


              <!-- Trạng thái -->

              <td>

                <span
                  class="status"
                  :class="
                    room.status === 'Đã duyệt'
                      ? 'approved'
                      : 'pending'
                  "
                >

                  {{ room.status }}

                </span>

              </td>


              <!-- Thao tác -->

              <td>

                <div class="actions">

                  <button
                    v-if="room.status === 'Chờ duyệt'"
                    class="action-btn"
                    @click="approveRoom(room)"
                  >
                    Kiểm duyệt
                  </button>

                  <button
                    v-else
                    class="action-btn"
                    @click="viewRoom(room)"
                  >
                    Xem chi tiết
                  </button>


                  <button
                    class="manage-btn"
                    @click="manageRoom(room)"
                  >
                    Quản lý
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>


        <!-- ================= KHÔNG CÓ DỮ LIỆU ================= -->

        <div
          v-if="filteredRooms.length === 0"
          class="empty-state"
        >

          <div class="empty-icon">
            🔍
          </div>

          <h3>
            Không có tin đăng
          </h3>

          <p>
            Vui lòng điều chỉnh bộ lọc hoặc từ khóa
            tìm kiếm để thử lại.
          </p>

        </div>

      </div>


      <!-- ================= DEMO EMPTY ================= -->

      <div class="empty-demo">

        <div class="empty-demo-title">

          Mô phỏng kết quả lọc tìm kiếm rỗng:

        </div>


        <div class="empty-demo-box">

          <div class="empty-icon">
            🔍
          </div>

          <h3>
            Không có tin đăng
          </h3>

          <p>
            Vui lòng điều chỉnh bộ lọc hoặc từ khóa
            tìm kiếm để thử lại.
          </p>

        </div>

      </div>

    </div>


    <!-- ================= THÔNG BÁO ================= -->

    <div
      v-if="message"
      class="toast"
    >

      {{ message }}

    </div>

  </div>
</template>


<script>

export default {

  name: "QuanLyDanhSachTin",


  data() {

    return {

      /* ================= SEARCH ================= */

      searchText: "",

      statusFilter: "",

      locationFilter: "",


      /* ================= MESSAGE ================= */

      message: "",


      /* ================= DATA ================= */

      rooms: [

        {

          id: 1,

          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80",

          name:
            "Căn Hộ Studio Ban Công Thoáng Mát Q3",

          type:
            "Studio cao cấp",

          owner:
            "Nguyễn Văn Tuấn",

          location:
            "Hải Châu, Đà Nẵng",

          status:
            "Đã duyệt"

        },


        {

          id: 2,

          image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&q=80",

          name:
            "Phòng Trọ Gác Lửng Giá Rẻ Gần Đại Học",

          type:
            "Phòng giá rẻ",

          owner:
            "Lê Thị Mai",

          location:
            "Hòa Khánh Nam, Đà Nẵng",

          status:
            "Chờ duyệt"

        }

      ]

    };

  },


  /* ================= COMPUTED ================= */

  computed: {

    filteredRooms() {

      const keyword =
        this.searchText
          .toLowerCase()
          .trim();


      return this.rooms.filter(room => {


        /* TÌM KIẾM */

        const matchKeyword =

          keyword === "" ||

          room.name
            .toLowerCase()
            .includes(keyword) ||

          room.owner
            .toLowerCase()
            .includes(keyword);


        /* TRẠNG THÁI */

        const matchStatus =

          this.statusFilter === "" ||

          room.status ===
            this.statusFilter;


        /* ĐỊA ĐIỂM */

        const matchLocation =

          this.locationFilter === "" ||

          room.location
            .includes(this.locationFilter);


        return (

          matchKeyword &&

          matchStatus &&

          matchLocation

        );

      });

    }

  },


  /* ================= METHODS ================= */

  methods: {

    /* Kiểm duyệt */

    approveRoom(room) {

      room.status =
        "Đã duyệt";


      this.showMessage(
        "Đã kiểm duyệt tin đăng thành công!"
      );

    },


    /* Xem */

    viewRoom(room) {

      this.showMessage(
        "Đang xem: " + room.name
      );

    },


    /* Quản lý */

    manageRoom(room) {

      this.showMessage(
        "Đang quản lý: " + room.name
      );

    },


    /* Toast */

    showMessage(text) {

      this.message =
        text;


      clearTimeout(
        this.messageTimer
      );


      this.messageTimer =
        setTimeout(() => {

          this.message =
            "";

        }, 2000);

    }

  }

};

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.quan-ly-danh-sach-tin {

  min-height: 100%;

  background: #f6f8fb;

  color: #182235;

  font-family:
    "Segoe UI",
    Arial,
    sans-serif;

}


/* =====================================================
   HEADER
===================================================== */

.page-header {

  min-height: 112px;

  padding: 22px 24px;

  background: white;

  border-bottom:
    1px solid
    #e2e8f0;

  display: flex;

  align-items: center;

  justify-content: space-between;

}


.header-content h1 {

  margin: 0 0 5px;

  font-size: 19px;

  font-weight: 700;

  color: #172136;

}


.header-content p {

  margin: 0;

  color: #7d899c;

  font-size: 11px;

}


/* HEADER ACTION */

.header-actions {

  display: flex;

  align-items: center;

  gap: 12px;

}


.notification-btn {

  width: 32px;

  height: 32px;

  border-radius: 50%;

  border:
    1px solid
    #dfe5ee;

  background: white;

  cursor: pointer;

}


.new-post {

  padding: 9px 13px;

  background: #f0efff;

  border-radius: 5px;

  color: #5646e8;

  font-size: 10px;

}


/* =====================================================
   CONTENT
===================================================== */

.content-wrapper {

  padding: 23px 24px 35px;

}


/* =====================================================
   FILTER
===================================================== */

.filter-box {

  min-height: 58px;

  padding: 10px 12px;

  margin-bottom: 14px;

  background: white;

  border:
    1px solid
    #e2e8f0;

  border-radius: 9px;

  display: flex;

  align-items: center;

  gap: 10px;

}


/* SEARCH */

.search-box {

  height: 35px;

  flex: 1;

  min-width: 200px;

  background: #f8fafc;

  border:
    1px solid
    #edf1f6;

  border-radius: 7px;

  display: flex;

  align-items: center;

}


.search-icon {

  margin: 0 10px;

  font-size: 14px;

}


.search-box input {

  width: 100%;

  height: 100%;

  border: none;

  outline: none;

  background: transparent;

  font-size: 11px;

}


/* FILTER */

.filter-item {

  height: 35px;

  min-width: 130px;

  padding:
    0 8px
    0 11px;

  border:
    1px solid
    #e2e8f0;

  border-radius: 7px;

  display: flex;

  align-items: center;

  gap: 5px;

}


.filter-item span {

  color: #4d5b70;

  font-size: 11px;

  white-space: nowrap;

}


.filter-item select {

  border: none;

  outline: none;

  background: transparent;

  color: #5646e8;

  font-size: 11px;

  font-weight: 600;

}


/* =====================================================
   TABLE
===================================================== */

.table-container {

  background: white;

  border:
    1px solid
    #e2e8f0;

  border-radius: 9px;

  overflow: hidden;

}


table {

  width: 100%;

  border-collapse: collapse;

  table-layout: fixed;

}


thead {

  background: #fafbfd;

}


th {

  height: 36px;

  padding: 0 16px;

  text-align: left;

  color: #65748a;

  font-size: 10px;

  font-weight: 500;

}


th:nth-child(1) {

  width: 88px;

}


th:nth-child(2) {

  width: 27%;

}


th:nth-child(3) {

  width: 16%;

}


th:nth-child(4) {

  width: 17%;

}


th:nth-child(5) {

  width: 12%;

}


th:nth-child(6) {

  width: 15%;

}


td {

  height: 74px;

  padding: 8px 16px;

  border-top:
    1px solid
    #edf0f4;

  font-size: 10px;

  vertical-align: middle;

}


/* IMAGE */

.room-image {

  width: 72px;

  height: 51px;

  border-radius: 6px;

  object-fit: cover;

}


/* NAME */

.room-name {

  max-width: 240px;

  color: #172136;

  font-size: 11px;

  font-weight: 700;

  line-height: 1.3;

}


.room-type {

  margin-top: 4px;

  color: #5646e8;

  font-size: 9px;

}


/* OWNER */

.owner {

  font-size: 10px;

}


/* LOCATION */

.location {

  color: #78869b;

  font-size: 10px;

}


/* =====================================================
   STATUS
===================================================== */

.status {

  display: inline-block;

  padding: 5px 8px;

  border-radius: 5px;

  font-size: 9px;

  font-weight: 600;

}


.status.approved {

  color: #0c9b6b;

  background: #e8faf3;

}


.status.pending {

  color: #d88a00;

  background: #fff6e5;

}


/* =====================================================
   ACTION
===================================================== */

.actions {

  display: flex;

  gap: 10px;

  white-space: nowrap;

}


.action-btn,
.manage-btn {

  border: none;

  background: transparent;

  padding: 0;

  cursor: pointer;

  font-size: 9px;

}


.action-btn {

  color: #4e46df;

}


.manage-btn {

  color: #5c677a;

}


.action-btn:hover,
.manage-btn:hover {

  text-decoration: underline;

}


/* =====================================================
   EMPTY
===================================================== */

.empty-state {

  min-height: 180px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}


.empty-icon {

  width: 58px;

  height: 58px;

  border-radius: 50%;

  background: #eef0ff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

  margin-bottom: 9px;

}


.empty-state h3 {

  margin: 0 0 4px;

  font-size: 12px;

}


.empty-state p {

  width: 250px;

  margin: 0;

  text-align: center;

  color: #8190a5;

  font-size: 10px;

}


/* =====================================================
   DEMO
===================================================== */

.empty-demo {

  margin-top: 18px;

}


.empty-demo-title {

  margin-bottom: 8px;

  color: #69788f;

  font-size: 10px;

  font-weight: 600;

}


.empty-demo-box {

  height: 182px;

  background: white;

  border:
    1px solid
    #e2e8f0;

  border-radius: 9px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}


.empty-demo-box h3 {

  margin: 0 0 4px;

  font-size: 12px;

}


.empty-demo-box p {

  width: 250px;

  margin: 0;

  text-align: center;

  color: #8190a5;

  font-size: 10px;

}


/* =====================================================
   TOAST
===================================================== */

.toast {

  position: fixed;

  right: 24px;

  bottom: 24px;

  padding: 11px 16px;

  background: #162238;

  color: white;

  border-radius: 7px;

  font-size: 12px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.18);

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 1000px) {

  .filter-box {

    flex-wrap: wrap;

  }


  .search-box {

    flex-basis: 100%;

  }


  .filter-item {

    flex: 1;

  }


  .table-container {

    overflow-x: auto;

  }


  table {

    min-width: 850px;

  }

}


@media (max-width: 700px) {

  .page-header {

    padding: 18px 15px;

  }


  .content-wrapper {

    padding: 15px;

  }


  .new-post {

    display: none;

  }

}

</style>