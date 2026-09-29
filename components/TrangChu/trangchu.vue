<template>
  <div class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active position-relative">
        <img src="https://img5.thuthuatphanmem.vn/uploads/2022/01/13/anh-da-nang-ve-dem-2k_024459274.jpg"
          style="height: 580px; width: 100%" class="img-fluid" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h1 class="text-white"><b>Ngân Hàng Nhà Trọ</b></h1>
          <h5 class="text-white">
            Hệ thống tìm Phòng trọ uy tín, nhanh chóng và tiện lợi.
          </h5>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row mt-5"></div>
    <h2 class="mt-2"><b>Các Phòng Trọ Được Đánh Giá Cao:</b></h2>
    <div class="row mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-6" v-for="(value, index) in danhsanhphong" :key="value.id">
            <div class="card mt-2 img-top-rounded" style="width: auto; height: 538px">
              <div class="position-relative">
                <div class="position-absolute bottom-0 end-0">
                  <button @click="$router.push('/thue-phong')" :class="buttonColor(value.status)" class="btn rounded-3 btn-sm">
                    {{ buttonText(value.status) }}
                  </button>
                </div>
                <img :src="value.img" alt="" class="img-item img-top-rounded" style="width: 100%; height: 285px" />
              </div>
              <div class="card-body">
                <h5>
                  <i class="fa-solid fa-location-dot text-danger"></i>{{ value.location0 }}
                </h5>
                <ul>
                  <div class="row d-flex text-nowrap">
                    <div class="col">
                      <ul class="list-unstyled">
                        <li v-for="(item, i) in value.amenities.slice(0, 3)" :key="i">
                          ✔ {{ item }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
                <div style="height: 38px;">
                  <i class="fa-solid fa-house-chimney me-1"></i>{{ value.location0 }}, {{ value.location1 }}, {{
                  value.location2 }}
                </div>
                <div class="row mt-1">
                  <div class="col-lg-3 text-end">Đánh giá: {{ value.star }}</div>
                  <div class="col-lg-9">
                    <div class="">
                      <i v-for="i in Math.floor(value.star)" :key="'full-' + i"
                        class="fa-solid fa-star text-warning"></i>
                      <i v-if="value.star % 1 !== 0" class="fa-solid fa-star-half-stroke text-warning"></i>
                      <i v-for="i in 5 - Math.ceil(value.star)" :key="'empty-' + i"
                        class="fa-regular fa-star text-warning"></i>
                      <span>({{ value.sum_danhgia }})</span>
                    </div>
                  </div>
                </div>
                <div class="row mt-1 d-flex align-items-center">
                  <div class="col-lg-6">
                    <div v-if="value.rental?.byMonth">
                      Tháng:
                      <span class="text-danger">
                        {{ value.rental?.price_month?.toLocaleString() }}
                      </span>
                      đ
                    </div>
                  </div>
                  <div class="col-lg-6 text-end mb-0">
                    <h5>
                      <button v-on:click="them_data_model(value)" data-bs-toggle="modal" data-bs-target="#chitiet"
                        class="btn btn-outline-primary">
                        Chi tiết
                      </button>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mt-2">
        <div class="card">
          <div class="card-body">
            <h5 class="text-center">Tại sao nên chọn TroGo?</h5>
            <ul>
              <li>Thông tin trọ hàng đầu - uy tín</li>
              <li>Được nhiều người tin dùng</li>
              <li>Nhanh chóng - hiệu quả</li>
            </ul>
            <div class="row mt-3">
              <div class="col-lg-6">
                <div class="text-center">
                  <p><i class="fa-solid fa-user fa-3x text-info"></i></p>
                  <strong>1.000+</strong>
                  <br>
                  <span>Người dùng</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="text-center">
                  <p><i class="fa-solid fa-award fa-3x text-warning"></i></p>
                  <strong>1.000+</strong>
                  <br>
                  <span>Đánh giá</span>
                </div>
              </div>
            </div>
            <div class="row m-2 text-center">
              <router-link to="/tim-kiem"><button class="btn btn-primary">Tìm phòng ngay!</button></router-link>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5>Có thể bạn quan tâm</h5>
            <div class="row mt-2">
              <div class="col-lg-3">
                <a
                  href="https://thuvienphapluat.vn/cong-dong-dan-luat/co-lay-lai-duoc-tien-coc-khi-da-dat-coc-thue-tro-nhung-chua-o-199665.html">
                  <img src="https://img.thuephongtro.com/images/uploads/tien-dat-coc.jpg" class="img-fluid"
                    style="height: 60px; object-fit: cover" />
                </a>
              </div>
              <div class="col-lg-9">
                <a
                  href="https://thuvienphapluat.vn/cong-dong-dan-luat/co-lay-lai-duoc-tien-coc-khi-da-dat-coc-thue-tro-nhung-chua-o-199665.html">
                  <span class="news-publish">05/12/2024</span>
                  <h6 class="news-title">
                    Có lấy lại được tiền cọc khi đã đặt cọc thuê trọ nhưng chưa ở?
                  </h6>
                </a>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-3">
                <a href="https://host.tromoi.com/blog/kinh-nghiem/kinh-nghiem-quan-ly-tro">
                  <img src="https://img.thuephongtro.com/images/uploads/20200309134037-bskpl.jpg" class="img-fluid"
                    style="height: 60px; object-fit: cover" />
                </a>
              </div>
              <div class="col-lg-9">
                <a href="https://host.tromoi.com/blog/kinh-nghiem/kinh-nghiem-quan-ly-tro">
                  <span class="news-publish">09/03/2020</span>
                  <h6 class="news-title">
                    Những điều cần lưu ý trong việc quản lý nhà trọ
                  </h6>
                </a>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-3">
                <a
                  href="https://vietnambiz.vn/ho-kinh-doanh-cho-thue-phong-tro-ke-khai-nop-thue-ra-sao-2026126162321328.htm">
                  <img src="https://img.thuephongtro.com/images/uploads/20200309133059-1nvvd.jpg" class="img-fluid"
                    style="height: 60px; object-fit: cover" />
                </a>
              </div>
              <div class="col-lg-9">
                <a
                  href="https://vietnambiz.vn/ho-kinh-doanh-cho-thue-phong-tro-ke-khai-nop-thue-ra-sao-2026126162321328.htm">
                  <span class="news-publish">09/03/2020</span>
                  <h6 class="news-title">
                    {Chia sẻ} Kinh doanh cho thuê phòng trọ có phải đóng thuế gì hay
                    không?
                  </h6>
                </a>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-3">
                <a
                  href="https://thuephongtro.com/kinh-nghiem/can-than-khi-di-tim-thue-phong-tro-nha-tro-voi-sinh-vien-moi-p28123.html">
                  <img src="https://img.thuephongtro.com/images/uploads/20200309120917-p4ard.jpg" class="img-fluid"
                    style="height: 60px; object-fit: cover" />
                </a>
              </div>
              <div class="col-lg-9">
                <a
                  href="https://thuephongtro.com/kinh-nghiem/can-than-khi-di-tim-thue-phong-tro-nha-tro-voi-sinh-vien-moi-p28123.html">
                  <span class="news-publish">09/03/2020</span>
                  <h6 class="news-title">
                    Cẩn thận khi đi tìm thuê phòng trọ, nhà trọ với sinh viên mới
                  </h6>
                </a>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-3">
                <a
                  href="https://timnhatro.vn/blog/nhung-dieu-ban-nen-biet-de-bao-dam-quyen-loi-khi-di-thue-phong-tro.html">
                  <img src="https://img.thuephongtro.com/images/uploads/20200309120431-utm0e.jpg" class="img-fluid"
                    style="height: 60px; object-fit: cover" />
                </a>
              </div>
              <div class="col-lg-9">
                <a
                  href="https://timnhatro.vn/blog/nhung-dieu-ban-nen-biet-de-bao-dam-quyen-loi-khi-di-thue-phong-tro.html">
                  <span class="news-publish">09/03/2020</span>
                  <h6 class="news-title">
                    Những điều bạn nên biết để bảo đảm quyền lợi khi đi thuê phòng trọ
                  </h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <img
          src="https://www.easyridersvietnam.com/wp-content/uploads/2023/03/things-to-do-in-da-nang-golden-bridge-bana-hills.jpg"
          class="rounded-5" style="width: 100%; height: 400px" alt="" />
      </div>
    </div>
    <hr />
    <div class="row align-items-center">
      <div class="col-lg-6">
        <img src="https://imgcdn.stablediffusionweb.com/2026/1/11/16838bb5-d8d0-4f58-8226-f56190fc413e.webp"
          class="rounded-5 img-fluid" style="max-width: 640px; height: auto" alt="" />
      </div>
      <div class="col-lg-6">
        <h2 class=""><strong>ƯU THẾ DẪN ĐẦU CỦA TroGo</strong></h2>
        <p>
          <strong>TroGo</strong> đa dạng và phong phú về tin đăng phòng trọ, giúp
          kết nối nhu cầu tìm kiếm nơi ở của khách hàng với hàng chục nghìn bài đăng chất
          lượng. Website với hơn <strong>100.000</strong> tin đăng và hơn
          <strong>1 triệu</strong>
          lượt truy cập hàng tháng, chúng tôi cam kết mang lại trải nghiệm tốt nhất cho cả
          người thuê và chủ nhà.
        </p>
      </div>
    </div>
    <hr class="mt-4" />
    <div class="row mt-4 align-items-center">
      <div class="col-lg-5">
        <h4>LỢI THẾ CẠNH TRANH VƯỢT TRỘI</h4>
        <ul>
          <li>
            <strong>Dữ liệu phong phú, cập nhật liên tục:</strong> Từ nhà nguyên căn đến
            căn hộ &amp; phòng trọ, <strong>TroGo</strong> luôn cung cấp nguồn dữ
            liệu lớn nhất và mới nhất, đáp ứng nhu cầu đa dạng của người dùng.
          </li>
          <li>
            <strong>Chức năng tìm kiếm thông minh:</strong> Người dùng có thể dễ dàng lọc
            thông tin một cách chi tiết và nhanh chóng nhất.
          </li>
          <li>
            <strong>Quản lý tin đăng chuyên nghiệp</strong>:
            <strong>TroGo</strong> tích hợp các công cụ giúp người dùng quản lý bài
            viết dễ dàng, từ việc đăng tin, chỉnh sửa, cập nhật tin, đến xóa tin đăng để
            thu hút nhiều người xem hơn.
          </li>
        </ul>
        <h4>DỊCH VỤ ĐẶC BIỆT DÀNH RIÊNG CHO CHỦ NHÀ</h4>
        <div>
          <label><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span>Chụp ảnh Nhà - Căn hộ - Phòng trọ chất lượng</span></label>
        </div>
        <div>
          <label><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span>Quay Clip bên trong & bên ngoài phòng trọ</span></label>
        </div>
        <div>
          <label><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span>Làm 360 cho phòng trọ của bạn</span></label>
        </div>
      </div>
      <div class="col-lg-1">
        <div class="vertical-line"></div>
      </div>
      <div class="col-lg-6">
        <div class="row">
          <div class="col-12">
            <img src="https://kenhhomestay.com/wp-content/uploads/2022/06/che-Hoi-An-4.jpg" class="img-top-rounded"
              style="width: 620px; height: 320px" alt="" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <img src="https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-cau-Rong.jpg"
              class="img-bottom-left-rounded" style="width: 310px; height: 320px" alt="" />
            <img src="https://static.vinwonders.com/production/nhay-du-o-da-nang-1.jpg" class="img-bottom-right-rounded"
              style="width: 310px; height: 320px" alt="" />
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-4" />
    <div class="row mt-4">
      <div class="col">
        <h3>CAM KẾT CỦA TroGo</h3>
        <label>Chúng tôi không chỉ đơn thuần là một trang website đăng tin mà còn là một đối
          tác chiến lược giúp chủ nhà và giúp người thuê tiếp cận nhanh chóng, dễ dàng.
          <b>TroGo</b> mong muốn xây dựng một cộng đồng vững mạnh, nơi mọi người có
          thể tìm thấy những lựa chọn phù hợp cho không gian sống của mình một cách dễ
          dàng và hiệu quả.</label>
        <label for="">Hãy cùng <b>TroGo</b> tạo nên một nền tảng vững mạnh, không chỉ để đăng
          tin mà còn là nơi bạn có thể kết nối và chia sẻ thông tin hữu ích về bất động
          sản cho thuê.</label>
      </div>
    </div>
    <!-- modal chi tiết -->
    <div class="modal fade" id="chitiet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
              Chi Tiết Phòng
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6">
                <div for="">Tên phòng:</div>
                <input disabled v-model="Arraydata.productName" class="form-control bg-light" type="text" />
              </div>
              <div class="col-lg-6">
                <div class="col-lg-6">Mã phòng:</div>
                <input disabled v-model="Arraydata.productId" class="form-control bg-light" type="text" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <div class="col-lg-6">Loại phòng:</div>
                <input disabled v-model="Arraydata.categoryName" class="form-control bg-light" type="text" />
              </div>
              <div class="col-lg-6">
                <div class="col-lg-6">Mã loại:</div>
                <input disabled v-model="Arraydata.categoryId" class="form-control bg-light" type="text" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <div class="col-lg-6">Diện tích:</div>
                <input disabled v-model="Arraydata.area" class="form-control bg-light" type="text" />
              </div>
              <div class="col-lg-6">
                <div class="col-lg-6">Tình trạng nội thất:</div>
                <input disabled v-model="Arraydata.furnitureStatus" class="form-control bg-light" type="text" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <div>Chủ sở hữu:</div>
                <input disabled v-model="Arraydata.supplierName" class="form-control bg-light" type="text" />
              </div>
              <div class="col-lg-6">
                <div>Số điện thoại:</div>
                <input disabled v-model="Arraydata.phone" class="form-control bg-light" type="text" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <div>Địa chỉ:</div>
                <input disabled v-model="Arraydata.location0" class="form-control bg-light" type="text" />
              </div>
              <div class="col-lg-3">
                <div>Quận/Huyện:</div>
                <input disabled v-model="Arraydata.location1" class="form-control bg-light" type="text" />
              </div>
              <div class="col-lg-3">
                <div>Thành Phố:</div>
                <input disabled v-model="Arraydata.location2" class="form-control bg-light" type="text" />
              </div>
            </div>
            <div class="row mt-2 d-flex align-items-center">
              <div class="col-lg-3">
                <div>Giá thuê:</div>
                <div class="ms-3">
                  <div v-if="Arraydata.rental?.byMonth">
                    Tháng: {{ Arraydata.rental.price_month?.toLocaleString() }} đ
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div>Trạng thái:</div>
                <input disabled v-model="Arraydata.status" class="form-control bg-light" />
              </div>
              <div class="col-lg-5">
                <div>Được đánh giá (/5):</div>
                <input disabled v-model="Arraydata.star" class="form-control bg-light" type="text" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div>Tiện ích:</div>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="(item, i) in Arraydata.amenities" :key="i" class="badge bg-secondary fs-6 py-2">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div>Ghi chú:</div>
                <textarea disabled v-model="Arraydata.notes" class="form-control bg-light" name="" id=""></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <div>
              <button class="btn" :class="buttonColor(Arraydata.status)" :disabled="Arraydata.status !== 'Còn phòng'">
                {{ buttonText(Arraydata.status) }}
              </button>
            </div>
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
          area: "",
          furnitureStatus: "",
          location0: "",
          location1: "",
          location2: "",
          status: "",
          amenities: ["", "", "", "", ""],
          rental: {byMonth: false, price_month: ""},
          supplierName: "",
          phone: "",
          star: "",
          sum_danhgia: "",
          notes: "",
        },
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
          rental: {...value.rental},
          amenities: [...value.amenities],
          supplierName: value.supplierName,
          phone: value.phone,
          star: value.star,
          sum_danhgia: value.sum_danhgia,
          notes: value.notes,
        };
      },
      buttonText(status) {
        if (status === "Còn phòng") return "Thuê ngay";
        if (status === "Đang sửa chữa") return "Đang sửa chữa";
        return "Hết phòng";
      },
      buttonColor(status) {
        if (status === "Còn phòng") return "btn-primary";
        if (status === "Đang sửa chữa") return "btn-warning";
        return "btn-danger";
      },

      loadData() {
        this.house = JSON.parse(localStorage.getItem("database_rooms")) || [];
      },
    },
    computed: {
      danhsanhphong() {
        return this.house.slice(0, 4);
      },
    },
    mounted() {
      this.loadData();
    },
  };
</script>
<style>
  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    .alert-top {
      width: 90%;
    }
  }

  @media (max-width: 991px) {
    .vertical-line {
      display: none;
    }
  }

  .img-top-rounded {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    object-fit: cover;
  }

  .img-bottom-left-rounded {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 0;
    object-fit: cover;
  }

  .img-bottom-right-rounded {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 30px;
    object-fit: cover;
  }
</style>