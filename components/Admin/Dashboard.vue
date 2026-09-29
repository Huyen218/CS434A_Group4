<template>
  <div class="container">
    <h2><b>Dashboard</b></h2>
    <h1 class="text-secondary">
      <b>Xin chào, chào mừng trở lại </b> <i class="fa-solid fa-hand text-warning"></i>
    </h1>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <div class="" style="height: 50px">
              <div class="row align-content-center" >
              <div class="col-lg-7">
                Năm hiện tại:
                <h5>2026-2027</h5>
              </div>
              <div class="col-lg-5 text-end">
                <h5 class="text-success">Đang hoạt động</h5>
              </div>
            </div>
            </div>
            <div class="row mt-2">
              <div class="col">Theo dõi tiến độ phòng</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <div class="" style="height: 50px">
              <div class="row align-content-center">
                <div class="col">
                  Tổng phòng:
                  <h5>
                    <b>{{ tong_rooms }}</b>
                  </h5>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">Tổng số phòng trong hệ thống</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-6">
        <div class="card" style="height:110px;">
          <div class="card-body">
            <div class="" style="height: 50px">
              <div class="row align-content-center">
                <div class="col">
                  Tổng số tài khoản:
                  <h5>
                    <b>{{ tong_user }}</b>
                  </h5>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">Tổng số tài khoản trong hệ thống</div>
            </div>
          </div>
        </div>
        <BieuDoUser :users="users" />
      </div>
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-6">
            <div class="card">
          <div class="card-body">
            <div class="" style="height: 50px">
              <div class="row align-content-center">
                <div class="col">
                  Phòng đang hoạt động:
                  <h5>
                    <b>{{ room_active }}</b>
                  </h5>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">Tổng số phòng đang hoạt động</div>
            </div>
          </div>
        </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
          <div class="card-body">
            <div class="" style="height: 50px">
              <div class="row align-content-center">
                <div class="col">
                  Phòng đang dừng hoạt động:
                  <h5>
                    <b>{{ room_inactive }}</b>
                  </h5>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">Tổng số phòng đang dừng hoạt động</div>
            </div>
          </div>
        </div>
          </div>
        </div>
        <BieuDoTTPhong :rooms="rooms" />
      </div>
    </div>
  </div>
</template>

<script>
import BieuDoTTPhong from "../Admin/BieuDo/BieuDoTTPhong.vue";
import BieuDoUser from "../Admin/BieuDo/BieuDoUser.vue";

export default {
  name: "AdminDashboard",
  components: {
    BieuDoTTPhong,
    BieuDoUser,
  },
  data() {
    return {
      users: [],
      tong_user: 0,
      user_active: 0,
      user_locked: 0,

      rooms: [],
      tong_rooms: 0,
      room_active: 0,
      room_inactive: 0,
    };
  },
  mounted() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    this.tong_user = users.length;
    this.user_active = users.filter((u) => u.active).length;
    this.user_locked = users.filter((u) => !u.active).length;

    this.users = users;

    this.rooms = JSON.parse(localStorage.getItem("database_rooms")) || [];
    this.tong_rooms = this.rooms.length;
    this.room_active = this.rooms.filter((r) => r.status === "Còn phòng").length;

    this.room_inactive = this.rooms.filter((r) => r.status !== "Còn phòng").length;
  },
};
</script>
