import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";
import Register from "./pages/Register";
import AuthContext from "./contexts/auth";
import Login from "./pages/Login";
import RecoveryPassword from "./pages/RecoveryPassword";
import Profile from "./pages/Profile";

function CustomRoute({ isPrivate, ...rest }: any) {
  const { signed } = useContext(AuthContext);

  if (isPrivate && !signed) {
    return <Redirect to="/login" />;
  }

  if (!isPrivate && signed) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <CustomRoute path="/login" component={Login} />
        <CustomRoute path="/register" component={Register} />
        <CustomRoute path="/recoverypassword" component={RecoveryPassword} />
        <CustomRoute isPrivate path="/" exact component={Landing} />
        <CustomRoute isPrivate path="/profile" component={Profile} />
        <CustomRoute isPrivate path="/study" component={TeacherList} />
        <CustomRoute isPrivate path="/give-classes" component={TeacherForm} />
      </Switch>
    </Router>
  );
};

export default Routes;
