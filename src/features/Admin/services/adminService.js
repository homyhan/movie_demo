import { https } from "../../../services/config"

export const movieList = {
    getMoviesList: (soTrang, maNhom, soPhanTuTrenTrang)=>{
        return https.get("/QuanLyPhim/LayDanhSachPhimPhanTrang",
        {params: {
            maNhom,
            soTrang,
            soPhanTuTrenTrang,
          }})
    },
    postMovie: (data)=>{
        return https.post("/QuanLyPhim/ThemPhimUploadHinh", data);
    },
    deleteMovie: (idFilm)=>{
        return https.delete("/QuanLyPhim/XoaPhim?MaPhim="+idFilm)
    },
    getMovieItem: (idFilm)=>{
        return https.get("/QuanLyPhim/LayThongTinPhim?MaPhim="+idFilm)
    },
    updateMovieItem: (data)=>{
        return https.post("/QuanLyPhim/CapNhatPhimUpload", data)
    },

    //SHOW TIME 
    getInfoHeThongRap: ()=>{
        return https.get("/QuanLyRap/LayThongTinHeThongRap")
    },
    getInfoCumRap: (id)=>{
        return https.get("/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap="+id);
    },
    addLichChieu: (data)=>{
        return https.post("/QuanLyDatVe/TaoLichChieu", data)
    },

    //MANAGEMENT USER 
    getUserList: (soTrang, maNhom)=>{
        return https.get("QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?soPhanTuTrenTrang=10",
                {params:{
                    soTrang,
                    maNhom
                }}
        );
    },
    getLoaiNguoiDung: ()=>{
        return https.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
    },
    postUser: (data)=>{
        return https.post("/QuanLyNguoiDung/ThemNguoiDung", data);
    },
    deleteUser: (id)=>{
        return https.delete("/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan="+id)
    },
    getUserItem: (id)=>{
        return https.post("/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan="+id)
    },
    updateUserItem: (data)=>{
        return https.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
    },
    searchUserItem: (tuKhoa)=>{
        return https.get("/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&soTrang=1&soPhanTuTrenTrang=5",
        {
            params: {
                tuKhoa
            }
        })
    }
}