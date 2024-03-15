import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function BuyModal({ buyMod, itemData }) {
  var local = JSON.parse(localStorage.getItem("userData"));
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${local.Token}`,
    },
  });
  const modalRef = useRef();
  const [stock, setStock] = useState(1);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const { itemId } = useParams();
  async function buyItem() {
    authAxios
      .post(
        `http://localhost:3000/user/buy/${itemId}`,
        { stock },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log("after buying", data.data);
        setResult(data.data.message);
        setLoading(true);
      })
      .catch((err) => {
        setResult(err.response.data.message);
        console.log("error while buying", err);
      })
      .finally(() => setLoading(false));
  }
  const closeModal = (e) => {
    console.log("ran");
    if (modalRef.current === e.target) {
      console.log(modalRef.current.style, "curent");
      console.log(e.target, "target");
      buyMod();
    }
  };
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={closeModal}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buyItem();
        }}
        className="border-2 p-10 rounded-2xl bg-gradient-to-br from-transparent to-slate-500 "
      >
        <div className="flex flex-col gap-3">
          <span
            className="bg-red-950 p-1 place-self-end cursor-pointer text-white rounded-full"
            onClick={buyMod}
          >
            close
          </span>
          <span>{itemData.item.item_name}</span>
          <span>{itemData.item.price * stock}</span>
          <input
            type="number"
            className=" bg-transparent text-center border-2"
            placeholder="enter the stock"
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <button
            className={`border-2 px-3 py-2 rounded-2xl ${
              loading ? "bg-slate-500" : ""
            }`}
            disabled={loading}
          >
            buy
          </button>
        </div>

        {result}
      </form>
    </div>
  );
}

export default BuyModal;
