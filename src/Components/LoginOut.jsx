import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import userDetails from "../contexts/userContext";
import nextLogo from "../assets/next.svg";
import themeMode from "../contexts/themeContext";
function LoginOut({ userData, user, getData }) {
  const { logOut, login } = useContext(userDetails);
  const navigate = useNavigate();
  function Login() {
    login(user);
    navigate("/Home", { replace: true });
  }
  const { themes } = useContext(themeMode);
  return (
    <div
      className={`border-2 my-8 w-auto px-16 rounded-lg py-4 ${themes.color} ${themes.font}`}
    >
      <h1 className="text-center text-2xl">{userData ? "logout" : "login"}</h1>
      <div className="flex justify-center flex-col mt-3">
        <img
          src={
            userData
              ? userData.results && userData.results[0].picture.large
              : user.results && user.results[0].picture.large
          }
          className="rounded-full flex justify-center"
        />
        <input
          type="text"
          value={
            userData
              ? userData.results && userData.results[0].name.first
              : user.results && user.results[0].name.first
          }
          className="border-0 my-2 bg-transparent"
        />
        <input
          type="text"
          value={
            userData
              ? userData.results && userData.results[0].login.username
              : user.results && user.results[0].login.username
          }
          className="border-2 my-1 py-3 bg-transparent"
        />
      </div>
      {userData ? (
        <div className="flex justify-center ">
          <button
            onClick={logOut}
            className="border-2  bg-red-500 p-1 px-6 rounded-xl"
          >
            logout
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-4 m-4  ">
          <button
            onClick={getData}
            className="w-14 border-2 bg-slate-500  rounded-lg"
          >
            next
          </button>
          <button
            onClick={Login}
            className="border-2 bg-slate-500 p-2 rounded-lg"
          >
            login
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginOut;
