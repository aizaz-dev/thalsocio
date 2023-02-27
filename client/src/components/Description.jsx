import React, { useState } from "react";
import ChopLines from "chop-lines";
import { Button, Typography, useTheme, Box } from "@mui/material";
function Description({ text, content }) {
  const [isExpanded, setExpanded] = useState(false);
  const { palette } = useTheme();
  const line = content ? "3" : "24";
  const main = palette.neutral.main;
  const style = {
    borderRadius: "0.5rem",
    color: palette.background.alt,
    backgroundColor: palette.primary.main,
    display: "inline-block",
    padding: "0 0.2rem 0rem 0.2rem",
  };

  return (
    <Box marginTop="1rem">
      {isExpanded ? (
        <>
          <Typography color={main}>
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </Typography>
          <Button size='small' sx={style} onClick={() => setExpanded(false)}>
            Show Less
          </Button>
        </>
      ) : (
        <ChopLines
          lines={line}
          lineHeight={21}
          ellipsis={
            <Button size="small" sx={style} onClick={() => setExpanded(true)}>
              Show More
            </Button>
          }
        >
          <Typography color={main}>
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </Typography>
        </ChopLines>
      )}
    </Box>
  );
}

export default Description;
