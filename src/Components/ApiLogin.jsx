import axios from "axios";
import React, { useContext, useState } from "react";
import usePost from "../usePost";
import UserDetailsProvider from "../contexts/UserDetailsProvider";
import userDetails from "../contexts/userContext";
import { Navigate, useNavigate } from "react-router-dom";

function ApiLogin() {
  const [email, setEmail] = useState("aradya@gmail.com");
  const [password, setPassword] = useState("aradya123");
  const [result, setResult] = useState("");
  const [error, SetError] = useState({
    emailErr: "",
    pwdErr: "",
    both: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(userDetails);
  async function handleLogin() {
    if (password === "") {
      SetError((prev) => ({ ...prev, pwdErr: "Enter password" }));
    } else if (email === "") {
      SetError((prev) => ({ ...prev, emailErr: "Enter email" }));
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/user/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res) {
          console.log("reuslt is", res);
          const Token = res.data.token;
          console.log("token is ", Token);
          SetError("");
          login({ email, password, Token });

          navigate("/", { replace: true });
        }
      } catch (err) {
        console.log("err is", err);
        if (err.response.status === 400) {
          SetError((prev) => ({
            usernameErr: "",
            pwdErr: "",
            both: "Enter Valid Username or Password",
          }));
        }
        console.log("error occured", err.response.data);
      }
    }
  }
  return (
    <div
      className={`border-2 my-8 w-auto px-16 rounded-lg py-4 shadow-lg shadow-zinc-600 bg-gradient-to-br from-transparent to-teal-200`}
    >
      <h1 className="text-center text-2xl">Login </h1>
      <div className="flex justify-center flex-col mt-20 gap-2">
        <input
          type="email "
          className="border-b-2  border-gray-900 my-2 bg-transparent"
          placeholder="enter email"
          onChange={(e) => {
            setEmail(e.target.value), SetError("");
          }}
          value={email}
          required
        />
        {error.emailErr ? <span>{JSON.stringify(error.emailErr)}</span> : ""}
        <input
          type="text"
          className="border-b-2  border-gray-900 my-1  bg-transparent"
          placeholder="enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        {error.pwdErr ? <span>{JSON.stringify(error.pwdErr)}</span> : ""}
      </div>
      {error.both ? (
        <span className="text-red-600 font-semibold">
          {JSON.stringify(error.both)}
        </span>
      ) : (
        ""
      )}
      <div className="flex justify-center gap-4 m-4  ">
        <button
          className="border-2 bg-slate-500 p-2 rounded-lg w-44"
          onClick={handleLogin}
        >
          login
        </button>
      </div>
    </div>
  );
}

export default ApiLogin;
