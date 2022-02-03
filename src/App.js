import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Form from "./components/form/form";
import Users from "./components/handleUsers/users";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import RegisterAdmin from "./components/handleUsers/registerAdmin";
import EditAdmin from "./components/handleUsers/editAdmin";
import UserAnswers from "./components/handleUsers/userAnswers";
import FormProgress from "./components/handleForms/formProgress";
import FormEdit from "./components/form/formEdit";
import UpdatePassword from "./components/updatePassword";
import ForgotPassword from "./components/forgotPassword";
import RestorePassword from "./components/restorePassword";

function App() {
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/restorePassword/:token">
            <RestorePassword />
          </Route>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/updatePassword">
            <UpdatePassword />
          </PrivateRoute>
          <PrivateRoute path="/form">
            <Form />
          </PrivateRoute>
          <PrivateRoute path="/:formId/formEdit">
            <FormEdit />
          </PrivateRoute>
          <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/registerAdmin">
            <RegisterAdmin />
          </PrivateRoute>
          <PrivateRoute path="/:userId/editAdmin">
            <EditAdmin />
          </PrivateRoute>
          <PrivateRoute path="/:userId/form">
            <UserAnswers />
          </PrivateRoute>
          <PrivateRoute path="/formProgress">
            <FormProgress width={width} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
