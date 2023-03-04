import React from 'react';
import { Card, Button } from 'antd';

const MovieItem = (props) => {
  return (
    <Card
    hoverable
     
    cover={<img style={{ height: '250px', objectFit: 'cover'}} alt="example" src={props.item.hinhAnh} />}
    >
      <h1 className='text-2xl font-bold'>{props.item.tenPhim}</h1>
      <p>{props.item.moTa}</p>
      <Button type='primary'>Book</Button>
  </Card> 
  )
}

export default MovieItem