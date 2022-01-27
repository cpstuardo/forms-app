import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useStyles } from "../styles";

const Step2 = ({ handleNext, handleBack, formik }) => {
  const classes = useStyles();
  const [address, setAddress] = React.useState("");
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Información de vivienda
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              label="Dirección"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              helperText={
                formik.errors.address && formik.touched.address
                  ? formik.errors.address
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
              id="comuna"
              label="Comuna"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comuna}
              helperText={
                formik.errors.comuna && formik.touched.comuna
                  ? formik.errors.comuna
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
              id="city"
              label="Ciudad"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              helperText={
                formik.errors.city && formik.touched.city
                  ? formik.errors.city
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
              id="region"
              label="Región"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.region}
              helperText={
                formik.errors.region && formik.touched.region
                  ? formik.errors.region
                  : ""
              }
              classes={{ root: classes.textField }}
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Volver
          </Button>
          <Button
            variant="contained"
            disabled={
              formik.values.address !== "" &&
              formik.values.comuna !== "" &&
              formik.values.city !== "" &&
              formik.values.region !== ""
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

export default Step2;
