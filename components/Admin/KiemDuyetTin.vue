<template>
  <div class="review-page">


    <div class="page-header">
      <div>
        <h1>Kiểm duyệt tin đăng</h1>
        <p>
          Xem xét kỹ thông tin phòng trọ trước khi cho phép hiển thị lên ứng dụng
        </p>
      </div>

      <div class="header-right">
        <button class="notification-btn">
          🔔
        </button>

        <div class="new-post">
          Hôm nay: +24 tin mới
        </div>
      </div>
    </div>

   
    <div class="review-content" v-if="selectedRoom">

      
      <div class="pending-section">

        <h2>
          Danh sách chờ duyệt
          <span>({{ pendingRooms.length }} tin)</span>
        </h2>

        <div
          v-for="room in pendingRooms"
          :key="room.id"
          class="pending-card"
          :class="{ active: selectedRoom.id === room.id }"
          @click="selectRoom(room)"
        >

          <div class="card-top">
            <span class="room-type">
              {{ room.type }}
            </span>

            <span class="time">
              {{ room.time }}
            </span>
          </div>

          <h3>
            {{ room.title }}
          </h3>

          <div class="price">
            {{ room.price }} đ/tháng
          </div>

        </div>

      </div>


  
      <div class="detail-section">

        <!-- HEADER CHI TIẾT -->
        <div class="detail-header">

          <div>
            <h2>
              Chi tiết tin kiểm duyệt #{{ selectedRoom.id }}
            </h2>

            <p>
              Đăng bởi đối tác lúc {{ selectedRoom.postTime }}
            </p>
          </div>

          <span class="waiting">
            Đang chờ kiểm duyệt
          </span>

        </div>


       
        <div class="room-images">

          <img
            :src="selectedRoom.images[0]"
            class="main-image"
            alt="Ảnh phòng"
          />

          <div class="small-images">

            <img
              :src="selectedRoom.images[1]"
              alt="Ảnh phòng"
            />

            <img
              :src="selectedRoom.images[2]"
              alt="Ảnh phòng"
            />

          </div>

        </div>


      
        <div class="room-info">

          <div class="info-item">
            <span>GIÁ THUÊ</span>

            <strong class="red">
              {{ selectedRoom.price }} đ/tháng
            </strong>
          </div>

          <div class="info-item">
            <span>DIỆN TÍCH</span>

            <strong>
              {{ selectedRoom.area }} m²
            </strong>
          </div>

          <div class="info-item">
            <span>ĐẶT CỌC</span>

            <strong>
              {{ selectedRoom.deposit }}
            </strong>
          </div>

        </div>


   
        <div class="description">

          <label>NỘI DUNG MÔ TẢ</label>

          <p>
            {{ selectedRoom.description }}
          </p>

        </div>



        <div class="owner-box">

          <div>

            <label>THÔNG TIN CHỦ TRỌ</label>

            <div class="owner-info">

              <img
                :src="selectedRoom.owner.avatar"
                alt="Chủ trọ"
              />

              <div>
                <strong>
                  {{ selectedRoom.owner.name }}
                </strong>

                <span>
                  SĐT: {{ selectedRoom.owner.phone }}
                </span>
              </div>

            </div>

          </div>

          <div class="reputation">
            <strong>Chủ trọ uy tín</strong>
            <span>{{ selectedRoom.owner.posts }} tin đã đăng</span>
          </div>

        </div>



        <div class="reject-box">

          <label>
            Lý do từ chối kiểm duyệt
            <span>(Yêu cầu khi nhấn Từ chối)</span>
          </label>

          <textarea
            v-model="rejectReason"
            placeholder="Nhập lý do chi tiết (Ví dụ: Ảnh phòng mờ không rõ nét, mô tả thiếu thông tin tiền cọc...)"
          ></textarea>

        </div>


    
        <div class="action-buttons">

          <button
            class="reject-btn"
            @click="rejectRoom"
          >
            Từ chối duyệt
          </button>

          <button
            class="approve-btn"
            @click="approveRoom"
          >
            Phê duyệt tin đăng
          </button>

        </div>

      </div>

    </div>


    
    <transition name="toast">

      <div
        v-if="message"
        class="toast-message"
        :class="messageType"
      >
        {{ message }}
      </div>

    </transition>

  </div>
