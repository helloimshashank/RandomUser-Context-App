import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../UseFetch";
import { NavLink, useParams } from "react-router-dom";
import userDetails from "../../contexts/userContext";
import axios from "axios";
import Comments from "./Comments";
import BuyModal from "../Modals/BuyModal";

function singleItem() {
  var local = JSON.parse(localStorage.getItem("userData"));
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${local.Token}`,
    },
  });
  const { itemId } = useParams();
  const [itemDet, setItemDet] = useState({});
  const [buyMod, setBuyMod] = useState(false);
  const { data } = useFetch(`http://localhost:3000/item/${itemId}`);
  const { userData } = useContext(userDetails);
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
          <span>only {itemDet.item.stock}left</span>
          <h1>soldby {itemDet.soldby.s_name}</h1>
          {userData && userData.Token ? (
            <button
              onClick={() => setBuyMod(!buyMod)}
              className="border-2 p-2 rounded-xl"
            >
              purchase
            </button>
          ) : (
            <NavLink to="/login">please Login to buy</NavLink>
          )}
          {buyMod && (
            <BuyModal
              buyMod={() => {
                setBuyMod(false);
              }}
              itemData={itemDet}
            />
          )}
          <br></br>
          <Comments />
        </>
      ) : (
        "couldnt find item"
      )}
    </div>
  );
}

export default singleItem;
