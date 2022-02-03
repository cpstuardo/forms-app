import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SnackbarAlert from "./snackbarAlert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { url_backend } from "../utils/global";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useStyles } from "./styles";
import "../App.css";

const UpdatePassword = () => {
  const classes = useStyles();
  let history = useHistory();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnack2, setOpenSnack2] = React.useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SnackbarAlert
          openSnack={openSnack}
          setOpenSnack={setOpenSnack}
          msg={"Credenciales inválidas"}
          type="error"
        />
        <SnackbarAlert
          openSnack={openSnack2}
          setOpenSnack={setOpenSnack2}
          msg={"Contraseña actualizadas"}
          type="success"
        />
        <Typography component="h1" variant="h6">
          Cambiar contraseña
        </Typography>
        <Formik
          initialValues={{ prevPassword: "", newPassword: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.prevPassword) {
              errors.prevPassword = "Ingresa tu contraseña actual";
            }
            if (!values.newPassword) {
              errors.newPassword = "Ingresa tu nueva contraseña";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const requestOptions = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer " + sessionStorage.getItem("accessToken"),
              },
              body: JSON.stringify(values, null, 2),
            };
            fetch(url_backend + "auth/cred", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                if (data.statusCode === 400) {
                  setOpenSnack(true);
                } else {
                  setOpenSnack2(true);
                }
              });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="prevPassword"
                label="Contraseña actual"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.prevPassword}
                helperText={
                  errors.prevPassword && touched.prevPassword
                    ? errors.prevPassword
                    : ""
                }
                classes={{ root: classes.textField }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="Contraseña nueva"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
                helperText={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : ""
                }
                classes={{ root: classes.textField }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Cambiar contraseña
              </Button>
              <Button
                onClick={() => history.push("/home")}
                sx={{ mt: 3, ml: 1 }}
              >
                Volver
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
