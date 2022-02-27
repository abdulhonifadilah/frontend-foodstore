import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const {loggedIn} = useSelector(state=> state.auth)
  return (
    <nav className="container flex flex-row justify-center items-center h-12">
      <div className="bg-white flex h-full items-center px-4">
        <Link to="/">
          <h3 className="mr-auto w-[35rem] font-bold text-xl">
            <span className="text-red-500">Food</span>Store
          </h3>
        </Link>
        <div className="cart mr-4">
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </Link>
        </div>
        <div className="profil">
        <Link to="/profil">{loggedIn ? 'Profil' : 'Login'}</Link>
        </div>
      </div>
    </nav>
  );
}
