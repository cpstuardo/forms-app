import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Final = (props) => (
  <React.Fragment>
    <Typography variant="h5" gutterBottom>
      Gracias por responder el formulario
    </Typography>
    <Typography variant="subtitle1">
      Las respuestas serán revisadas. Te contactaremos a la brevedad
    </Typography>
    <Button
      variant="contained"
      onClick={() => props.history.push("/home")}
      sx={{ mt: 3, ml: 1 }}
    >
      Volver al home
    </Button>
  </React.Fragment>
);
export default Final;
