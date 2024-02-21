import { useEffect, useState } from "react";
import userDetails from "./userContext";
const UserDetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const login = (data) => {
    setUserData(data);
  };
  console.log("userdata", userData);
  const logOut = () => {
    setUserData(null);
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    var data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.Token)
      console.log("userdata in localStorage is", data.Token);
  }, [userData]);
  return (
    <userDetails.Provider value={{ login, logOut, userData }}>
      {children}
    </userDetails.Provider>
  );
};
export default UserDetailsProvider;
