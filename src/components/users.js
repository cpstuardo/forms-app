import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { url_backend } from "../global";
import { useHistory } from "react-router-dom";
import UsersTable from "./usersTable";
import SnackbarAlert from "./snackbarAlert";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [openSnackDelete, setOpenSnackDelete] = useState(false);
  const [openSnackFail, setOpenSnackFail] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    fetch(url_backend + "auth/users", requestOptions)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [openSnackDelete]);

  return (
    <div>
      <SnackbarAlert
        openSnack={openSnackDelete}
        setOpenSnack={setOpenSnackDelete}
        msg={"Usuario eliminado exitosamente"}
        type="success"
      />
      <SnackbarAlert
        openSnack={openSnackFail}
        setOpenSnack={setOpenSnackFail}
        msg={"Acción fallida"}
        type="error"
      />
      <br />
      <UsersTable
        rows={users}
        setOpenSnackDelete={setOpenSnackDelete}
        setOpenSnackFail={setOpenSnackFail}
      />
      <Button
        onClick={() => history.push("/registerAdmin")}
        sx={{ mt: 3, ml: 1 }}
      >
        Registrar nuevo usuario
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => history.push("/home")}
        sx={{ mt: 3, ml: 1 }}
      >
        Volver al home
      </Button>
    </div>
  );
};
export default Users;
