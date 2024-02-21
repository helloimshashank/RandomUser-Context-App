import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import homeLogo from "../assets/Home.svg";
import LoginLogo from "../assets/Login.svg";
import AccountLogo from "../assets/account.svg";
import SettingsLogo from "../assets/settings.svg";
import themeMode from "../contexts/themeContext";
import userDetails from "../contexts/userContext";
function NavBar() {
  const { themes } = useContext(themeMode);
  const { userData } = useContext(userDetails);
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };
  return (
    <div
      className={`border-solid ${themes.color} ${themes.font}  rounded-2xl border -2 shadow-lg `}
    >
      <nav className="my-9 px-2">
        <NavLink to="/" style={navLinkStyle}>
          <div className="flex py-3 gap-3 shadow-lg rounded-2xl">
            <img src={homeLogo} alt="home" />
            <h1 className="mt-2">Home</h1>
          </div>
        </NavLink>
        <NavLink to="/login" style={navLinkStyle}>
          <div className="flex gap-3 ">
            <img src={LoginLogo} alt="Login" />
            <h1 className="mt-1">Login</h1>
          </div>
        </NavLink>
        {userData && userData ? (
          <NavLink to="/profile" style={navLinkStyle}>
            <div className="flex gap-3 ">
              <img src={AccountLogo} alt="account" />
              <h1 className="mt-1">Account</h1>
            </div>
          </NavLink>
        ) : (
          ""
        )}
        <NavLink to="/settings" style={navLinkStyle}>
          <div className="flex gap-3 mt-2">
            <img src={SettingsLogo} alt="Login" />
            <h1 className="mt-1">Settings</h1>
          </div>
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
