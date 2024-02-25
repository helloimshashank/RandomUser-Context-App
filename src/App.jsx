import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import User from "./Components/loginout/User";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/homepage/HomePage";
import UserDetailsProvider from "./contexts/UserDetailsProvider";
import Settings from "./Components/Settings";
import ThemeProvider from "./contexts/ThemeProvider";
import themeMode from "./contexts/themeContext";
import Main1 from "./Components/Main1";
function App() {
  return (
    <BrowserRouter>
      <UserDetailsProvider>
        <ThemeProvider>
          <Main1 />
        </ThemeProvider>
      </UserDetailsProvider>
    </BrowserRouter>
  );
}

export default App;
