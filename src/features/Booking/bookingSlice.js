import { produce } from "immer";
const initialState = {
  banners: [],
  movies: {},
  selectedScheduleDetail: null,
  danhSachGheDangDat: []
};

export const bookingReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === "SET_BANNER") {
      draft.banners = payload;
    }
    if (type === "SET_MOVIES") {
      draft.movies = payload;
    }
    if (type === "SET_SCHEDULE") {
      draft.selectedScheduleDetail = payload;
      console.log(payload);
    }
    if (type === "DAT_VE") {
      // // let danhSachGheCapNhat = [...draft.danhSachGheDangDat];

      // // let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === payload.gheDuocChon.maGhe);
      // let index = draft.danhSachGheDangDat.findIndex((item)=>item.maGhe === payload.maGhe);
      
      // if(index!=-1) {
      //   // nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xóa đi
      //   draft.danhSachGheDangDat.splice(index,1);
      // }else {
      //   draft.danhSachGheDangDat.push(payload.gheDuocChon);
      // }
      
      // return {...draft, danhSachGheDangDat: danhSachGheCapNhat}
      draft.danhSachGheDangDat = payload;
      console.log(payload);
    }
  });
};
// {maGhe: 91077, tenGhe: '157', maRap: 723, loaiGhe: 'Thuong', stt: '157'}