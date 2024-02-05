import React, { useContext } from "react";
import themeMode from "../contexts/themeContext";
function Settings() {
  const { ftheme } = useContext(themeMode);
  return (
    <div className="flex-col">
      <div className="flex m-7" onClick={() => ftheme("light")}>
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
      <div className="flex m-7" onClick={() => ftheme("dark")}>
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
    </div>
  );
}

export default Settings;
