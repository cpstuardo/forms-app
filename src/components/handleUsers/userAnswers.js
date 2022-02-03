import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { url_backend } from "../../utils/global";
import { useHistory, useParams } from "react-router-dom";
import FormTable from "../tables/formTable";
import SnackbarAlert from "../snackbarAlert";

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
    fetch(url_backend + `form/user/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        setAnswers(
          data.map((d) => {
            d.user = d.user.name;
            return d;
          })
        )
      );
  }, [userId, openSnackDelete]);

  return (
    <div>
      <SnackbarAlert
        openSnack={openSnackDelete}
        setOpenSnack={setOpenSnackDelete}
        msg={"Encuesta eliminada exitosamente"}
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
        onClick={() => history.goBack()}
        sx={{ mt: 3, ml: 1 }}
      >
        Volver
      </Button>
    </div>
  );
};
export default UserAnswers;
