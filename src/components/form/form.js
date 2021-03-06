import * as React from "react";
import { checkRut } from "react-rut-formatter";
import { useFormik } from "formik";
import { url_backend } from "../../utils/global";
import BaseForm from "./baseForm";
import { useHistory } from "react-router-dom";

const steps = ["Paso 1", "Paso 2", "Paso 3"];

const Form = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const isLastStep = () => activeStep === steps.length - 1;

  const formik = useFormik({
    initialValues: {
      name: "",
      rut: "",
      age: "",
      gender: "",
      address: "",
      comuna: "",
      region: "",
      score: "",
      comments: "",
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
      if (!values.region) {
        errors.region = "Ingresa tu región";
      }
      if (!values.score) {
        errors.score = "Ingresa tu calificación";
      } else if (!/^[0-9.]{1,}$/i.test(values.score)) {
        errors.score = "Debe ser un número";
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
    <BaseForm
      formik={formik}
      steps={steps}
      activeStep={activeStep}
      history={history}
      handleNext={handleNext}
      handleBack={handleBack}
    />
  );
};

export default Form;
