import * as React from "react";
import { useHistory } from "react-router-dom";
import { checkRut } from "react-rut-formatter";
import { useFormik } from "formik";
import { url_backend } from "../../global";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Copyright from "../copyright";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Final from "./final";

const steps = ["Paso 1", "Paso 2", "Paso 3"];

function getStepContent(step, handleNext, handleBack, formik) {
  switch (step) {
    case 0:
      return <Step1 handleNext={handleNext} formik={formik} />;
    case 1:
      return (
        <Step2
          handleNext={handleNext}
          handleBack={handleBack}
          formik={formik}
        />
      );
    case 2:
      return (
        <Step3
          handleNext={handleNext}
          handleBack={handleBack}
          formik={formik}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

const Form = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);

  const isLastStep = () => activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      rut: "",
      age: "",
      gender: "",
      address: "",
      comuna: "",
      city: "",
      region: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Ingresa tu nombre";
      }
      if (!values.rut) {
        errors.rut = "Ingresa tu rut";
      } else if (!/^[0-9.]+-[0-9]$/i.test(values.rut)) {
        errors.rut = "Ingresa un rut válido";
      } else if (!checkRut(values.rut)) {
        errors.rut = "Ingresa un rut válido";
      }
      if (!values.age) {
        errors.age = "Ingresa tu edad";
      } else if (!/^[0-9.]{1,}$/i.test(values.age)) {
        errors.age = "Debe ser un número";
      }
      if (!values.gender) {
        errors.gender = "Ingresa tu género";
      }
      if (!values.address) {
        errors.address = "Ingresa tu dirección";
      }
      if (!values.comuna) {
        errors.comuna = "Ingresa tu comuna";
      }
      if (!values.city) {
        errors.city = "Ingresa tu ciudad";
      }
      if (!values.region) {
        errors.region = "Ingresa tu región";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (!isLastStep()) {
        handleNext();
        return;
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
          body: JSON.stringify(values, null, 2),
        };
        fetch(url_backend + "form/new", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "success") {
              handleNext();
            }
          });
      }
    },
  });

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Formulario
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <Final history={history} />
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleNext, handleBack, formik)}
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
      <Copyright />
    </Container>
  );
};

export default Form;
