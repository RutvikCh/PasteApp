// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <div className='flex flex-row place-content-evenly bg-blue-950 text-white text-2xl  p-4  '>
//         <NavLink to={"/"}>
//             Home
//         </NavLink>
//         <NavLink to={"/Pastes"}>
//             All Pastes
//         </NavLink>
//     </div>
//   )
// }

// export default Navbar
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-5 shadow-lg">
      <nav className="flex space-x-10 text-white text-xl font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
              isActive ? "bg-white text-blue-900 font-bold" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/Pastes"
          className={({ isActive }) =>
            `px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
              isActive ? "bg-white text-blue-900 font-bold" : ""
            }`
          }
        >
          All Pastes
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

