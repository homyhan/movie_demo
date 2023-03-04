import React, { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addMoive, fetchMovieItem, updateMovie } from "../thunk";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const EditFilm = () => {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const movieItem = params.id;
  useEffect(() => {
    dispatch(fetchMovieItem(movieItem));
  }, []);

  const { selectedFilm } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN")).maNhom;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: selectedFilm?.maPhim,
      tenPhim: selectedFilm?.tenPhim,
      trailer: selectedFilm?.trailer,
      moTa: selectedFilm?.moTa,
      ngayKhoiChieu: selectedFilm?.ngayKhoiChieu,
      dangChieu: selectedFilm?.dangChieu,
      sapChieu: selectedFilm?.sapChieu,
      hot: selectedFilm?.hot,
      danhGia: selectedFilm?.danhGia,
      maNhom: idGroup,
      hinhAnh: null,
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Required"),
      trailer: Yup.string().required("Required"),
      moTa: Yup.string().required("Required"),
      // ngayKhoiChieu: Yup.date().required("Required").min(new Date(), 'Ngày khởi chiếu phải lớn hơn ngày hiện tại'),
      danhGia: Yup.number()
        .required("Required")
        .min(0, "Số sao phải lớn hơn hoặc bằng 0")
        .max(10, "Số sao phải nhỏ hơn hoặc bằng 10"),
      // ngayKhoiChieu: Yup.date().required("Required"),
      // ngayKhoiChieu: Yup.string().required('Vui lòng chọn ngày'),

      // hinhAnh: Yup.string()
      //   // .required("Required")
      //   // .test("FILE_SIZE", "Too big", value=>value && value<1024)
      //   .test(
      //     "FILE_TYPE",
      //     "Invalid",
      //     (value) => value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
      //   ),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log("values", values);
      values.maNhom = selectedFilm?.maNhom;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      await dispatch(updateMovie(formData));
      // success();
      history.back();
    },
  });

  // const handleChangeDatePicker =(value)=>{
  //   // console.log(dayjs(value).format("DD/MM/YYYY"));
  //   // let ngayKhoiChieu =dayjs(value, 'DD/MM/YYYY').$d;
  //   // console.log(ngayKhoiChieu);

  //   let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
  //   console.log(ngayKhoiChieu);

  //   return formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  // }
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value).$d;
    console.log(ngayKhoiChieu);
    return formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNum = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (evt) => {
    let file = evt.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        setImgSrc(evt.target.result);
        console.log(evt.target.result);
      };
      return formik.setFieldValue("hinhAnh", file);
    }

    // console.log("file", file);
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
      <h3 className="px-3">Edit Film</h3>
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <p className="text-red-600 font-bold">{formik.errors.tenPhim}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.trailer}
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
            value={formik.values.moTa}
            rows={4}
            placeholder="Description"
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <p className="text-red-600 font-bold">{formik.errors.moTa}</p>
          ) : null}
        </Form.Item>

        <Form.Item label="DatePicker">
          <DatePicker
            format="DD/MM/YYYY"
            onBlur={() => formik.setFieldTouched("date", true)}
            onChange={handleChangeDatePicker}
            value={dayjs(
              dayjs(formik.values.ngayKhoiChieu).format("DD/MM/YYYY"),
              "DD/MM/YYYY"
            )}
          />
          {/* {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <p className="text-red-600 font-bold">{formik.errors.ngayKhoiChieu}</p>
          ) : null} */}
          {/* {console.log("log bottom", (dayjs(moment(formik.values.ngayKhoiChieu).format('DD/MM/YYYY'), 'DD/MM/YYYY').format('DD/MM/YYYY')))} */}

          {/* <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker}/> */}
        </Form.Item>

        <Form.Item label="Dang Chieu">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sap chieu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="So sao">
          <InputNumber
            onBlur={() => formik.setFieldTouched("danhGia", true)}
            onChange={handleChangeInputNum("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
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
            src={imgSrc === "" ? selectedFilm?.hinhAnh : imgSrc}
            alt="Image"
          ></img>
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
              history.back();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default EditFilm;
