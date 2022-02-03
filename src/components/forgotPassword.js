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

const ForgotPassword = () => {
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
          msg={"No existe un usuario con el mail ingresado"}
          type="error"
        />
        <SnackbarAlert
          openSnack={openSnack2}
          setOpenSnack={setOpenSnack2}
          msg={"Email enviado"}
          type="success"
        />
        <Typography component="h1" variant="h6">
          Solicitud email restauración de contraseña
        </Typography>
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Ingresa tu email";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values, null, 2),
            };
            fetch(url_backend + "auth/emailPassword", requestOptions)
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
                id="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={errors.email && touched.email ? errors.email : ""}
                classes={{ root: classes.textField }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar email
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

export default ForgotPassword;