</template>


<script>
export default {

  name: "KiemDuyetTin",

  data() {
    return {

      rejectReason: "",

      message: "",

      messageType: "success",

      rooms: [

        {
          id: 2890,

          type: "CĂN HỘ STUDIO",

          title: "Căn hộ Full nội thất 28m2 trung tâm Quận 1",

          price: "6.500.000",

          time: "10 phút trước",

          postTime: "10:42 sáng hôm nay",

          area: 28,

          deposit: "1 Tháng",

          images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600"
          ],

          description:
            "Căn hộ dịch vụ cao cấp, đầy đủ nội thất chỉ cần xách vali vào ở. Ban công view sông siêu thoáng mát, có bếp nấu ăn riêng biệt không sợ ám mùi phòng ngủ. Giờ giấc tự do, khóa vân tay, camera an ninh 24/7. Miễn phí phí quản lý và dọn dẹp phòng 2 lần/tuần.",

          owner: {
            name: "Nguyễn Văn A",
            phone: "090 1234 567",
            avatar:
              "https://randomuser.me/api/portraits/men/32.jpg",
            posts: 24
          }

        },

        {
          id: 2891,

          type: "PHÒNG TRỌ GHÉP",

          title: "Tìm nam ở ghép phòng trọ rộng có gác lửng",

          price: "1.800.000",

          time: "1 giờ trước",

          postTime: "09:35 sáng hôm nay",

          area: 22,

          deposit: "1 Tháng",

          images: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
          ],

          description:
            "Phòng trọ ghép rộng rãi, có gác lửng, đầy đủ tiện nghi. Khu vực an ninh, gần trường đại học và thuận tiện đi lại.",

          owner: {
            name: "Trần Văn B",
            phone: "091 2345 678",
            avatar:
              "https://randomuser.me/api/portraits/men/45.jpg",
            posts: 12
          }

        }

      ],

      selectedRoom: null

    };
  },


  computed: {

    pendingRooms() {
      return this.rooms;
    }

  },


  mounted() {

    this.selectedRoom = this.rooms[0];

  },


  methods: {

    selectRoom(room) {

      this.selectedRoom = room;

      this.rejectReason = "";

    },


    approveRoom() {

      this.showMessage(
        "Đã phê duyệt tin đăng thành công!",
        "success"
      );

      setTimeout(() => {

        this.rooms = this.rooms.filter(
          room => room.id !== this.selectedRoom.id
        );

        if (this.rooms.length > 0) {

          this.selectedRoom = this.rooms[0];

        } else {

          this.selectedRoom = {
            id: "---",
            type: "",
            title: "Không còn tin đăng chờ duyệt",
            price: "0",
            area: 0,
            deposit: "---",

            images: [
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000",
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
            ],

            description:
              "Hiện tại không còn tin đăng nào chờ kiểm duyệt.",

            owner: {
              name: "---",
              phone: "---",
              avatar:
                "https://randomuser.me/api/portraits/men/1.jpg",
              posts: 0
            }
          };

        }

      }, 700);

    },


    rejectRoom() {

      if (!this.rejectReason.trim()) {

        this.showMessage(
          "Vui lòng nhập lý do từ chối!",
          "error"
        );

        return;

      }


      this.showMessage(
        "Đã từ chối tin đăng!",
        "error"
      );

      setTimeout(() => {

        this.rooms = this.rooms.filter(
          room => room.id !== this.selectedRoom.id
        );

        if (this.rooms.length > 0) {

          this.selectedRoom = this.rooms[0];

        }

        this.rejectReason = "";

      }, 700);

    },


    showMessage(text, type) {

      this.message = text;

      this.messageType = type;

      setTimeout(() => {

        this.message = "";

      }, 2500);

    }

  }

};
</script>


<style scoped>


.review-page {
  min-height: calc(100vh - 70px);
  background: #f4f6f9;
  color: #17233c;
  padding-bottom: 30px;
}




.page-header {
  min-height: 90px;
  padding: 20px 30px;

  background: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e3e7ed;
}

.page-header h1 {
  margin: 0;

  font-size: 25px;
  font-weight: 700;

  color: #17233c;
}

