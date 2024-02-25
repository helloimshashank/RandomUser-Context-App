import React, { useContext, useEffect, useRef, useState } from "react";
import userDetails from "../contexts/userContext";
import useFetch from "../UseFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Profile() {
  const { userData } = useContext(userDetails);
  const [profile, setProfile] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [error, setError] = useState("");
  const delref = useRef(null); // this doesnt work (added to hide the div affter clicking delete)
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("userData"));
  const token = localData.Token || localData.sellerToken;
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    if (userData && userData.Token) orders();
    if (userData && userData.sellerToken) items();
    // console.log("seller data is", sellerData.items);
  }, []);
  async function deleteItem(item_id) {
    try {
      const res = await authAxios.delete(
        `http://localhost:3000/item/delete/${item_id}`
      );
      console.log("after deleting is", res);
    } catch (err) {
      console.log("errow while deleting", err);
    }
  }
  async function orders() {
    try {
      const res = await authAxios.get("http://localhost:3000/user/profile");
      // console.log("order res is", res.data);
      setProfile(res.data);
    } catch (err) {
      // console.log("error is", err.response);
      setError(err.response);
    }
  }
  async function items() {
    try {
      const res = await authAxios.get("http://localhost:3000/seller/s9");
      setSellerData(res.data);
    } catch (err) {
      console.log("error in item funtions is", err);
    }
  }
  return (
    <div>
      hello there
      {!userData ? (
        "please Login or signup"
      ) : userData && userData.Token ? (
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
                    onClick={() => navigate(`/${order.item_id}`)}
                  >
                    <h1>{order.item_name}</h1>

                    <h1>{order.price}</h1>
                  </div>
                ))}
          </section>
        </div>
      ) : userData && userData.sellerToken ? (
        <div className="flex ">
          {/* <h1>add item</h1> */}
          {sellerData.items &&
            sellerData.items.map((item) => (
              <div
                key={item.id}
                className="border-2 m-2 p-5 rounded-tr-2xl rounded-tl-2xl hover:shadow-xl"
              >
                <h1>{item.item_name}</h1>
                <h1>{item.price}</h1>
                <h1>{item.stock}</h1>
                <button
                  className="border-2 p-2 mt-2 rounded-xl text-white bg-red-500 hover:bg-red-600 "
                  onClick={() => {
                    deleteItem(item.item_id);
                    // if (delref.current) {
                    //   console.log(delref.current);
                    //   delref.current.Style.display = "none";
                    // }
                  }}
                >
                  delete
                </button>
                <button
                  className="border-2 p-2 mt-2 rounded-xl text-white bg-cyan-600 hover:bg-cyan-700 "
                  onClick={() => {
                    navigate(`/seller/updateitem/${item.item_id}`, {
                      replace: true,
                    });
                  }}
                >
                  update
                </button>
              </div>
            ))}
        </div>
      ) : (
        "hbhbhbhbhb"
      )}
    </div>
  );
}

export default Profile;
