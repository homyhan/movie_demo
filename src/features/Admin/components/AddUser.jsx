import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
  Space,
  Select,
} from "antd";

import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../thunk";
import { useNavigate } from "react-router-dom";
import { movieList } from "../services/adminService";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const AddUser = () => {
  const [state, setState] = useState({
    loaiNguoiDung: []
  })
  useEffect(
    () => async () => {
      try {
        const res = await movieList.getLoaiNguoiDung();
        setState({
          ...state,
          loaiNguoiDung: res.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN")).maNhom;
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Required"),
      matKhau: Yup.string().required().matches(
        /^(?=.*[a-z]*)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&\*]+).{6,10}$/g,
        "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
      ),
      email: Yup.string().required("Required").matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        "Error email"
      ),
      soDt: Yup.string().required("Required").matches(
        /(^[0-9]{10}$)+/g,
        "So dien thoai chua dung"
      ),
      hoTen: Yup.string().required("Required").matches(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
        "Enter FullName"
      ),
      maLoaiNguoiDung: Yup.string().required('Vui lòng chọn tùy chọn')

    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await dispatch(addUser(values));
      history.back()
      console.log("values", values);
    },
  });

  const handleChangeDoiTuong = (values) => {
    console.log(values);
   return formik.setFieldValue("maLoaiNguoiDung", values);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const handleChangeMaNhom = (values) => {
    console.log(values);
    return formik.setFieldValue("maNhom", values);
  };
  return (
    <LayoutAdmin>
      {contextHolder}
      <h3 className="px-3">Add User</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size="default"
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Form.Item label="Tai khoan">
          <Input placeholder="Tài khoản" name="taiKhoan" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.taiKhoan &&formik.errors.taiKhoan  ? (
            <p className="text-red-600 font-bold">{formik.errors.taiKhoan}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Ho ten">
          <Input placeholder="Họ tên" name="hoTen" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.hoTen &&formik.errors.hoTen  ? (
            <p className="text-red-600 font-bold">{formik.errors.hoTen}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Mat Khau">
          <Input placeholder="Mật khẩu" name="matKhau" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.matKhau &&formik.errors.matKhau  ? (
            <p className="text-red-600 font-bold">{formik.errors.matKhau}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
          />
          {formik.touched.email &&formik.errors.email  ? (
            <p className="text-red-600 font-bold">{formik.errors.email}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="So DT">
          <Input name="soDt" placeholder="Số điện thoại" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.soDt &&formik.errors.soDt  ? (
            <p className="text-red-600 font-bold">{formik.errors.soDt}</p>
          ) : null }
        </Form.Item>


        <Form.Item label="Doi tuong">
          <Select
            options={state.loaiNguoiDung?.map((item, index)=>({
              label: item.tenLoai,
              value: item.maLoaiNguoiDung,
            }))}
            onChange={handleChangeDoiTuong}
            onBlur={() => formik.setFieldTouched('select', true)}
            placeholder="Doi tuong"
          />
          {formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung ? (
            <p className="text-red-600 font-bold">{formik.errors.maLoaiNguoiDung}</p>
          ) : null}
        </Form.Item>

        {/* <Form.Item label="Ma Nhom">
          <Select
            options={[
              {
                label: "GP01",
                value: "GP01",
              },
              {
                label: "GP02",
                value: "GP02",
              },
              
            ]}
            onChange={handleChangeMaNhom}
            placeholder="Ma Nhom"
          />
        </Form.Item> */}

        <Form.Item className="text-center">
          <Button
            className="mx-2 border-1 border-green-500 bg-green-500 text-white"
            htmlType="submit"
          >
            Submit and back
          </Button>
          <Button
            className="border-1 border-orange-400 text-orange-400"
            onClick={() => {
              navigate("/admin/user");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default AddUser;


//CHECK SU TON TAI CUA TAI KHOAN || NHOM LUON LA GP01