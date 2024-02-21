import React, { useContext, useEffect, useState } from "react";
import userDetails from "../contexts/userContext";
import useFetch from "../UseFetch";
import axios from "axios";
function Profile() {
  const { userData } = useContext(userDetails);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  const localData = JSON.parse(localStorage.getItem("userData"));
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${localData.Token}`,
    },
  });
  useEffect(() => {
    orders();
    console.log("profile details is", profile);
    var data = JSON.parse(localStorage.getItem("userData"));
    console.log("userdata in localStorage is", data.Token);
  }, []);
  async function orders() {
    try {
      const res = await authAxios.get("http://localhost:3000/user/profile");
      console.log("order res is", res.data);
      setProfile(res.data);
    } catch (err) {
      console.log("error is", err.response.data.message);
      setError(err.response.data.message);
    }
  }
  return (
    <div>
      hello there
      {!userData ? (
        "please Login or signup"
      ) : (
        <div className="flex-col">
          <section>
            {/* <h1>{profile.userData.username}</h1> */}
            <h1>{localData.email}</h1>
            <h1>{localData.user_name}</h1>
          </section>

          <section className="flex gap-4 mt-9">
            {!profile.yourOrders
              ? "no orders placed"
              : profile.yourOrders.map((order) => (
                  <div
                    className="flex-col border-2 rounded-xl p-5"
                    key={order.id}
                  >
                    <h1>{order.item_name}</h1>
                    <h1>{order.price}</h1>
                  </div>
                ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default Profile;
