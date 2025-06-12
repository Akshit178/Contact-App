import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase"
import { toast } from "react-toastify";

const Contactcard = ({ contact, update, setUpdate, setDelete, delete1 }) => {
  const handledelete = async () => {
    try {
      await deleteDoc(doc(db, "Contact", contact.id));
      toast.success("Deleted Successfully");
      setDelete(!delete1);
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  const handleedit = async () => {
    setUpdate({
      id: contact.id,
      name: contact.Name,
      email: contact.email,
    });
  };

  return (
    <div
      key={contact.id}
      className="flex items-center justify-between bg-yellow px-1 py-2 rounded-2xl"
    >
      <div className="flex items-center gap-2">
        <HiOutlineUserCircle className="text-[43px] text-orange" />
        <div className="text-black">
          <h1 className="font-medium">{contact.Name}</h1>
          <p className="text-sm">{contact.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <MdEdit onClick={handleedit} className="text-[32px] cursor-pointer" />
        <IoMdTrash
          onClick={handledelete}
          className="text-[32px] text-[#5F00D9] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Contactcard;
