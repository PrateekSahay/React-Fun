import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Product = () => {
    const {id} = useParams();
    const location = useLocation();
    console.log("location", location);
    const navigate = useNavigate();

    const onClick = () => navigate('/')
  return (
    <div onClick={onClick}>Product: {id}</div>
  )
}

export default Product