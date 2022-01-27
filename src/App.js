import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Form from "./components/form/form";
import Users from "./components/users";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import RegisterAdmin from "./components/registerAdmin";
import UserAnswers from "./components/userAnswers";

function App() {
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
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/form">
            <Form />
          </PrivateRoute>
          <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/registerAdmin">
            <RegisterAdmin />
          </PrivateRoute>
          <PrivateRoute path="/:userId/form">
            <UserAnswers />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
