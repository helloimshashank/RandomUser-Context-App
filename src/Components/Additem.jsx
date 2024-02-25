import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, redirect, useParams } from "react-router-dom";
function Additem() {
  // const [itemid, setitemId] = useState("");
  const [itemname, setitemName] = useState("");
  const [price, setprice] = useState();
  const [stock, setStock] = useState();
  const [result, setResult] = useState("");
  const localData = JSON.parse(localStorage.getItem("userData"));
  const { itemId } = useParams();
  useEffect(() => {
    console.log("params is", itemId);
  });
  const authAxios = axios.create({
    baseURL: "http://localhost:3000/seller/additem",
    headers: {
      Authorization: `Bearer ${localData.sellerToken}`,
    },
  });
  async function additem(e) {
    e.preventDefault();
    let uuid = crypto.randomUUID();
    let iappended = "I" + uuid;
    let itemid = iappended.substring(0, 8);
    if (itemId) {
      try {
        const res = await authAxios.patch(
          `http://localhost:3000/item/update/${itemId}`,
          { itemname, price, stock },
          { headers: { "Content-Type": "application/json" } }
        );
        // if (res.status == "200") {
        //   return redirect("/profile");
        // }
        console.log("updated item", res);

        setResult(res.data.message);
      } catch (err) {
        console.log("error while updating", err);
        setResult(err);
      }
    } else {
      try {
        const res = await authAxios.post(
          "",
          { itemid, itemname, price, stock },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        setResult(res.data.message);
        setStock("");
        setitemName("");
        setprice("");
      } catch (err) {
        console.log("error while adding item", err);
        setResult(err.response.data.message);
      }
    }
    // setitemId(subitemid);
  }
  useEffect(() => {
    console.log("localdata", localData);
  });
  return (
    <div>
      <form onSubmit={additem}>
        <input
          type="text"
          placeholder="enter item name"
          value={itemname}
          onChange={(e) => setitemName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="enter item price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="enter stock"
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button>ADD ITEM</button>
      </form>
      <h1>{result}</h1>
    </div>
  );
}

export default Additem;
