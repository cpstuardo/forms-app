import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
              id="score"
              label="Calificación"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.score}
              helperText={
                formik.errors.score && formik.touched.score
                  ? formik.errors.score
                  : ""
              }
              classes={{ root: classes.textField }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              id="comments"
              label="Comentarios"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comments}
              helperText={
                formik.errors.comments && formik.touched.comments
                  ? formik.errors.comments
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
