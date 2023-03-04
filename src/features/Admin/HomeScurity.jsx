import React from 'react'
import { Navigate } from 'react-router-dom';

const HomeScurity = (props) => {
    const isAdmin = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maLoaiNguoiDung==='QuanTri';
//   if(!localStorage.getItem("USER_LOGIN") || !isAdmin){
//     return <Navigate to="/signin"></Navigate>
//   }
  return (
    <div>
        {props.children}
        <div>FOOTER</div>
    </div>
  )
}

export default HomeScurity