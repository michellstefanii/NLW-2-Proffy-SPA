import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import AuthContext from './contexts/auth';

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
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={Register} />
          <CustomRoute isPrivate path="/study" component={TeacherList} />
          <CustomRoute isPrivate path="/give-classes" component={TeacherForm} />
        </Switch>
      </Router>
  );
}

export default Routes;