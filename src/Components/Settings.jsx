import React, { useContext, useState } from "react";
import themeMode from "../contexts/themeContext";
function Settings() {
  const { ftheme, setThemes, themes } = useContext(themeMode);
  const [font, setFont] = useState("");

  function fontSubmit(e) {
    e.preventDefault();
    setThemes({ ...themes, fontStyle: font });
  }

  return (
    <div className="flex-col ml-24   ">
      <div className="flex m-7">
        <h2 className=" text-2xl">light mode</h2>
        <button
          onClick={() => {
            ftheme("light");
          }}
          className="border-2 ml-9 p-1"
        >
          light mode
        </button>
      </div>
      <div className="flex m-7">
        <h2 className="text-2xl">dark mode</h2>
        <button
          onClick={() => {
            ftheme("dark");
          }}
          className="border-2 ml-9 p-1"
        >
          dark mode
        </button>
      </div>
      <form onSubmit={fontSubmit}>
        <h2> change fonts</h2>
        <select
          className={`w-40 m-5  bg-transparent focus:${(themes.theme = "light"
            ? "bg-slate-500 text-black"
            : "bg-slate-400 text-white")}`} //issue with this code color
          onChange={(e) => {
            setFont(e.target.value);
          }}
        >
          <option value="font-sans">sans</option>
          <option value="font-serif">serif</option>
          <option value="font-mono">mono</option>
        </select>
        <button> add</button>
      </form>
    </div>
  );
}

export default Settings;
