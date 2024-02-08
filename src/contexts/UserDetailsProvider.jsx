import { useEffect, useState } from "react";
import userDetails from "./userContext";
const UserDetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const login = (data) => {
    setUserData(data);
  };

  const logOut = () => {
    setUserData(null);
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  return (
    <userDetails.Provider value={{ login, logOut, userData }}>
      {children}
    </userDetails.Provider>
  );
};
export default UserDetailsProvider;
