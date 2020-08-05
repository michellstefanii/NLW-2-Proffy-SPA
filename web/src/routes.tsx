import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Register from './pages/Register';

import { Context } from './services/AuthContext';

function CustomRoute({ isPrivate , ...rest }: any) {
  const { authenticated } = useContext(Context);

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />
  }

  if (!(isPrivate) && authenticated) {
      return <Redirect to="/home" />
    }

  return <Route {...rest} />;
}

const Routes: React.FC = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <CustomRoute isPrivate path="/study" component={TeacherList} />
          <CustomRoute isPrivate path="/give-classes" component={TeacherForm} />
        </Switch>
      </Router>
  );
}

export default Routes;