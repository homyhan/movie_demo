import React ,{Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom'
import { fetchScheduleDetail } from './thunk';
// import style  from './seats.module.css';
import './seats.css';

const Seats = () => {
  // từ url => mã lịch chiếu
  const params = useParams();
  const scheduleId = params.id;
  const dispatch = useDispatch();
  const selectedScheduleDetail = useSelector(state=>state.booking.selectedScheduleDetail);
  //call api =>dữ liệu phòng chiếu => store
  useEffect(()=>{
    dispatch(fetchScheduleDetail(scheduleId));
  }, [params, dispatch]);
  
  // if(!localStorage.getItem("USER_LOGIN")){
  //   return <Navigate to="/signin"></Navigate>
  // }
  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-3 text-center'>
        <h1 className='text-center py-3 bg-stone-300 w-11/12 mx-auto'>SCREEN</h1>
        {selectedScheduleDetail?.danhSachGhe?.map((item, index)=>{
          let gheVip = item.loaiGhe === 'Vip'? 'vip':'';
          let gheDaDat = item.daDat === true ? 'booked': '';
          
          return (
            <Fragment key={index}>
              <button key={index} disabled={item.daDat} className={`chair ${gheVip} ${gheDaDat}`}>{item.tenGhe}</button>
            </Fragment>
          ) 
          
          // <button key={item.maGhe} className='m-2 p-2'>{item.tenGhe}</button>
        })}

      </div>
      <div className='col-span-2 mx-auto'>
        <img style={{height:'450px', width:'340px'}} src={selectedScheduleDetail?.thongTinPhim?.hinhAnh}></img>
        <h1>{selectedScheduleDetail?.thongTinPhim?.tenPhim}</h1>
        <p>Ngày chiếu: {selectedScheduleDetail?.thongTinPhim?.ngayChieu} -  Giờ chiếu: {selectedScheduleDetail?.thongTinPhim?.gioChieu}</p>
        <p>Cụm rạp: {selectedScheduleDetail?.thongTinPhim?.tenCumRap}</p>
        <p>Địa chỉ: {selectedScheduleDetail?.thongTinPhim?.diaChi}</p>
      </div>
    </div>
  )
}

export default Seats