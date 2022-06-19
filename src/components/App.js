import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import AppRouter from "components/Router";
import { useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  };
  return (
  <>
    {init ? (
      <AppRouter 
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)} 
        userObj={userObj} 
      /> 
    ) : (
      "Initializing..."
    )}
  </>
  );
} 

export default App;
