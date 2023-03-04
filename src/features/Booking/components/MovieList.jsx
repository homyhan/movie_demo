import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MovieItem from './MovieItem';
import { Pagination } from 'antd';
import { fetchMovieList } from '../thunk';
import {useNavigate, useSearchParams} from 'react-router-dom';

const MovieList = () => {
  const movieList = useSelector(state=>state.booking.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  
  return (
    <div>
        <h1 className='text-center text-7xl font-bold my-10'>MovieList</h1>
        <div className='grid grid-cols-4 gap-2'>
          {movieList.items?.map((item)=>{
            return <MovieItem key={item.maPhim} item={item}></MovieItem>
          })}
           
        </div>
        <Pagination current={Number(searchParam.get("page"))} className='my-6 text-center' pageSize={8} total={movieList.totalCount} onChange={(page, pageSize)=>{
          // dispatch(fetchMovieList(page))
          // console.log(page);
          setSearchParam({page});
          
        }}/>;
    </div>
  )
}

export default MovieList