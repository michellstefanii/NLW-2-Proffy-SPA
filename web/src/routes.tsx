import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Register from './pages/Register';
import AuthContext from './contexts/auth';
import Login from './pages/Login';
import Success from './pages/Success';

function CustomRoute({ isPrivate , ...rest }: any) {

  const { signed } = useContext(AuthContext);

  if (isPrivate && !signed) {
    return <Redirect to="/login" />
  }

  if (!(isPrivate) && signed) {
      return <Redirect to="/" />
    }

  return <Route {...rest} />;
}

const Routes: React.FC = () => {
  return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <CustomRoute isPrivate path="/" exact component={Landing} />
          <CustomRoute isPrivate path="/success" exact component={Success} />
          <CustomRoute isPrivate path="/study" component={TeacherList} />
          <CustomRoute isPrivate path="/give-classes" component={TeacherForm} />
        </Switch>
      </Router>
  );
}

export default Routes;