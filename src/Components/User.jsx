import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import useFetch from "../UseFetch";
import userDetails from "../contexts/userContext";
import LoginOut from "./LoginOut";
import ApiLogin from "./ApiLogin";
function User() {
  const { data, refetch } = useFetch("https://randomuser.me/api/");
  const [user, setUser] = useState("");
  const { userData } = useContext(userDetails);
  useEffect(() => {
    Axios.get("https://randomuser.me/api/").then((response) => {
      setUser(response.data);
    });
  }, []);
  const getData = () => {
    //send this function as prop to loginOut
    refetch();
    setUser(data);
  };
  return (
    <>
      <div className=" flex justify-center items-center border-solid border-2 ">
        {userData ? (
          <LoginOut userData={userData} />
        ) : (
          <div className="flex gap-4">
            <LoginOut user={user} getData={getData} />
            <ApiLogin />
          </div>
        )}
      </div>
    </>
  );
}
export default User;
