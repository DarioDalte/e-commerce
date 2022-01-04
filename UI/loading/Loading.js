import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Loading(props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
