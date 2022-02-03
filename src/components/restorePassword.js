import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SnackbarAlert from "./snackbarAlert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { url_backend } from "../utils/global";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import { useStyles } from "./styles";
import "../App.css";

const RestorePassword = () => {
  const classes = useStyles();
  let history = useHistory();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnack2, setOpenSnack2] = React.useState(false);
  let { token } = useParams();

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
          msg={"Error al actualizar contraseña"}
          type="error"
        />
        <SnackbarAlert
          openSnack={openSnack2}
          setOpenSnack={setOpenSnack2}
          msg={"Contraseña actualizada"}
          type="success"
        />
        <Typography component="h1" variant="h6">
          Restaurar contraseña
        </Typography>
        <Formik
          initialValues={{ newPassword: "" }}
          validate={(values) => {
            const errors = {};
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
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify(values, null, 2),
            };
            fetch(url_backend + "auth/restorePassword", requestOptions).then(
              (response) => {
                if (response.status === 200) {
                  setOpenSnack2(true);
                } else {
                  setOpenSnack(true);
                }
              }
            );
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
                id="newPassword"
                label="Nueva Contraseña"
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
                Restaurar
              </Button>
              <Button onClick={() => history.push("/")} sx={{ mt: 3, ml: 1 }}>
                Iniciar sesión
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RestorePassword;
