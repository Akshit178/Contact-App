import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const Model = ({ name, setAdd }) => {
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = async () => {
    if (!contact || !email) {
      alert("Please enter Name and Email");
      return;
    }
    try {
      await addDoc(collection(db, "Contact"), {
        Name: contact,
        email: email,
      });
      toast.success("Added Successfully");
      setAdd(false);
    } catch (error) {
      console.log("error adding", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="bg-white p-3 w-90 mx-auto absolute left-1.25 rounded-sm">
      <h1 className="m-2 cursor-default">Name</h1>
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border w-full"
      />
      <h1 className="m-2 mt-3 cursor-default">E-mail</h1>
      <input
        type="email"
        value={email}
        onKeyDown={handleKeyDown}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full"
      />

      <div className="flex gap-2 justify-end mt-5">
        <button
          onClick={handleAdd}
          className="bg-dark-yellow border px-2 rounded-sm cursor-pointer"
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default Model;
