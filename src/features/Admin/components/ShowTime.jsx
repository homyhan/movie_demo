import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Cascader,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { movieList } from "../services/adminService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { createBrowserHistory } from "history";
import dayjs from "dayjs";
let history = createBrowserHistory();

const ShowTime = (props) => {
  const params = useParams();
  const idFilm = params.id;
  const formik = useFormik({
    initialValues: {
      maPhim: idFilm,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await movieList.addLichChieu(values);
        alert("them thanh cong");
        history.back();
      } catch (error) {
        console.log(error);
      }
      console.log("values", values);
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state.heThongRapChieu);
  useEffect(
    () => async () => {
      try {
        const res = await movieList.getInfoHeThongRap();
        setState({
          ...state,
          heThongRapChieu: res.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleChangeHeThongRap = async (value) => {
    console.log("mahethongrap", value);
    try {
      const res = await movieList.getInfoCumRap(value);
      setState({
        ...state,
        cumRapChieu: res.data.content,
      });
      console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const onOk = (value) => {
   return formik.setFieldValue(
      "ngayChieuGioChieu",
      dayjs(value).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values", moment(value).format("DD/MM/YYYY hh:mm:ss"));
  };
  const handleChangeCumRap = (values) => {
    console.log(values);
    formik.setFieldValue("maRap", values);
  };
  const onChangeDate = (values) => {
   return formik.setFieldValue(
      "ngayChieuGioChieu",
      dayjs(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeInputNum = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  return (
    <LayoutAdmin>
      <Form
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="He thong rap">
          <Select
            options={state.heThongRapChieu?.map((itemHtr, index) => ({
              label: itemHtr.tenHeThongRap,
              value: itemHtr.maHeThongRap,
            }))}
            onChange={handleChangeHeThongRap}
            placeholder="He thong rap"
          />
        </Form.Item>

        <Form.Item label="Cum rap">
          <Select
            options={state.cumRapChieu?.map((itemCumRap, index) => ({
              label: itemCumRap.tenCumRap,
              value: itemCumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Cum rap"
          />
        </Form.Item>

        <Form.Item label="Ngay chieu gio chieu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Gia ve">
          <InputNumber min={75000} max={150000} onChange={onChangeInputNum} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default ShowTime;
