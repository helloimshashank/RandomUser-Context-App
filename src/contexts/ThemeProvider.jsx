import themeMode from "./themeContext";
import React, { useEffect, useState } from "react";

function ThemeProvider({ children }) {
  const [themes, setThemes] = useState({
    themeColor: "light",
    color: "bg-slate-100",
    font: "text-black",
    fontStyle: "",
  });
  function ftheme(theme) {
    if (theme == "dark") {
      setThemes({
        themeColor: "dark",
        color: "bg-slate-800",
        font: "text-slate-300",
        fontStyle: "",
      });
    } else {
      setThemes({
        themeColor: "light",
        color: "bg-slate-100",
        font: "text-black",
        fontStyle: "",
      });
    }
  }
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themes));
  }, [themes]);

  return (
    <themeMode.Provider value={{ ftheme, themes, setThemes }}>
      {children}
    </themeMode.Provider>
  );
}

export default ThemeProvider;