.page-header p {
  margin: 6px 0 0;

  font-size: 13px;

  color: #71809a;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notification-btn {
  width: 42px;
  height: 42px;

  border-radius: 50%;

  border: 1px solid #e1e5eb;

  background: #ffffff;

  cursor: pointer;

  font-size: 17px;

  transition: 0.2s;
}

.notification-btn:hover {
  background: #f1f3f7;
}

.new-post {
  padding: 10px 16px;

  border-radius: 8px;

  background: #eef3ff;

  color: #2563eb;

  font-size: 12px;

  font-weight: 600;
}




.review-content {
  display: grid;

  grid-template-columns: 280px minmax(0, 1fr);

  gap: 22px;

  padding: 24px 30px 30px;

  max-width: 1500px;

  margin: 0 auto;
}




.pending-section {
  min-width: 0;
}

.pending-section h2 {
  margin: 0 0 15px;

  font-size: 16px;

  color: #17233c;
}

.pending-section h2 span {
  color: #71809a;

  font-weight: 500;
}



.pending-card {
  background: #ffffff;

  border: 1px solid #dfe5ee;

  border-radius: 10px;

  padding: 15px 16px;

  margin-bottom: 12px;

  cursor: pointer;

  transition: all 0.2s;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.pending-card:hover {
  border-color: #2563eb;

  transform: translateY(-1px);

  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
}

.pending-card.active {
  border: 2px solid #2563eb;

  padding: 14px 15px;

  background: #f8fbff;
}

.card-top {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 8px;

  margin-bottom: 10px;
}

.room-type {
  font-size: 10px;

  color: #2563eb;

  font-weight: 700;
}

.time {
  font-size: 10px;

  color: #8995a8;

  white-space: nowrap;
}

.pending-card h3 {
  margin: 0;

  font-size: 13px;

  line-height: 1.5;

  font-weight: 600;

  color: #26344c;
}

.price {
  margin-top: 8px;

  color: #ef3340;

  font-size: 13px;

  font-weight: 700;
}




.detail-section {
  background: #ffffff;

  border: 1px solid #e0e6ee;

  border-radius: 12px;

  padding: 22px;

  min-width: 0;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.detail-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 15px;

  margin-bottom: 18px;
}

.detail-header h2 {
  margin: 0;

  font-size: 18px;

  color: #17233c;
}

.detail-header p {
  margin: 5px 0 0;

  color: #8793a7;

  font-size: 11px;
}

.waiting {
  background: #fff6df;

  color: #d98200;

  padding: 7px 12px;

  border-radius: 7px;

  font-size: 10px;

  font-weight: 600;

  white-space: nowrap;
}




.room-images {
  display: grid;

  grid-template-columns: minmax(0, 1fr) 120px;

  gap: 10px;

  height: 280px;

  margin-bottom: 20px;

  overflow: hidden;
}

.main-image {
  width: 100%;

  height: 280px;

  object-fit: cover;

  display: block;

  border-radius: 8px;
}

.small-images {
  display: flex;

  flex-direction: column;

  gap: 10px;

  min-width: 0;
}

.small-images img {
  width: 100%;

  height: 135px;

  object-fit: cover;

  display: block;

  border-radius: 8px;
}




.room-info {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  margin-top: 5px;

  border: 1px solid #edf0f4;

  border-radius: 8px;

  padding: 16px 0;

  background: #fafbfc;
}

.info-item {
  padding: 0 20px;

  border-right: 1px solid #e4e8ed;
}

.info-item:last-child {
  border-right: none;
}

.info-item span {
  display: block;

  color: #7b879a;

  font-size: 9px;

  margin-bottom: 6px;

  font-weight: 600;
}

.info-item strong {
  font-size: 15px;

  color: #26344c;
}

.info-item .red {
  color: #ef3340;
}




.description {
  margin-top: 18px;

  padding-bottom: 16px;

  border-bottom: 1px solid #edf0f4;
}

.description label,
.owner-box label {
  display: block;

  margin-bottom: 8px;

  color: #718099;

  font-size: 10px;

  font-weight: 700;
}

.description p {
  margin: 0;

  font-size: 12px;

  line-height: 1.7;

  color: #26344c;
}




.owner-box {
  margin-top: 16px;

  padding: 14px;

  border-radius: 8px;

  background: #f7f9fc;

  border: 1px solid #edf0f4;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;
}

.owner-info {
  display: flex;

  align-items: center;

  gap: 10px;
}

.owner-info img {
  width: 42px;

  height: 42px;

  border-radius: 50%;

  object-fit: cover;

  border: 2px solid #ffffff;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.owner-info strong {
  display: block;

  font-size: 12px;

  color: #26344c;
}

.owner-info span {
  display: block;

  margin-top: 3px;

  color: #78869b;

  font-size: 10px;
}

.reputation {
  text-align: right;
}

.reputation strong {
  display: block;

  color: #0da875;

  font-size: 11px;
}

.reputation span {
  display: block;

  color: #8490a2;

  font-size: 9px;

  margin-top: 3px;
}




.reject-box {
  margin-top: 16px;

  padding: 12px;

  border: 1px solid #ffb8bd;

  border-radius: 8px;

  background: #fffafa;
}

.reject-box label {
  display: block;

  margin-bottom: 8px;

  color: #ef3340;

  font-size: 10px;

  font-weight: 700;
}

.reject-box label span {
  font-weight: 400;

  color: #8a7a7d;
}

.reject-box textarea {
  width: 100%;

  min-height: 70px;

  resize: vertical;

  box-sizing: border-box;

  border: 1px solid #dfe4ec;

  border-radius: 6px;

  padding: 10px;

  outline: none;

  font-family: inherit;

  font-size: 11px;

  color: #26344c;

  background: #ffffff;
}

.reject-box textarea:focus {
  border-color: #ef3340;

  box-shadow: 0 0 0 2px rgba(239, 51, 64, 0.08);
}




.action-buttons {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 10px;

  margin-top: 16px;
}

.action-buttons button {
  height: 42px;

  border-radius: 7px;

  cursor: pointer;

  font-size: 12px;

  font-weight: 700;

  transition: all 0.2s;
}

.reject-btn {
  background: #ffffff;

  border: 1px solid #ef3340;

  color: #ef3340;
}

.reject-btn:hover {
  background: #fff1f2;
}

.approve-btn {
  background: #10b981;

  border: 1px solid #10b981;

  color: #ffffff;
}

.approve-btn:hover {
  background: #0da875;

  transform: translateY(-1px);
}




.toast-message {
  position: fixed;

  right: 25px;

  bottom: 25px;

  padding: 13px 20px;

  border-radius: 8px;

  color: white;

  font-size: 13px;

  font-weight: 600;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  z-index: 9999;
}

.toast-message.success {
  background: #10b981;
}

.toast-message.error {
  background: #ef4444;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;

  transform: translateY(15px);
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 1100px) {

  .review-content {
    grid-template-columns: 240px minmax(0, 1fr);

    padding-left: 20px;

    padding-right: 20px;
  }

  .room-images {
    grid-template-columns: minmax(0, 1fr) 100px;

    height: 240px;
  }

  .main-image {
    height: 240px;
  }

  .small-images img {
    height: 115px;
  }

}


@media (max-width: 900px) {

  .review-content {
    grid-template-columns: 1fr;
  }

  .pending-section {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 10px;
  }

  .pending-section h2 {
    grid-column: 1 / -1;

    margin-bottom: 5px;
  }

}


@media (max-width: 600px) {

  .page-header {
    padding: 18px;

    align-items: flex-start;

    gap: 15px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .header-right {
    display: none;
  }

  .review-content {
    padding: 15px;
  }

  .pending-section {
    display: block;
  }

  .room-images {
    grid-template-columns: 1fr;

    height: auto;
  }

  .main-image {
    height: 220px;
  }

  .small-images {
    display: grid;

    grid-template-columns: 1fr 1fr;

    height: 100px;
  }

  .small-images img {
    height: 100px;
  }

  .room-info {
    grid-template-columns: 1fr;
  }

  .info-item {
    border-right: none;

    border-bottom: 1px solid #e4e8ed;

    padding: 12px 15px;
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .owner-box {
    align-items: flex-start;

    flex-direction: column;
  }

  .reputation {
    text-align: left;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

}
</style>