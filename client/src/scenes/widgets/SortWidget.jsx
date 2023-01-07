import { ViewList, ViewModule } from "@mui/icons-material";
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
import WidgetWraper from "../../components/WidgetWraper";
function SortWidget() {
  const [view, setView] = useState("list");
  const [sort,setSort]=useState("time")
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleView = (event, nextView) => {
    if(nextView!=null){
        setView(nextView);   
    }
  };
  const handleSort = (event, nextView) => {
    if(nextView!=null){
        setSort(nextView);   
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
            
              <ToggleButton value="time" aria-label="time" selected={sort=='time'}>
                Time
              </ToggleButton>
         
           
              <ToggleButton value="upvote" aria-label="upvote" selected={sort=="upvote"}>
                Up Vote
              </ToggleButton>
              <ToggleButton value="downvote" aria-label="downvote" selected={sort=="downvote"}>
                Down Vote
              </ToggleButton>
         
          </ToggleButtonGroup>
        </Box>
      </Box>
    </WidgetWraper>
  );
}

export default SortWidget;
