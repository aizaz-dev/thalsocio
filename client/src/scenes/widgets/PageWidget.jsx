import React,{useState} from 'react'
import { useDispatch,useSelector } from "react-redux";
import { Pagination,PaginationItem, Typography } from '@mui/material'
import WidgetWraper from '../../components/WidgetWraper'
import { setPage } from '../../state';

function PageWidget() {
    const page=useSelector((state)=>state.page)
    const dispatch=useDispatch()
    const handleChange=(event,value)=>{
      console.log(page,value)
         dispatch(setPage({page:value}))
         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  return (
    <WidgetWraper>
    <Typography>Page: {page}</Typography>
        <Pagination count={10} color='primary' onChange={handleChange} />
    </WidgetWraper>
  )
}

export default PageWidget