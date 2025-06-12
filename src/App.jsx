import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import "./App.css";
import Navbar from "./Components/Navbar";
import Contactcard from "./Components/Contactcard";
import Model from "./Components/Model";
import Model2 from "./Components/Model2";

function App() {
  const [contacts, setContacts] = useState([]);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(null);
  const [delete1, setDelete] = useState(false);
  const [searchquery, setSearchquery] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      try {
        const ContactsRef = collection(db, "Contact");
        const Contactsnapshot = await getDocs(ContactsRef);
        const ContactList = Contactsnapshot.docs.map((docs) => {
          return {
            id: docs.id,
            ...docs.data(),
          };
        });
        setContacts(ContactList);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, [add, update, delete1]);

  const filteredcontacts = contacts.filter((contact) =>
    contact.Name.toLowerCase().includes(searchquery.toLowerCase())
  );

  return (
    <div className="max-w-[370px] mx-auto relative">
      <Navbar />
      <div className="search flex relative items-center mt-4">
        <FiSearch className="text-white text-2xl absolute ml-3" />
        <input
          type="text"
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)}
          className="border border-white rounded-[10px] flex-grow text-white font-normal text-[16px] pl-11 py-1.75"
          placeholder="Search Contact"
        />
        <FiPlus
          onClick={() => {
            setAdd(!add);
          }}
          className="bg-white text-5xl p-2 rounded-4xl ml-2 cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-2 mt-5 relative">
        {add && <Model name="Add Contact" setAdd={setAdd} />}
        {update && (
          <Model2
            name="Update Contact"
            update={update}
            setUpdate={setUpdate}
          />
        )}
       {filteredcontacts.length > 0 ? (
          filteredcontacts.map((contact) => (
            <Contactcard
              key={contact.id}
              contact={contact}
              update={update}
              setUpdate={setUpdate}
              setDelete={setDelete}
              delete={delete1}
            />
          ))
        ) : (
          <div className="flex items-center justify-center gap-3 h-[70vh]">
            <img src="Images/HandsContact.png" alt="" />
          <p className="text-white text-center mt-4 font-semibold text-2xl">No Contacts Found</p>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-center" closeOnClick pauseOnFocusLoss={false} />
    </div>
  );
}

export default App;
