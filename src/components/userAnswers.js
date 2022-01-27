import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { url_backend } from "../global";
import { useHistory, useParams } from "react-router-dom";
import SnackbarAlert from "./snackbarAlert";
import FormTable from "./formTable";

const UserAnswers = () => {
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  const [openSnackDelete, setOpenSnackDelete] = useState(false);
  const [openSnackFail, setOpenSnackFail] = useState(false);
  let { userId } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    fetch(url_backend + `form/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAnswers(data));
  }, []);

  return (
    <div>
      <SnackbarAlert
        openSnack={openSnackDelete}
        setOpenSnack={setOpenSnackDelete}
        msg={"Respuesta eliminada exitosamente"}
        type="success"
      />
      <SnackbarAlert
        openSnack={openSnackFail}
        setOpenSnack={setOpenSnackFail}
        msg={"Acción fallida"}
        type="error"
      />
      <br />
      <FormTable
        rows={answers}
        setOpenSnackDelete={setOpenSnackDelete}
        setOpenSnackFail={setOpenSnackFail}
      />
      <br />
      <Button
        variant="contained"
        onClick={() => history.push("/users")}
        sx={{ mt: 3, ml: 1 }}
      >
        Volver
      </Button>
    </div>
  );
};
export default UserAnswers;
