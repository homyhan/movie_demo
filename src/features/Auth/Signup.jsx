import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { signup } from './thunk';
import { Formik, Form, Field } from 'formik';
// import { signup } from './thunk';
import * as Yup from "yup";
import { useFormik } from "formik";
import { signup } from './thunk';


// const signupUserSchema = yup.object().shape({
//   taiKhoan: yup.string().required('* Field is required!'),
//   matKhau: yup.string().required('* Field is required!'),
//   hoTen: yup.string().required('* Field is required!'),
//   eMail: yup.string().required('* Field is required!').email("* Email is invalid"),
//   sdt: yup.string().matches(/^[0-9]+$/),
//   maNhom: yup.string().required('* Field is required!')
// });




const Singup = () => {
  //  const _handleSubmit = values => {
  //   console.log(values);
  // };
  
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      eMail: "",
      sdt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    // validationSchema: Yup.object().shape({
    //   taiKhoan: Yup.string().required("Required"),
    //   matKhau: Yup.string().required().matches(
    //     /^(?=.*[a-z]*)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&\*]+).{6,10}$/g,
    //     "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    //   ),
    //   email: Yup.string().required("Required").matches(
    //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
    //     "Error email"
    //   ),
    //   soDt: Yup.string().required("Required").matches(
    //     /(^[0-9]{10}$)+/g,
    //     "So dien thoai chua dung"
    //   ),
    //   hoTen: Yup.string().required("Required").matches(
    //     /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
    //     "Enter FullName"
    //   ),
    //   maLoaiNguoiDung: Yup.string().required('Vui lòng chọn tùy chọn')
  
    // }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await dispatch(signup(values));
      // history.back()
      console.log("values", values);
    },
  });
  // const [sigupInfo, setSignupInfo] = useState({ taiKhoan: "", matKhau: "", eMail: "", sdt: "", maNhom: "", hoTen: ""});
  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   setSignupInfo({ ...sigupInfo, [e.target.name]: e.target.value });
  // };

  

  

  return (
    // <Formik 
    // initialValues={{
    //   taiKhoan: "",
    //   matKhau: "",
    //   hoTen: "",
    //   email: "",
    //   soDT: "",
    //   maNhom: ""
    // }}
    // validationSchema={signupUserSchema}
    // onSubmit={_handleSubmit}
    // render={(formikProps) => {
    //   <Form className='flex justify-center' 
    //   // onSubmit={handleSubmit}
    //   >
    //   <div>
    //   <div>
    //     <label className='block'>Tài Khoản*</label>
    //     <Field className='w-60 p-3 mb-2' type="text" placeholder='tài khoản' name='taiKhoan'
    //     onChange={formikProps.handleChange}/>
    //   </div>

    //   <div>
    //     <label className='block'>Mật Khẩu*</label>
    //     <Field className='w-60 p-3 mb-2' type="text" placeholder='mật khẩu' name='matKhau'
    //     onChange={formikProps.handleChange}/>
    //   </div>

    //   <div>
    //     <label className='block'>Email*</label>
    //     <Field className='w-60 p-3 mb-2' type="text" placeholder='Email' name='email'
    //     onChange={formikProps.handleChange}/>
    //   </div>

    //   <div>
    //     <label className='block'>Số Điện Thoại*</label>
    //     <Field className='w-60 p-3 mb-2' type="text" placeholder='sđt' name='soDT'
    //     onChange={formikProps.handleChange}/>
    //   </div>

    //   <div>
    //     <label className='block'>Họ Tên*</label>
    //     <Field className='w-60 p-3 mb-2' type="text" placeholder='họ tên' name='hoTen'
    //     onChange={formikProps.handleChange}/>
    //   </div>

    //   <div>
    //     <label className='block'>Mã nhóm*</label>
    //     {/* <input className='w-60 p-3 mb-2' type="text" placeholder='mã nhóm' name='maNhom'
    //     onChange={handleChange}></input> */}
    //     <Field 
    //     conponent="select"
    //     name="maNhom" 
    //     onChange={formikProps.handleChange}>
    //       <option value="">GP01</option>
    //       <option value="">GP02</option>
    //       <option value="">GP03</option>
    //       <option value="">GP04</option>
    //       <option value="">GP05</option>
    //       <option value="">GP06</option>
    //       <option value="">GP07</option>
    //       <option value="">GP08</option>
    //       <option value="">GP09</option>
    //       <option value="">GP10</option>
    //     </Field>
    //   </div>

    //   <Button htmlType='submit' type='primary'>Đăng Ký</Button>
    //   </div>

      
    // </Form>
    // }} />

    
    
      <form className='flex justify-center' onSubmit={formik.handleSubmit}>
        <div>
        <div>
          <label className='block'>Tài Khoản*</label>
          <input className='w-60 p-3 mb-2' type="text" placeholder='tài khoản' name='taiKhoan'
          onChange={formik.handleSubmit}></input>
        </div>
  
        <div>
          <label className='block'>Mật Khẩu*</label>
          <input className='w-60 p-3 mb-2' type="text" placeholder='mật khẩu' name='matKhau'
          onChange={formik.handleSubmit}></input>
        </div>
  
        <div>
          <label className='block'>Email*</label>
          <input className='w-60 p-3 mb-2' type="text" placeholder='Email' name='eMail'
          onChange={formik.handleSubmit}></input>
        </div>
  
        <div>
          <label className='block'>Số Điện Thoại*</label>
          <input className='w-60 p-3 mb-2' type="text" placeholder='sđt' name='sdt'
          onChange={formik.handleSubmit}></input>
        </div>
  
        <div>
          <label className='block'>Họ Tên*</label>
          <input className='w-60 p-3 mb-2' type="text" placeholder='họ tên' name='hoTen'
          onChange={formik.handleSubmit}></input>
        </div>
  
        <div>
          <label className='block'>Mã nhóm*</label>
          <select className='w-60 p-3 mb-2' type="text" placeholder='mã nhóm' name='maNhom'
          onChange={formik.handleSubmit}>
             <option value="">GP01</option>
             <option value="">GP02</option>
             <option value="">GP03</option>
             <option value="">GP04</option>
             <option value="">GP05</option>
             <option value="">GP06</option>
             <option value="">GP07</option>
             <option value="">GP08</option>
             <option value="">GP09</option>
             <option value="">GP10</option>
          </select>
        </div>
  
        
  
        <Button htmlType='submit' type='primary'>Đăng Ký</Button>
        </div>
  
        
      </form>
      
    
     
    
    
  )
  
}



//signup gồm 4 trang (signup, authService, thunk.js, authSlice)

export default Singup