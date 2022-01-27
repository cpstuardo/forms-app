import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useStyles } from "../styles";

const Step3 = ({ handleNext, handleBack, formik }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Opinión
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              maxRows={4}
              id="opinion"
              label="Opinión"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.opinion}
              helperText={
                formik.errors.opinion && formik.touched.opinion
                  ? formik.errors.opinion
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
            type="submit"
            disabled={formik.isSubmitting}
            sx={{ mt: 3, ml: 1 }}
          >
            Finalizar
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Step3;
