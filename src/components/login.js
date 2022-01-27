import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SnackbarAlert from "./snackbarAlert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { url_backend } from "../global";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useStyles } from "./styles";
import Copyright from "./copyright";
import "../App.css";

const Login = () => {
  const classes = useStyles();
  let history = useHistory();
  const [openSnack, setOpenSnack] = React.useState(false);

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
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
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values, null, 2),
            };
            fetch(url_backend + "auth/login", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                if (data.statusCode === 400) {
                  setOpenSnack(true);
                } else {
                  sessionStorage.setItem("accessToken", data.access);
                  sessionStorage.setItem("logged", true);
                  sessionStorage.setItem("role", data.role);
                  history.push("/home");
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
              <TextField
                margin="normal"
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
                Iniciar Sesión
              </Button>
            </form>
          )}
        </Formik>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Olvidaste tu contraseña?
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="/register" variant="body2">
              {"Registrarme"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
