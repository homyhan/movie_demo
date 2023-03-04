import React, { useState } from "react";
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
} from "antd";
import moment from "moment";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addMoive } from "../thunk";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const AddNew = () => {
  const [imgSrc, setImgSrc] = useState("");
  // const [touched, setTouched] = useState({});

  // const handleBlur = (field) => {
  //   setTouched((prev) => ({ ...prev, [field]: true }));
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN")).maNhom;
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      maNhom: idGroup,
      hinhAnh: {},
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Required"),
      trailer: Yup.string().required("Required"),
      moTa: Yup.string().required("Required"),
      // ngayKhoiChieu: Yup.date().required("Required").min(new Date(), 'Ngày khởi chiếu phải lớn hơn ngày hiện tại'),
      danhGia: Yup.number().required("Required").min(0, 'Số sao phải lớn hơn hoặc bằng 0')
      .max(10, 'Số sao phải nhỏ hơn hoặc bằng 10'),
      // ngayKhoiChieu: Yup.date().required("Required"),
      ngayKhoiChieu: Yup.string().required('Vui lòng chọn ngày'),
    
      hinhAnh: Yup.mixed()
        .required("Required")
        // .test("FILE_SIZE", "Too big", value=>value && value<1024)
        .test(
          "FILE_TYPE",
          "Invalid",
          (value) => value && ["image/png", "image/jpeg", "image/png"].includes(value.type)
        ),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      // console.log('values', values);
      
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      await dispatch(addMoive(formData));
      await success();
      navigate("/admin/film");
      // console.log("formData", formData);
    },
  });
  // console.log(formik.errors);
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value).format("DD/MM/YYYY");
    console.log(ngayKhoiChieu);
    return formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      console.log(name, value);
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNum = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (evt) => {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setImgSrc(evt.target.result);
      console.log(evt.target.result);
    };
    formik.setFieldValue("hinhAnh", file);

    console.log("file", file);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <h3 className="px-3">Add Film</h3>
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
        <Form.Item label="Name">
          <Input
            name="tenPhim"
            value={formik.values.tenPhim}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.tenPhim &&formik.errors.tenPhim  ? (
            <p className="text-red-600 font-bold">{formik.errors.tenPhim}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            value={formik.values.trailer}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.trailer && formik.errors.trailer ? (
            <p className="text-red-600 font-bold">{formik.errors.trailer}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            name="moTa"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            rows={4}
            placeholder="Description"
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <p className="text-red-600 font-bold">{formik.errors.moTa}</p>
          ) : null}
        </Form.Item>

        <Form.Item label="DatePicker">
          <DatePicker
            format={dateFormatList}
            onChange={handleChangeDatePicker}
            // onChange={(value) => formik.setFieldValue('date', value)}
            onBlur={() => formik.setFieldTouched('date', true)}
            
          />
          {/* <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker}/> */}
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <p className="text-red-600 font-bold">{formik.errors.ngayKhoiChieu}</p>
          ) : null}
        </Form.Item>

        <Form.Item label="Dang Chieu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sap chieu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="So sao">
          <InputNumber
            onChange={handleChangeInputNum("danhGia")}
            value={formik.values.danhGia}
            // min={1}
            // max={10}
            onBlur={() => formik.setFieldTouched('danhGia', true)}
          />
          {formik.touched.danhGia && formik.errors.danhGia ? (
            <p className="text-red-600 font-bold">{formik.errors.danhGia}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Image">
          <input
            className="bg-white"
            type="file"
            onChange={handleChangeFile}
          ></input>

          <img
            style={{ width: "100px", height: "150px", objectFit: "cover" }}
            src={imgSrc}
            alt="Image"
          ></img>
          {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
            <p className="text-red-600 font-bold">{formik.errors.hinhAnh}</p>
          ) : null}
          {/* {formik.errors.hinhAnh && <p className="text-red-600 font-bold">{formik.errors.hinhAnh}</p>} */}
          {/* {formik.errors.hinhAnh && formik.touched.hinhAnh && <p className="text-red-600 font-bold">{formik.errors.hinhAnh}</p>} */}
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            className="mx-2 border-1 border-green-500 bg-green-500 text-white"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            className="border-1 border-orange-400 text-orange-400"
            onClick={() => {
              navigate("/admin/film");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default AddNew;
