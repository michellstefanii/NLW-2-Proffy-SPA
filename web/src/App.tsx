import React from "react";

import "./assets/styles/styles.css";
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth"

const App: React.FC = () => {
  return (
      <AuthProvider>
      <Routes />
      </AuthProvider>
  );
};

export default App;
