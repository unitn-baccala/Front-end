import React from "react";
import Box from '@mui/material/Box';

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