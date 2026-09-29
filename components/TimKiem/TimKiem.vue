<template>
    <div class="container">
        <div class="row g-2 justify-content-center">
            <div class="col-lg-10 col-md-10 col-12">
                <div class="card shadow-lg rounded-4 border-0 " style="background: linear-gradient(135deg, rgb(95, 39, 205) 0%, rgb(84, 160, 255) 26%, 
                rgb(78, 205, 196) 56%, rgb(87, 255, 179) 78%, rgb(87, 255, 106) 100%);">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-9">
                                <input type="text" class="form-control rounded-3" v-model="loc_timkiem"
                                    placeholder="Nhập địa chỉ cần tìm kiếm...">
                            </div>
                            <div class="col-lg-3">
                                <button @click="ap_dung_tim_kiem" class="btn btn-primary w-100 rounded-3">
                                    <i class="fa-solid fa-magnifying-glass"></i>Tìm kiếm</button>
                            </div>
                        </div>
                        <div class="row mt-2 align-items-center">
                            <div class="col-lg-4">
                                <select class="form-control rounded-3" v-model="loc_quan">
                                    <option value="">Chọn Quận/Huyện</option>
                                    <option value="Quận Hải Châu">Quận Hải Châu</option>
                                    <option value="Quận Thanh Khê">Quận Thanh Khê</option>
                                    <option value="Quận Liên Chiểu">Quận Liên Chiểu</option>
                                    <option value="Quận Ngũ Hành Sơn">Quận Ngũ Hành Sơn</option>
                                    <option value="Quận Sơn Trà">Quận Sơn Trà</option>
                                    <option value="Quận Cẩm Lệ">Quận Cẩm Lệ</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-control rounded-3" v-model="loc_dientich">
                                    <option value="">Diện tích</option>
                                    <option v-for="range in khoang_dientich" :key="range.label" :value="range">
                                        {{range.label}}</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-control rounded-3" v-model="loc_tinhtrangphong">
                                    <option value="">Tình trạng nội thất</option>
                                    <option value="Nội thất cao cấp">Nội thất cao cấp</option>
                                    <option value="Nội thất cơ bản">Nội thất cơ bản</option>
                                    <option value="Nội thất trống">Nội thất trống</option>
                                    <option value="Nội thất đầy đủ">Nội thất đầy đủ</option>
                                </select>
                            </div>
                            <div class="col-lg-2">
                                <button class="btn btn-outline-dark rounded-3 btn-sm w-100" @click="
                                loc_timkiem='';
                                loc_quan='';
                                loc_dientich='';
                                loc_tinhtrangphong='';
                                loc_applied={ timkiem:'', quan:'', dientich:'', tinhtrang:''}
                                ">Đặt lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-4">
                <div class="card rounded-4">
                    <div class="card-body">
                        <div class="row mt-1">
                            <div class="col-lg-6">
                                <h5><i class="fa-solid fa-filter"></i> Lọc Tìm Kiếm</h5>
                            </div>
                            <div class="col-lg-6 text-end">
                                <button class="btn btn-secondary btn-sm" @click="
                                this.loc_loaiphong = [];
                                this.loc_saodanhgia = [];
                                this.loc_gia_thang = [];
                                ">Xóa lọc
                                </button>
                            </div>
                        </div>
                        <hr>
                        <h6><b>Lọc theo loại phòng</b></h6>
                        <template v-for="(value,index) in Loc_checkbox_loaiphong_trungnhau" :key="value">
                            <div class="input-group mb-3">
                                <div class="input-group-text">
                                    <input class="form-check-input mt-0 me-1" type="checkbox" v-model="loc_loaiphong"
                                        :value="value" aria-label="Radio button for following text input" />
                                </div>
                                <input type="text" class="form-control bg-light" disabled v-bind:value="value">
                            </div>
                        </template>
                        <hr class="mt-4">
                        <h6><b>Lọc theo giá Tháng</b></h6>
                        <template v-for="(value,index) in khoang_gia_thang" :key="value">
                            <div class="input-group mb-3">
                                <div class="input-group-text">
                                    <input class="form-check-input mt-0 me-1" type="checkbox" v-model="loc_gia_thang"
                                        :value="value" aria-label="Radio button for following text input" />
                                </div>
                                <div class="form-control bg-light d-flex align-items-center gap-1">
                                    <span>{{ value.min }}</span> đ
                                    <span>- {{ value.max }}</span> đ
                                </div>
                            </div>
                        </template>
                        <hr class="mt-4">
                        <h6><b>Lọc theo số sao</b></h6>
                        <template v-for="(value,index) in khoang_sao" :key="value">
                            <div class="input-group mb-3">
                                <div class="input-group-text">
                                    <input class="form-check-input mt-0 me-1" type="checkbox" v-model="loc_saodanhgia"
                                        :value="value" aria-label="Radio button for following text input" />
                                </div>
                                <div class="form-control bg-light d-flex align-items-center gap-1">
                                    <span>{{ value.max }}</span> <i class="fa-solid fa-star text-warning"></i>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card rounded-4 border-0 shadow-sm mb-3">
                    <div class="card-body">
                        <h5 class="fw-bold mb-4">Phòng trọ cho thuê Đà Nẵng giá tốt</h5>
                        <div v-for="(value,index) in paginatedData" :key="value.id"
                            class="row mb-4 hostel-item pb-3 border-bottom">
                            <div class="col-md-5">
                                <div class="position-relative">
                                    <div class="position-absolute bottom-0 start-40">
                                        <button :class="buttonColor(value.status)"
                                            class="btn rounded-3 btn-sm">{{buttonText(value.status)}}</button>
                                    </div>
                                    <img :src="value.img" class="img-fluid rounded-3 w-100" style="height: 200px;">
                                </div>
                            </div>
                            <div class="col-md-7">
                                <h6 class="fw-bold mt-3">
                                    Nhà trọ tại {{value.location0}}
                                </h6>
                                <p>
                                <div class=" text-danger fw-bold fs-5 mb-1">
                                    <span v-if="value.rental.byMonth">
                                        {{ value.rental.price_month?.toLocaleString() }} đ/Tháng
                                    </span>
                                </div>
                                </p>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="badge bg-light text-dark border me-2">{{value.categoryName}}</span>
                                    <small class="text-muted"><i class="fa-solid fa-location-dot"></i>
                                        {{value.location1}}</small>
                                </div>
                                <div class="mt-4">
                                    <text class="text-muted  text-truncate-2">{{value.notes}}</text>
                                </div>
                                <div class="row d-flex align-items-center mt-2">
                                    <div class="col-lg-6">
                                        <div class="">
                                            <i v-for="i in Math.floor(value.star)" :key="'full-'+i"
                                                class="fa-solid fa-star text-warning"></i>
                                            <i v-if="value.star %1!==0"
                                                class="fa-solid fa-star-half-stroke text-warning"></i>
                                            <i v-for="i in 5- Math.ceil(value.star)" :key="'empty-' +i"
                                                class="fa-regular fa-star text-warning"></i>
                                            <span>({{value.sum_danhgia}})</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 text-end">
                                        <button v-on:click="them_data_model(value)" data-bs-toggle="modal"
                                            data-bs-target="#danhgia"
                                            class="btn btn-sm btn-warning px-3 rounded-pill me-3">
                                            Đánh giá</button>
                                        <button v-on:click="them_data_model(value)" data-bs-toggle="modal"
                                            data-bs-target="#chitiet"
                                            class="btn btn-sm btn-outline-primary px-3 rounded-pill">Chi
                                            tiết</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="currentPage--">«</button>
                    </li>

                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: page === currentPage }">
                        <button class="page-link" @click="currentPage = page">
                            {{ page }}
                        </button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button class="page-link" @click="currentPage++">»</button>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- modal chi tiết -->
        <div class="modal fade" id="chitiet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Chi Tiết Phòng</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div for="">Tên phòng:</div>
                                <input disabled v-model="Arraydata.productName" class="form-control bg-light"
                                    type="text">
                            </div>
                            <div class="col-lg-6">
                                <div class="col-lg-6">Mã phòng:</div>
                                <input disabled v-model="Arraydata.productId" class="form-control bg-light" type="text">
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-lg-6">
                                <div class="col-lg-6">Loại phòng:</div>
                                <input disabled v-model="Arraydata.categoryName" class="form-control bg-light"
                                    type="text">
                            </div>
                            <div class="col-lg-6">
                                <div class="col-lg-6">Mã loại:</div>
                                <input disabled v-model="Arraydata.categoryId" class="form-control bg-light"
                                    type="text">
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-lg-6">
                                <div class="col-lg-6">Diện tích:</div>
                                <input disabled v-model="Arraydata.area" class="form-control bg-light" type="text">
                            </div>
                            <div class="col-lg-6">
                                <div class="col-lg-6">Tình trạng nội thất:</div>
                                <input disabled v-model="Arraydata.furnitureStatus" class="form-control bg-light"
                                    type="text">
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-lg-6">
                                <div>Chủ sở hữu:</div>
                                <input disabled v-model="Arraydata.supplierName" class="form-control bg-light"
                                    type="text">
                            </div>
                            <div class="col-lg-6">
                                <div>Số điện thoại:</div>
                                <input disabled v-model="Arraydata.phone" class="form-control bg-light" type="text">
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-lg-6">
                                <div>Địa chỉ:</div>
                                <input disabled v-model="Arraydata.location0" class="form-control bg-light" type="text">
                            </div>
                            <div class="col-lg-3">
                                <div>Quận/Huyện:</div>
                                <input disabled v-model="Arraydata.location1" class="form-control bg-light" type="text">
                            </div>
                            <div class="col-lg-3">
                                <div>Thành Phố:</div>
                                <input disabled v-model="Arraydata.location2" class="form-control bg-light" type="text">
                            </div>
                        </div>
                        <div class="row mt-2 d-flex align-items-center">
                            <div class="col-lg-3">
                                <div>Giá thuê:</div>
                                <div class="ms-3">
                                    <div v-if="Arraydata.rental.byMonth">Tháng: {{
                                        Arraydata.rental.price_month?.toLocaleString() }} đ</div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div>Trạng thái:</div>
                                <input disabled v-model="Arraydata.status" class="form-control bg-light">
                            </div>
                            <div class="col-lg-5">
                                <div>Được đánh giá (/5):</div>
                                <input disabled v-model="Arraydata.star" class="form-control bg-light" type="text">
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div>Tiện ích:</div>
                                <div class="d-flex flex-wrap gap-2">
                                    <span v-for="(item, i) in Arraydata.amenities" :key="i"
                                        class="badge bg-secondary fs-6 py-2">
                                        {{ item }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div>Ghi chú:</div>
                                <textarea disabled v-model="Arraydata.notes" class="form-control bg-light" name=""
                                    id=""></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>

                        <div>
                            <button
                                @click="thueNgay"
                                class="btn"
                                :class="buttonColor(Arraydata.status)"
                                :disabled="Arraydata.status !== 'Còn phòng'"
                            >
                                {{ buttonText(Arraydata.status) }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal đánh giá -->
        <div class="modal fade" id="danhgia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-warning">
                <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Đánh Giá Phòng</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-5">
                        <b>Tên phòng:</b> {{ Arraydata.productName }}
                    </div>

                    <div class="col-lg-7">
                        <b>Địa chỉ:</b>
                        {{ Arraydata.location0 }}, {{ Arraydata.location1 }}, {{ Arraydata.location2 }}
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-5">
                        <b>Chủ nhà:</b> {{ Arraydata.supplierName }}
                    </div>

                    <div class="col-lg-7">
                        <b>SĐT:</b> {{ Arraydata.phone }}
                    </div>
                </div>

                <div class="mt-3">
                    <label class="fw-bold">
                        Bạn muốn đánh giá mấy sao? Đánh giá ngay
                    </label>

                    <div class="fs-2 text-warning mt-1">
                        <i
                            v-for="star in 5"
                            :key="star"
                            @click="chonSao(star)"
                            :class="star <= soSao ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                            style="cursor: pointer;"
                        ></i>
                    </div>

                    <div v-if="soSao > 0" class="text-muted">
                        Bạn đã chọn {{ soSao }}/5 sao
                    </div>
                </div>

                <div class="mt-3">
                    <label class="fw-bold">
                        Nội dung đánh giá
                    </label>

                    <textarea
                        v-model="noiDungDanhGia"
                        class="form-control"
                        rows="3"
                        placeholder="Nhập đánh giá của bạn..."
                    ></textarea>
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
                    type="button"
                    class="btn btn-warning text-dark"
                    @click="guiDanhGia"
                >
                    Gửi đánh giá
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
                "house": [],

                Arraydata: {
                    "id": "",
                    "img": "",
                    "productId": "",
                    "productName": "",
                    "sku": "",
                    "categoryId": "",
                    "categoryName": "",
                    "unit": "",
                    "area": 0,
                    "furnitureStatus": "",
                    "location0": "",
                    "location1": "",
                    "location2": "",
                    "status": "",
                    "amenities": ["", "", "", "", ""],
                    "rental": {"byMonth": false, "price_month": 0},
                    "supplierName": "",
                    "phone": "",
                    "star": 0,
                    "sum_danhgia": 0,
                    "notes": ""
                },
                loc_timkiem: "",
                loc_quan: "",
                loc_tinhtrangphong: "",
                loc_dientich: "",
                khoang_dientich: [
                    {label: '0 m2 - 15 m2', min: 0, max: 15},
                    {label: '15 m2 - 30 m2', min: 16, max: 30},
                    {label: '30 m2 - 45 m2', min: 31, max: 45},
                    {label: '45 m2 - 60 m2', min: 46, max: 60},
                    {label: '60 m2 Trở lên', min: 61, max: 200},
                ],
                loc_applied: {
                    timkiem: "",
                    quan: "",
                    tinhtrang: "",
                    dientich: ""
                },
                loc_loaiphong: [],

                loc_gia_thang: [],
                khoang_gia_thang: [
                    {label: '0 đ - 1.000.000 đ', min: 0, max: 1000000},
                    {label: '1.000.000  đ - 2.000.000 đ', min: 1000000, max: 2000000},
                    {label: '2.000.000 đ - 3.000.000 đ', min: 2000000, max: 3000000},
                    {label: '3.000.000 đ Trở lên', min: 3000000, max: 5000000}
                ],

                loc_saodanhgia: [],
                khoang_sao: [
                    {label: '0 - 1', min: 0, max: 1},
                    {label: '1 - 2', min: 1, max: 2},
                    {label: '2 - 3', min: 2, max: 3},
                    {label: '3 - 4', min: 3, max: 4},
                    {label: '4 - 5', min: 4, max: 5}
                ],
                currentPage: 1,
                itemsPerPage: 10,
                soSao: 0,
                noiDungDanhGia: "",
            }
        },
        methods: {
            them_data_model(value) {
                this.Arraydata = {...value};
                this.soSao = 0;
                this.noiDungDanhGia = "";
            },
            chonSao(star) {
    this.soSao = star;
},

guiDanhGia() {
    const user = JSON.parse(localStorage.getItem("userLogin"));

    if (!user) {
        alert("Vui lòng đăng nhập trước khi đánh giá!");
        return;
    }

    if (this.soSao === 0) {
        alert("Vui lòng chọn số sao!");
        return;
    }

    if (!this.noiDungDanhGia.trim()) {
        alert("Vui lòng nhập nội dung đánh giá!");
        return;
    }

    const local = localStorage.getItem("database_rooms");
    const rooms = local ? JSON.parse(local) : [];

    const index = rooms.findIndex(room => room.id === this.Arraydata.id);

    if (index === -1) {
        alert("Không tìm thấy phòng!");
        return;
    }

    const room = rooms[index];

    const oldStar = Number(room.star) || 0;
    const oldCount = Number(room.sum_danhgia) || 0;

    const newCount = oldCount + 1;
    const newStar = ((oldStar * oldCount) + this.soSao) / newCount;

    room.star = Number(newStar.toFixed(1));
    room.sum_danhgia = newCount;

    const review = {
        id: "REVIEW_" + Date.now(),
        roomId: room.id,
        productId: room.productId,
        room: room.productName,
        address: `${room.location0}, ${room.location1}, ${room.location2}`,
        owner: room.supplierName,
        phone: room.phone,
        username: user.username,
        fullname: user.fullname,
        star: this.soSao,
        content: this.noiDungDanhGia.trim(),
        createdAt: new Date().toLocaleString("vi-VN")
    };

    if (!room.reviews) {
        room.reviews = [];
    }

    room.reviews.push(review);

    rooms[index] = room;

    localStorage.setItem("database_rooms", JSON.stringify(rooms));

    let reviews = JSON.parse(localStorage.getItem("database_reviews")) || [];

    reviews.push(review);

    localStorage.setItem("database_reviews", JSON.stringify(reviews));

    this.house = rooms;
    this.Arraydata = { ...room };

    alert("Đánh giá phòng thành công!");

    this.soSao = 0;
    this.noiDungDanhGia = "";

    const modalElement = document.getElementById("danhgia");

    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);

        if (modal) {
            modal.hide();
        }
    }
},
            ap_dung_tim_kiem() {
                this.loc_applied = {
                    timkiem: this.loc_timkiem,
                    quan: this.loc_quan,
                    tinhtrang: this.loc_tinhtrangphong,
                    dientich: this.loc_dientich,
                },
                    this.currentPage = 1;
            },
            buttonText(status) {
                if (status === 'Còn phòng') return 'Thuê ngay';
                if (status === 'Đang sửa chữa') return 'Đang sửa chữa';
                return 'Hết phòng';
            },
            buttonColor(status) {
                if (status === 'Còn phòng') return 'btn-primary';
                if (status === 'Đang sửa chữa') return 'btn-warning';
                return 'btn-danger';
            },
        },
        computed: {
            tim_kiem() {
                let Array_loc_data = this.loc_applied.timkiem ? this.loc_applied.timkiem.toLowerCase().trim() : "";
                return this.house.filter((value) => {
                    const rental = value.rental || {price_month: 0};

                    let search_data =
                        Array_loc_data.length == 0 ||
                        value.productName.toLowerCase().includes(Array_loc_data) ||
                        value.notes.toLowerCase().includes(Array_loc_data) ||
                        value.location0.toLowerCase().includes(Array_loc_data);

                    let search_quan =
                        this.loc_applied.quan === "" || value.location1 === this.loc_applied.quan;

                    let search_dientich =
                        this.loc_applied.dientich === "" ||
                        (Number(value.area) >= this.loc_applied.dientich.min && Number(value.area) <= this.loc_applied.dientich.max);

                    let search_tinhtrangphong =
                        this.loc_applied.tinhtrang === "" || value.furnitureStatus === this.loc_applied.tinhtrang;

                    let search_loaiphong =
                        this.loc_loaiphong.length === 0 || this.loc_loaiphong.includes(value.categoryName);

                    let search_giathang =
                        this.loc_gia_thang.length === 0 || this.loc_gia_thang.some(range => {
                            const price = rental.price_month || 0;
                            return price >= range.min && price <= range.max;
                        });

                    let search_saodanhgia =
                        this.loc_saodanhgia.length === 0 || this.loc_saodanhgia.some(range => {
                            return value.star >= range.min && value.star <= range.max;
                        });

                    return search_data && search_quan && search_dientich && search_tinhtrangphong && search_loaiphong
                        && search_giathang && search_saodanhgia;
                })

            },
            Loc_checkbox_loaiphong_trungnhau() {
                let list_checkbox = new Set();
                this.house.forEach((value, index) => {
                    if (value.categoryName) list_checkbox.add(value.categoryName)
                });
                return Array.from(list_checkbox).sort();
            },
            paginatedData() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                return this.tim_kiem.slice(start, start + this.itemsPerPage);
            },
            totalPages() {
                return Math.ceil(this.tim_kiem.length / this.itemsPerPage);
            },
        },
        mounted() {
            const local = localStorage.getItem('database_rooms');
            this.house = local ? JSON.parse(local) : [];
        }
    }
</script>
<style>
    body {
        padding-top: 150px;
    }
    .star-button {
    cursor: pointer;
    transition: 0.15s;
    }

    .star-button:hover {
    transform: scale(1.15);
    }
</style>