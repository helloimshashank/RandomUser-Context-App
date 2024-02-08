import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import User from "./User";
import Settings from "./Settings";
import { Route, Routes, json } from "react-router-dom";
import themeMode from "../contexts/themeContext";
import userDetails from "../contexts/userContext";
function Main1() {
  const { themes, setThemes, ftheme } = useContext(themeMode);
  const { login } = useContext(userDetails);
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) login(data);
    if (theme) ftheme(theme.theme);
  }, []);

  return (
    <div
      className={`h-full w-full  ${themes.color} ${themes.font} ${themes.fontStyle} `}
    >
      <div className="flex">
        <div className={`mx-3 my-10 pt-36 `}>
          <NavBar />
        </div>
        <div className="mx-3 my-16  border-solid border-2 border-sky-500 grow pl-5 py-7 pr-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<User />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main1;
