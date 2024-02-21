import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import userDetails from "../contexts/userContext";
import nextLogo from "../assets/next.svg";
import themeMode from "../contexts/themeContext";
import axios from "axios";
function LoginOut({ userData, user, getData }) {
  const { logOut, login } = useContext(userDetails);
  const navigate = useNavigate();
  async function Login() {
    login(user);
    navigate("/", { replace: true });
  }

  const { themes } = useContext(themeMode);
  return (
    <>
      <div
        className={`border-2 my-8 w-auto px-16 rounded-lg py-4 bg-gradient-to-br from-slate-800  to-emerald-200  `}
      >
        <h1 className="text-center text-2xl">
          {userData ? " logout" : " Random User login"}
        </h1>
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
            type="email "
            value={
              userData
                ? userData.results && userData.results[0].email
                : user.results && user.results[0].email
            }
            className="border-b-2 border-dotted my-2 bg-transparent"
            readOnly
          />
          <input
            type="text"
            value={
              userData
                ? userData.results && userData.results[0].login.password
                : user.results && user.results[0].login.password
            }
            className="border-b-2 border-dotted my-1  bg-transparent"
            readOnly
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
    </>
  );
}

export default LoginOut;
