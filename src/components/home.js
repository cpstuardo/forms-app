import React, { useEffect, useState } from "react";
import { url_backend } from "../utils/global";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    fetch(url_backend + "auth/user", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 401) {
          history.push("/");
        } else {
          setUserName(data.name);
          setUserId(data.id);
        }
      });
  }, [history]);

  const closeSession = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("accessToken");
    history.push("/");
  };

  return (
    <div>
      <br />
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Bienvenido {userName}
      </Typography>
      <Button onClick={closeSession}>Cerrar sesión</Button>
      <br />
      <Button onClick={() => history.push("/updatePassword")}>
        Cambiar contraseña
      </Button>
      <br />
      {sessionStorage.getItem("role") === "user" ? (
        <div>
          <Button onClick={() => history.push("/form")}>
            Realizar encuesta
          </Button>
          <br />
          <Button onClick={() => history.push(`/${userId}/form`)}>
            Revisar encuestas realizadas
          </Button>
        </div>
      ) : (
        <div />
      )}
      {sessionStorage.getItem("role") === "admin" ? (
        <div>
          <Button onClick={() => history.push("/users")}>
            Manejo de usuarios
          </Button>
          <br />
          <Button onClick={() => history.push("/FormProgress")}>
            Revisar encuesta
          </Button>
        </div>
      ) : (
        <div />
      )}
      {sessionStorage.getItem("role") === "premium" ? (
        <div>
          <Button onClick={() => history.push("/FormProgress")}>
            Revisar encuesta
          </Button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Home;
