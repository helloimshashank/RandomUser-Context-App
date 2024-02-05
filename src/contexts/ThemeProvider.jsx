import themeMode from "./themeContext";
import React, { useState } from "react";

function ThemeProvider({ children }) {
  const [themes, setThemes] = useState({
    theme: "light",
    color: "bg-slate-100",
    font: "text-black",
  });
  function ftheme(theme) {
    if (theme == "dark") {
      setThemes({
        theme: "dark",
        color: "bg-slate-800",
        font: "text-slate-300",
      });
    } else {
      setThemes({
        theme: "light",
        color: "bg-slate-100",
        font: "text-black",
      });
    }
  }

  console.log(themes);
  return (
    <themeMode.Provider value={{ ftheme, themes }}>
      {children}
    </themeMode.Provider>
  );
}

export default ThemeProvider;
