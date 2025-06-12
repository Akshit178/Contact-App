import React, { useEffect } from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const Model = ({ name, update, setUpdate }) => {
  const [contact1, setContact] = useState("");
  const [email1, setEmail] = useState("");

  useEffect(() => {
    if (update?.id) {
      setContact(update.name || "");
      setEmail(update.email || "");
    }
  }, [update]);

  const handlesubmit = async () => {
    try {
      await updateDoc(doc(db, "Contact", update.id), {
        Name: contact1,
        email: email1,
      });
      toast.success("Updated Successfully");
      setUpdate(null);
    } catch (error) {
      console.log("Error Updating", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlesubmit();
    }
  };

  return (
    <div className="bg-white p-3 w-90 mx-auto absolute left-1.25 rounded-sm">
      <h1 className="m-2 cursor-default">Name</h1>
      <input
        type="text"
        value={contact1}
        onKeyDown={handleKeyDown}
        onChange={(e) => setContact(e.target.value)}
        className="border w-full"
      />
      <h1 className="m-2 mt-3 cursor-default">E-mail</h1>
      <input
        type="email"
        value={email1}
        onKeyDown={handleKeyDown}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full"
      />

      <div className="flex gap-2 justify-end mt-5">
        {update && (
          <button
            onClick={() => {
              setUpdate(null);
            }}
            className="bg-dark-yellow border px-2 rounded-sm cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handlesubmit}
          className="bg-dark-yellow border px-2 rounded-sm cursor-pointer"
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default Model;
