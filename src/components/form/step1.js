import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { prettifyRut } from "react-rut-formatter";
import { useStyles } from "../styles";
import { useHistory } from "react-router-dom";

const Step1 = ({ handleNext, formik }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Información personal
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Nombre Completo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              helperText={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : ""
              }
              classes={{ root: classes.textField }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="rut"
              label="RUT"
              onChange={formik.handleChange}
              onBlur={(event) => {
                const formatted = prettifyRut(formik.values.rut);
                formik.setFieldValue("rut", formatted);
                formik.handleBlur(event);
              }}
              value={formik.values.rut}
              helperText={
                formik.errors.rut && formik.touched.rut ? formik.errors.rut : ""
              }
              classes={{ root: classes.textField }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="age"
              label="Edad"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              helperText={
                formik.errors.age && formik.touched.age ? formik.errors.age : ""
              }
              classes={{ root: classes.textField }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              id="gender"
              label="Género"
              onChange={formik.handleChange("gender")}
              onBlur={formik.handleBlur("gender")}
              value={formik.values.gender}
              helperText={
                formik.errors.gender && formik.touched.gender
                  ? formik.errors.gender
                  : ""
              }
              classes={{ root: classes.textField }}
              variant="standard"
            >
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => history.push("/home")} sx={{ mt: 3, ml: 1 }}>
            Volver
          </Button>
          <Button
            variant="contained"
            disabled={
              formik.values.name !== "" &&
              formik.values.rut !== "" &&
              formik.values.age !== "" &&
              formik.values.gender !== ""
                ? false
                : true
            }
            type="submit"
            onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}
          >
            Siguiente
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Step1;
