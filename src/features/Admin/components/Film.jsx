import React, { useEffect, useState } from "react";
import { AudioOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, fetchMovieList } from "../thunk";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { ExclamationCircleFilled, CalendarOutlined } from "@ant-design/icons";
import HomeAdmin from "../HomeAdmin";
// import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;
const { Search } = Input;

const onSearch = (value) => console.log(value);
const columns = [
  {
    title: "ID Film",
    dataIndex: "idFilm",
    sorter: (a, b) => a.idFilm - b.idFilm,
  },
  {
    title: "Image",
    dataIndex: "img",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.img.startsWith(value),
  },
  {
    title: "NameFilm",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "28%",
  },
  {
    title: "Description",
    dataIndex: "desc",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.desc.startsWith(value),
    width: "400px",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maNhom;

const Film = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { movies } = useSelector((state) => state.admin);
  const moveToAddnew = () => {
    navigate("/admin/film/addnew");
  };
  console.log(searchParam.get("page"));
  useEffect(() => {
    dispatch(fetchMovieList(searchParam.get("page"), idGroup, 10));
  }, [dispatch, searchParam.get("page"), 10]);
  if (!idGroup) {
    return <Navigate to="/signin"></Navigate>;
  }
  return (
    <LayoutAdmin>
      <div className="text-right mb-4">
        <h2 className="text-left px-3">Quản lí phim</h2>
        <Button
          onClick={() => {
            moveToAddnew();
          }}
        >
          Add Film
        </Button>{" "}
        <br />
        <Space className="w-2/5" direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </div>

      <Table
        columns={columns}
        pagination={false}
        dataSource={movies?.items?.map((item) => {
          return {
            key: item.maPhim,
            idFilm: item.maPhim,
            img: (
              <img
                style={{ height: "150px", width: "100px", objectFit: "cover" }}
                src={item.hinhAnh}
              ></img>
            ),
            name: item.tenPhim,
            desc: item.moTa,

            action: (
              <span>
                <EditOutlined
                  onClick={() => {
                    navigate("/admin/film/edit/" + item.maPhim);
                  }}
                  className="text-2xl"
                />

                <Button
                  className="bg-red-600 text-white"
                  onClick={() => {
                    confirm({
                      title: `Are you sure delete ${item.tenPhim} ?`,
                      icon: <ExclamationCircleFilled />,
                      // content: 'Some descriptions',
                      okText: "Yes",
                      okType: "danger",
                      cancelText: "No",
                      onOk() {
                        dispatch(deleteMovie(item.maPhim));
                        dispatch(
                          fetchMovieList(searchParam.get("page"), idGroup, 10)
                        );
                      },
                      onCancel() {
                        console.log("Cancel");
                      },
                    });
                  }}
                >
                  <DeleteOutlined></DeleteOutlined>
                </Button>

                <CalendarOutlined onClick={()=>{
                  navigate("/admin/showtime/"+item.maPhim);
                }} className="text-green-600 text-xl"/>
              </span>
            ),
          };
        })}
       
      />
      <Pagination className="text-center my-4" current={searchParam.get("page")===null? 1 : searchParam.get("page")*1} pageSize={10} total={movies?.totalCount} onChange={(page)=>{
        setSearchParam({page})
      }}/>

      {/* <table>
        <thead>
          <tr>
            <th>ID Film</th>
            <th>Image</th>
            <th>Name Film</th>
            <th>ID Film</th>
          </tr>
        </thead>
      </table> */}
    </LayoutAdmin>
  );
};

export default Film;
