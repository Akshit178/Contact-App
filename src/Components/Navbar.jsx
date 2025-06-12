import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="upper flex items-center justify-center gap-1 bg-white my-2 p-4 rounded-[10px]">
        <div className="image">
          <img src="Images/logos_firebase.svg" alt="" />
        </div>
        <h1 className="text font-bold text-xl">
          Firebase Contact App
        </h1>
      </div>
    </div>
  )
}

export default Navbar
