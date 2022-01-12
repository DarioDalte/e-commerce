import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Loading(props) {
  const theme = createTheme({
    components: {
      MuiBackdrop: {
        variants: [
          {
            props: { transparent: 'false' },
            style: {
              background: "grey",
            },
          },
        ],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        transparent={props.transparent}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default Loading;
