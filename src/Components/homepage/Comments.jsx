import React, { useContext } from "react";
import { useState, useEffect } from "react";
import useFetch from "../../UseFetch";
import { useParams } from "react-router-dom";
import axios from "axios";
import userDetails from "../../contexts/userContext";
export default function Comments() {
  var local = JSON.parse(localStorage.getItem("userData"));
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: `bearer ${local.Token}`,
    },
  });
  const { userData } = useContext(userDetails);
  const params = useParams();
  var itemId = params.itemId;
  const [comment, setComment] = useState("");
  const [totalComments, setTotalComments] = useState([]);
  const { data: comments, refetch: refetchComment } = useFetch(
    `http://localhost:3000/item/comment/${itemId}`
  );
  async function addComment(e) {
    e.preventDefault();
    try {
      const res = await authAxios.post(
        `http://localhost:3000/item/comment/${itemId}`,
        {
          comment,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("result is", res);
      refetchComment();
    } catch (err) {
      console.log("error while commenting", err);
    }
  }
  useEffect(() => {
    if (comments && comments.result) setTotalComments(comments.result);
  }, [comments]);
  return (
    <>
      <h1>comments</h1>
      <form className=" flex mb-3" onSubmit={addComment}>
        <textarea
          className="w-72 h-9"
          placeholder="add a comment"
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button className="h-10 ml-4 border-2 p-2 text-white bg-green-200">
          post
        </button>
      </form>

      {totalComments.map((comment) => (
        <div key={comment.comment_id} className="flex-col border-2">
          <h1>{comment.customer_name}</h1>
          <p>{comment.comment}</p>
          {userData.sellerToken ? <button>delete</button> : ""}
        </div>
      ))}
    </>
  );
}
