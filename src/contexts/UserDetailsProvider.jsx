import { useState } from "react";
import userDetails from "./userContext";
const UserDetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const login = (data) => {
    setUserData(data);
  };
  console.log("provider", userData);
  const logOut = () => {
    setUserData(null);
  };

  return (
    <userDetails.Provider value={{ login, logOut, userData }}>
      {children}
    </userDetails.Provider>
  );
};
export default UserDetailsProvider;
