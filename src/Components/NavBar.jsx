import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import homeLogo from "../assets/Home.svg";
import LoginLogo from "../assets/Login.svg";
import themeMode from "../contexts/themeContext";
function NavBar() {
  const { themes } = useContext(themeMode);
  console.log(themes, "navbar");
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };
  return (
    <div className={`border-solid ${themes.color} ${themes.font}  rounded-3xl`}>
      <nav className="my-9 px-2">
        <NavLink to="/home" style={navLinkStyle}>
          <div className="flex py-3">
            <img src={homeLogo} alt="home" />
            <h1 className="mt-2">home</h1>
          </div>
        </NavLink>
        <NavLink to="/" style={navLinkStyle}>
          <div className="flex">
            <img src={LoginLogo} alt="Login" />
            <h1 className="mt-1">login</h1>
          </div>
        </NavLink>
        <NavLink to="/settings" style={navLinkStyle}>
          <div className="flex">
            <img src={LoginLogo} alt="Login" />
            <h1 className="mt-1">settings</h1>
          </div>
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
