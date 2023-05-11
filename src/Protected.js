import React from 'react'
import { Navigate } from 'react-router-dom';
import Home from './page/Home';

function Protected() {
  const user = localStorage.getItem('token');

  if (user) {
    return (<Home/>)
  } else {
    return <Navigate to="/login" />
  }
}


export default Protected;


