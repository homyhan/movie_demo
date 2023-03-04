import React, {useEffect} from "react";
import { Carousel } from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { fetchBanners, fetchMovieList } from "./thunk";
import MovieList from "./components/MovieList";
import { useSearchParams } from "react-router-dom";
import MoviesTab from "./components/MoviesTab";
import Header from "../../components/Header";


const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const Home = () => {
    const dispatch = useDispatch();
    const banners = useSelector(state=>state.booking.banners);
    const [searchParam, setSearchParam] = useSearchParams();
      useEffect(()=>{
        dispatch(fetchBanners);
        dispatch(fetchMovieList(searchParam.get("page")))
    }, [dispatch]);
    useEffect(()=>{
        dispatch(fetchMovieList(searchParam.get("page")))
    }, [searchParam.get("page")]);
  return (
    <div>
      <Header></Header>
      <Carousel autoplay effect="fade">
        {banners.map((item, index)=>{
            return (
                <div key={item.maBanner}>
                    <h3 style={contentStyle}><img className="w-full" src={item.hinhAnh}></img></h3>
                </div>
            )
        })}
       
      </Carousel>
      <MovieList></MovieList>
      <MoviesTab></MoviesTab>
    </div>
  );
};

export default Home;
