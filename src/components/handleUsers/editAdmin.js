import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SnackbarAlert from "../snackbarAlert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useHistory, useParams } from "react-router-dom";
import { url_backend } from "../../utils/global";
import { useStyles } from "../styles";
import { Formik } from "formik";

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnack2, setOpenSnack2] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  let { userId } = useParams();

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    fetch(url_backend + `auth/user/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      });
  }, [userId]);

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
          msg={"Error al editar usuario"}
          type="error"
        />
        <SnackbarAlert
          openSnack={openSnack2}
          setOpenSnack={setOpenSnack2}
          msg={"Usuario editado exitosamente"}
          type="success"
        />
        <Typography component="h1" variant="h5">
          Editar usuario {name}
        </Typography>
        <Formik
          initialValues={{ name: name, email: email, role: role }}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Ingresa un email";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Ingresa un email válido";
            }
            if (!values.name) {
              errors.name = "Ingresa un nombre";
            }
            if (!values.role) {
              errors.role = "Ingresa un rol";
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
              body: JSON.stringify(values, null, 3),
            };
            fetch(url_backend + `auth/user/${userId}`, requestOptions).then(
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
                select
                id="role"
                label="Rol"
                onChange={handleChange("role")}
                onBlur={handleBlur("role")}
                value={values.role}
                helperText={errors.role && touched.role ? errors.role : ""}
                classes={{ root: classes.textField }}
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="user">Usuario</MenuItem>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Editar
              </Button>
            </form>
          )}
        </Formik>
        <Button onClick={() => history.goBack()} sx={{ mt: 3, ml: 1 }}>
          Volver
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
