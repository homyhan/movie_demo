import { DAT_VE } from "./QuanLyDatVeType"


const stateDefault = {
    danhSachGheDangDat: [],
}


export const QuanLyDatVeReducer = (state=stateDefault,action)=> {
    switch (action.type) {
        

    case DAT_VE :{
        // cập nhật danh sách ghế đang đặt
    let danhSachGheCapNhat = [...state.danhSachGheDangDat];

    let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
    if (index!=-1) {
        //nếu tìm thấy ghế được chọn trong mảng thì có nghĩa là trước đó đã được chọn rồi => xóa đi
        danhSachGheCapNhat.splice(index,1);
    }else{
        danhSachGheCapNhat.push(action.gheDuocChon);
    }

        return {...state,
        danhSachGheDangDat: danhSachGheCapNhat}
    }
    default: return {...state}


    }

}