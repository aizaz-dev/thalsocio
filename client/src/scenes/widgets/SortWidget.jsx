import { ViewList, ViewModule,AccessTime,ThumbUpOutlined,ThumbDownOutlined,TrendingUp,TrendingDown } from "@mui/icons-material";
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Box,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import WidgetWraper from "../../components/WidgetWraper";
import { setView,setSort,setTrend } from "../../state";
function SortWidget() {
  const dispatch=useDispatch()
  const view=useSelector(state=>state.view)
  const sort=useSelector(state=>state.sort)
  const trend=useSelector(state=>state.trend)

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleView = (event, nextView) => {
    if(nextView!=null){
      dispatch(setView({view:nextView})   )
        
    }
  };
  const handleSort = (event, nextView) => {
    if(nextView!=null){
        dispatch(setSort({sort:nextView}))  
    }
  };
  const handleTrend = (event, nextView) => {
    if(nextView!=null){
        dispatch(setTrend({trend:nextView}))  
    }
  };
  return (
    <WidgetWraper>
      {/*First Row */}
      <Box p="1.5rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Select View
        </Typography>
        <Box display="flex" justifyContent="center">
          <ToggleButtonGroup color="primary" value={view} exclusive onChange={handleView}>
            <Tooltip title="List View">
              <ToggleButton value="list" aria-label="list" selected={view=='list'}>
                <ViewList />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Grid View">
              <ToggleButton value="module" aria-label="module" selected={view=="module"}>
                <ViewModule />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0" justifyContent='left'>
      <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Sort By
        </Typography>
        <Box display="flex" justifyContent="center">

          <ToggleButtonGroup color="primary" value={sort} exclusive onChange={handleSort}>
            <Tooltip title="Time">
              <ToggleButton value="time" aria-label="time" selected={sort=='time'}>
                <AccessTime/>
              </ToggleButton>
              </Tooltip>
         
              <Tooltip title="Up Votes">
              <ToggleButton value="upvote" aria-label="upvote" selected={sort=="upvote"}>
                <ThumbUpOutlined/>
              </ToggleButton>
              </Tooltip>

              <Tooltip title="Down Votes">
              <ToggleButton value="downvote" aria-label="downvote" selected={sort=="downvote"}>
                <ThumbDownOutlined/>
              </ToggleButton>
              </Tooltip>
         
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" justifyContent="center" marginTop='0.3rem'>
        <ToggleButtonGroup color="primary" value={trend} exclusive onChange={handleTrend}>
            <Tooltip title="Ascending">
              <ToggleButton value="+" aria-label="+" selected={trend=='+'}>
                <TrendingUp/>
              </ToggleButton>
              </Tooltip>
         
              <Tooltip title="Descending">
              <ToggleButton value="-" aria-label="-" selected={trend=="-"}>
                <TrendingDown/>
              </ToggleButton>
              </Tooltip>
         
          </ToggleButtonGroup>
        </Box>
      </Box>
    </WidgetWraper>
  );
}

export default SortWidget;
