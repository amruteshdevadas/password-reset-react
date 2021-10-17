import "./App.css";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Forgotpassword from "./components/Forgotpassword";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <>
            <h3>Welcome to Password Reset </h3>
            </>
          </Route>
          <Route path="/users/register" exact={true} component={Register} />
          <Route path="/users/login" exact={true} component={Login} />
          <Route
            path="/users/forgotPassword"
            exact={true}
            component={Forgotpassword}
          />
           <Route
            path="/users/password-reset/:userId/:token"
            exact={true}
            component={ChangePassword}
            url="/users/password-reset/:userId/:token"
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
