import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import AppRouter from "components/Router";
import { useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  );
} 

export default App;