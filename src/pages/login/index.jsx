import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../app/features/auth/actions";
import Navbar from "../../components/nav";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispath = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if(loggedIn){
     navigate("/")
    }
  }, [loggedIn, navigate]);
  
  const handleLogin = async(e) => {
    e.preventDefault()
    dispath(userLoggedIn({email, password}))
  };
  return (
    <Navbar>
      <div className="flex w-full mt-20 justify-center items-center">
      <div className="flex flex-col w-[25rem] my-auto bg-white rounded-md shadow-md">
        <h5 className="font-bold w-full text-center pt-3 text-2xl">
          <span className="text-red-500">Lo</span>gin
        </h5>
        <form onSubmit={handleLogin} className="flex flex-col px-3 py-5">
          <label htmlFor="">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            type="text"
            className="w-full border-2 border-gray-600 mb-2 focus:outline-gray-800 p-1 rounded-md"
          />
          <label htmlFor="">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value.toLowerCase())}
            type="password"
            className="w-full border-2 border-gray-600 mb-4 focus:outline-gray-800 p-1 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:opacity-80"
          >
            Login
          </button>
          <p className="mt-5 w-full text-center font-semibold underline hover:opacity-80"><Link to="/register">Register</Link></p>
          
        </form>
      </div>
    </div>
    </Navbar>
    
  );
}
