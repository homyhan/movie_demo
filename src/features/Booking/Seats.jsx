import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { fetchScheduleDetail } from "./thunk";
import { fetchDanhSachGheDangDat } from "./thunk";
// import style  from './seats.module.css';
import "./seats.css";
const Seats = () => {
  // từ url => mã lịch chiếu
  const params = useParams();
  const scheduleId = params.id;
  const dispatch = useDispatch();
  const  selectedScheduleDetail  = useSelector(
    (state) => state.booking.selectedScheduleDetail
  );
  const danhSachGheDangDat = useSelector(
    (state) => state.booking.danhSachGheDangDat
  );

  // console.log(danhSachGheDangDat);

  //call api =>dữ liệu phòng chiếu => store
  useEffect(() => {
    dispatch(fetchScheduleDetail(scheduleId));
  }, [params, dispatch]);

  

  useEffect(() => {
    dispatch(fetchDanhSachGheDangDat(scheduleId))
  }, [params, dispatch]);

  // if(!localStorage.getItem("USER_LOGIN")){
  //   return <Navigate to="/signin"></Navigate>
  // }
  return (
    <div className="grid grid-cols-5 mt-5">
      <div className="col-span-3 text-center">
        <h1 className="text-center py-3 bg-stone-300 w-11/12 mx-auto">
          SCREEN
        </h1>
        {selectedScheduleDetail?.danhSachGhe?.map((item, index) => {
          let gheVip = item.loaiGhe === "Vip" ? "vip" : "";
          let gheDaDat = item.daDat === true ? "booked" : "";
          // let classGheDangDat = '';
          // kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
          // let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === item.maGhe);
          // if(indexGheDD != -1) {
          //   classGheDangDat = "gheDangDat";
          // }


          return (
            <Fragment key={index}>
              <button
                onClick={() => {
                  dispatch({
                    type: "DAT_VE",
                     payload: item,
                  });
                }}
                key={index}
                disabled={item.daDat}
                className={`chair ${gheVip} ${gheDaDat} `}
              >
                {item.tenGhe}
              </button>
            </Fragment>
          );

          // <button key={item.maGhe} className='m-2 p-2'>{item.tenGhe}</button>
        })}
      </div>
      <div className="col-span-2 mx-auto">
        <h3 className="text-green-400 text-center text-4xl">0 đ</h3>
        <img
          className="mt-2"
          style={{ height: "450px", width: "340px" }}
          src={selectedScheduleDetail?.thongTinPhim?.hinhAnh}
        ></img>
        <h1>{selectedScheduleDetail?.thongTinPhim?.tenPhim}</h1>
        <p>
          Ngày chiếu: {selectedScheduleDetail?.thongTinPhim?.ngayChieu} - Giờ
          chiếu: {selectedScheduleDetail?.thongTinPhim?.gioChieu}
        </p>
        <p>Cụm rạp: {selectedScheduleDetail?.thongTinPhim?.tenCumRap}</p>
        <p>Địa chỉ: {selectedScheduleDetail?.thongTinPhim?.diaChi}</p>
        <hr />

        <div className="flex flex-row my-5">
          <div className="w-4/5">
            <span className="text-red-400 text-lg">Ghế</span>
          </div>
          <div className="text-right col-span-1">
            <span className="text-green-800 text-lg">0đ</span>
          </div>
        </div>

        <div
          className="mb-0 h-full flex flex-col items-center"
          style={{ marginBottom: 0 }}
        >
          <div className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
            ĐẶT VÉ
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
