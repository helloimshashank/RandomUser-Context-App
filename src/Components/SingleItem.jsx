import React, { useContext, useEffect, useState } from "react";
import useFetch from "../UseFetch";
import { NavLink, useParams } from "react-router-dom";
import userDetails from "../contexts/userContext";
import axios from "axios";

function singleItem() {
  var local = JSON.parse(localStorage.getItem("userData"));
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${local.Token}`,
    },
  });

  const [itemDet, setItemDet] = useState({});
  const [stock, setStock] = useState(1);
  const [result, setResult] = useState("");
  const params = useParams();
  var itemId = params.itemId;
  const { data } = useFetch(`http://localhost:3000/item/${itemId}`);
  const { userData } = useContext(userDetails);
  async function buyItem() {
    try {
      const data = await authAxios.post(
        `http://localhost:3000/user/buy/${itemId}`,
        { stock },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("after buying", data.data);
      setResult(data.data.message);
    } catch (err) {
      console.log("error while buying", err);
      setResult(err.response.data.message);
    }
  }
  console.log("result is", result);
  useEffect(() => {
    if (data) {
      setItemDet(data);
      console.log("inside", data.item);
      console.log("state data is", itemDet);
    }
  }, [data]);
  return (
    <div>
      {itemDet && itemDet.item ? (
        <>
          <h1>itemName:{itemDet.item.item_name}</h1>
          <h1>price:{itemDet.item.price * stock}</h1>
          <span>only {itemDet.item.stock}left</span>
          <input
            type="number"
            className=" bg-transparent text-center border-2"
            placeholder="enter the stock"
            onChange={(e) => setStock(e.target.value)}
          />
          {userData && userData.Token ? (
            <button
              className="border-2 px-3 py-2 rounded-2xl"
              onClick={buyItem}
            >
              buy
            </button>
          ) : (
            <NavLink to="/login">please Login to buy</NavLink>
          )}
          <br></br> <span>{result}</span>
        </>
      ) : (
        "couldnt find item"
      )}
    </div>
  );
}

export default singleItem;
