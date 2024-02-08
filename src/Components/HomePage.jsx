import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userDetails from "../contexts/userContext";
function HomePage() {
  const navigate = useNavigate();
  const { logOut, userData, login } = useContext(userDetails);
  const Logout = () => {
    logOut();
    navigate("/", { replace: true });
  };
  return (
    <div className="mx-3 my-9 bg-slate-400  h-96 w-96  ">
      <h2>home page</h2>

      {userData ? (
        (JSON.stringify(userData),
        (
          <img
            src={userData && userData.results[0].picture.large}
            alt="user image"
            className=""
          />
        ))
      ) : (
        <h3>
          please <a href="/">Login</a>
        </h3>
      )}
      <button onClick={Logout}>logout</button>
    </div>
  );
}

export default HomePage;
