import Box from '@mui/material/Box';
import React from "react";

export function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <React.Fragment>
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </React.Fragment>
  );
}