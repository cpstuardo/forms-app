import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Copyright from "./copyright";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SnackbarAlert from "./snackbarAlert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { url_backend } from "../global";
import { useStyles } from "./styles";
import { Formik } from "formik";

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnack2, setOpenSnack2] = React.useState(false);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          msg={"Ya existe una cuenta con el email ingresado"}
          type="error"
        />
        <SnackbarAlert
          openSnack={openSnack2}
          setOpenSnack={setOpenSnack2}
          msg={"Cuenta creada exitosamente"}
          type="success"
        />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarme
        </Typography>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Ingresa tu email";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Ingresa un email válido";
            }
            if (!values.password) {
              errors.password = "Ingresa tu contraseña";
            }
            if (!values.name) {
              errors.name = "Ingresa tu nombre";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values, null, 3),
            };
            fetch(url_backend + "auth/register", requestOptions).then(
              (response) => {
                if (response.status === 201) {
                  setOpenSnack2(true);
                  sleep(3000).then(() => {
                    history.push("/"); // login
                  });
                } else if (response.status === 409) {
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
                margin="dense"
                required
                fullWidth
                id="name"
                label="Nombre completo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                helperText={errors.name && touched.name ? errors.name : ""}
                classes={{ root: classes.textField }}
              />
              <TextField
                margin="dense"
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
              <TextField
                margin="dense"
                required
                fullWidth
                id="password"
                label="Contraseña"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={
                  errors.password && touched.password ? errors.password : ""
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
                Registrar
              </Button>
            </form>
          )}
        </Formik>
        <Grid container justifyContent="flex-end">
          <Grid item xs>
            <Link href="/" variant="body2">
              Ya tienes una cuenta? Inicia sesión.
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Register;
