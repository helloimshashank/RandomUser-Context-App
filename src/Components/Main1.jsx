import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import HomePage from "./homepage/HomePage";
import User from "./loginout/User";
import Settings from "./Settings";
import SingleItem from "./homepage/SingleItem";
import { Route, Routes, json } from "react-router-dom";
import themeMode from "../contexts/themeContext";
import userDetails from "../contexts/userContext";
import Profile from "./Profile";
import Additem from "./Additem";
function Main1() {
  const { themes, setThemes, ftheme } = useContext(themeMode);
  const { login } = useContext(userDetails);
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) login(data);
    if (theme) ftheme(theme.themeColor);
  }, []);

  return (
    <div
      className={` h-auto w-auto ${themes.color} ${themes.font} ${themes.fontStyle} flex `}
    >
      <div className={`mx-3 my-10 pt-36 `}>
        <NavBar />
      </div>
      <div
        className={`h-screen mx-3 my-16 shadow-2xl rounded-2xl grow pl-5 py-7 pr-8 ${
          themes.themeColor == "light"
            ? "bg-gradient-to-br from-slate-100 to-slate-200"
            : ""
        } `}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:itemId" element={<SingleItem />} />
          <Route path="/seller/additem" element={<Additem />} />
          <Route path="/seller/updateitem/:itemId" element={<Additem />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main1;
