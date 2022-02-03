import * as React from "react";
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

const BaseForm = ({
  formik,
  steps,
  activeStep,
  history,
  handleBack,
  handleNext,
}) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Encuesta
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

export default BaseForm;
