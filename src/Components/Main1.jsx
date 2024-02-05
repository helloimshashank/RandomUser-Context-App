import React, { useContext } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import User from "./User";
import Settings from "./Settings";
import { Route, Routes } from "react-router-dom";
import themeMode from "../contexts/themeContext";
function Main1() {
  const { themes } = useContext(themeMode);
  console.log("main1", themes);
  return (
    <div className={`h-full w- full  ${themes.color} ${themes.font} `}>
      <div className="flex">
        <div className={`mx-3 my-10 pt-36 `}>
          <NavBar />
        </div>
        <div className="mx-3 my-6  border-solid border-2 border-sky-500 grow pl-5 py-7 pr-8">
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main1;
