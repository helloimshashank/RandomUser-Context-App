import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import useFetch from "../UseFetch";
import userDetails from "../contexts/userContext";
import LoginOut from "./LoginOut";
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
          <LoginOut user={user} getData={getData} />
        )}
      </div>
    </>
  );
}
export default User;
