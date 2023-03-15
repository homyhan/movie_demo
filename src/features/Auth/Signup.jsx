import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from './thunk';

const Singup = () => {
  const [sigupInfo, setSignupInfo] = useState({ taiKhoan: "", matKhau: "", eMail: "", sdt: "", maNhom: "", hoTen: ""});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSignupInfo({ ...sigupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sigupInfo);
    //dispatch async action signup
  dispatch(signup(sigupInfo));
  };
  return (
    <form className='flex justify-center' onSubmit={handleSubmit}>
      <div>
      <div>
        <label className='block'>Tài Khoản*</label>
        <input className='w-60 p-3 mb-2' type="text" placeholder='tài khoản' name='taiKhoan'
        onChange={handleChange}></input>
      </div>

      <div>
        <label className='block'>Mật Khẩu*</label>
        <input className='w-60 p-3 mb-2' type="text" placeholder='mật khẩu' name='matKhau'
        onChange={handleChange}></input>
      </div>

      <div>
        <label className='block'>Email*</label>
        <input className='w-60 p-3 mb-2' type="text" placeholder='Email' name='eMail'
        onChange={handleChange}></input>
      </div>

      <div>
        <label className='block'>Số Điện Thoại*</label>
        <input className='w-60 p-3 mb-2' type="text" placeholder='sđt' name='sdt'
        onChange={handleChange}></input>
      </div>

      <div>
        <label className='block'>Mã nhóm*</label>
        <input className='w-60 p-3 mb-2' type="text" placeholder='mã nhóm' name='maNhom'
        onChange={handleChange}></input>
      </div>

      <div>
        <label className='block'>Họ Tên*</label>
        <input className='w-60 p-3 mb-2' type="text" placeholder='họ tên' name='hoTen'
        onChange={handleChange}></input>
      </div>

      <Button htmlType='submit' type='primary'>Đăng Ký</Button>
      </div>

      
    </form>
    
  )
}

//signup gồm 4 trang (signup, authService, thunk.js, authSlice)

export default Singup