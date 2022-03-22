import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get("/user/auth")
        .then(function (response) {
          const { name, username, email } = response.data.user;
          setUser({ name, username, email });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
