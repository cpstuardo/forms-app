import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = (props) => {
  return (
    <Snackbar
      open={props.openSnack}
      autoHideDuration={3000}
      onClose={() => props.setOpenSnack(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={props.type}>
        {props.msg}{" "}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => props.setOpenSnack(false)}
        >
          <CloseIcon fontSize={"small"} />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};
export default SnackbarAlert;
