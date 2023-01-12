import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'


function PrivateRoute() {
    const isAuthenticated=()=>{
        if(typeof(window)=='undefined'){
          return false;
        }
      
        if(localStorage.getItem('jwt')){
          return true;
        }else{
          return false;
        }
      }
    const auth=isAuthenticated()
    console.log(auth)
  return auth? <Outlet/>:<Navigate to='/'/> 

}

export default PrivateRoute