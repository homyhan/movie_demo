import React from 'react'
import {NavLink, useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import {UserOutlined} from '@ant-design/icons';
const Header = () => {
  const userLogin = useSelector(state=>state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='bg-slate-900 py-4'>
      <div className="container flex mx-auto justify-between items-center">
        <NavLink className="text-white text-4xl" to="/">
          Movie
        </NavLink>
        <nav>
          {userLogin ? (<div style={{display: 'flex'}}>
            <p className='text-white text-xl mr-2'>Hello {userLogin.hoTen}</p>
            <UserOutlined style={{height:'30px', width:'30px', textAlign:'center', borderRadius: '50%'}} className='text-xl text-white border-solid border-2 border-white mx-2'/>
            <Button onClick={()=>{ dispatch({
              type: "LOGOUT",
              })
              navigate("/");
              }}>Logout</Button>
          </div>): (<div>
            <NavLink
            className={(params) => {
              const classes = "text-xl mr-5 font-semibold";
              if (params.isActive) {
                return clsx("text-yellow-300", classes);
              }
              return clsx("text-white", classes);
            }}
            to="/signin"
          >
            Signin
          </NavLink>
          <NavLink
            className={(params) => {
              const classes = "text-xl mr-5 font-semibold";
              if (params.isActive) {
                return clsx("text-yellow-300", classes);
              }
              return clsx("text-white", classes);
            }}
            to="/signup"
          >
            Signup
          </NavLink>


          </div>)}       
          {/* {userLogin && userLogin.maLoaiNguoiDung === 'QuanTri' ? 'Quantri' : ''} */}
        </nav>

        
      </div>
    </div>
  )
}

export default Header