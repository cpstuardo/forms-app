import React, { useEffect, useState } from "react";
import { url_backend } from "../global";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");

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
        }
      });
  }, []);

  const closeSession = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("accessToken");
    history.push("/");
  };

  return (
    <div>
      <h1>Hola {userName} </h1>
      <Button onClick={() => history.push("/form")}>
        Responder formulario
      </Button>
      <Button onClick={closeSession}>Cerrar sesión</Button>
      {sessionStorage.getItem("role") === "admin" ? (
        <Button onClick={() => history.push("/users")}>
          Manejo de usuarios
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Home;
