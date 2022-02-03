import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { url_backend } from "../../utils/global";
import { useHistory } from "react-router-dom";
import UsersTable from "../tables/usersTable";
import SnackbarAlert from "../snackbarAlert";

const Users = () => {
  const history = useHistory();
  const [filters, setFilters] = useState("/");
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
    fetch(url_backend + "auth/users" + filters, requestOptions)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [openSnackDelete, filters]);

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
        setFilters={setFilters}
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
        Volver
      </Button>
    </div>
  );
};
export default Users;
