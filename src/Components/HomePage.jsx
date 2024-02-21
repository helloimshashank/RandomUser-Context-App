import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userDetails from "../contexts/userContext";
import useFetch from "../UseFetch";

import themeMode from "../contexts/themeContext";
function HomePage() {
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();
  const { logOut, userData, login } = useContext(userDetails);
  const { themes } = useContext(themeMode);
  console.log("current theme is", themes.themeColor);
  const { data, loading, refetch } = useFetch(
    "http://localhost:3000/item/show"
  );

  useEffect(() => {
    if (data && data.items) {
      setItemData(data.items);
      console.log("itemData is", itemData);
      itemData.map((item) => {
        console.log(item.id);
      });
    }
  }, [data, loading]);
  return (
    <div className="mx-3  h-96 w-96  ">
      <h2>home page</h2>

      {userData ? (
        <>
          {/* <img
            src={
              userData &&
              userData.results[0].picture.large &&
              userData.results[0].picture.large
            }
            alt="user image"
            className="rounded-full"
          /> */}
          <div className=" flex gap-3 mt-3 ">
            {itemData.map((item) => (
              <div
                key={item.id}
                className={`border-2 p-8 rounded-xl shadow-xl ${
                  themes.themeColor == "light"
                    ? "bg-gradient-to-bl from-green-200 to-green-400 "
                    : ""
                }  ${
                  themes.themeColor == "dark"
                    ? " bg-gradient-to-br from-transparent to-green-900"
                    : ""
                }`}
                onClick={() => navigate(`/${item.item_id}`)}
              >
                <h2>{item.item_name}</h2>
                <h3>price:{item.price}</h3>
                <h3>
                  {item.stock < 15 ? (
                    <span className="font-semibold text-red-700">{`only ${item.stock} left  `}</span>
                  ) : (
                    <span className="font-semibold text-green-700">
                      in stock
                    </span>
                  )}
                </h3>
                <br />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3>
          please <NavLink to="/login">LOGIN</NavLink>
        </h3>
      )}
    </div>
  );
}

export default HomePage;
