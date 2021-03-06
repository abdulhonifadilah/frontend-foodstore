import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../app/features/auth/actions";
import * as Validator from "validatorjs";
import Navbar from "../../components/nav"

let form = {
  full_name: "",
  email: "",
  password: "",
};

export default function Register() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const navigate = useNavigate();
  const [message, setmessage] = useState([])
  useEffect(() => {
    if(loggedIn){
     navigate("/")
    }
  }, [loggedIn, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    let rules = {
      full_name: "required",
      email: "required|email",
      password: "required|min:6",
    };

    let validation = new Validator(form, rules, {
      required: {
        string: ":attribute harus di isi",
      },
      email: {
        string: "email ada yang salah",
      },
      min: {
        string: ":attribute minimal :min kata",
      },
    });

    validation.passes(() =>
    dispatch(userRegister(form))
    ); // true

    validation.fails(() => 
        setmessage([
          ...validation.errors.get("nama"),
          ...validation.errors.get("email"),
          ...validation.errors.get("password"),
        ])
    ); // false
  }

  return (
    <Navbar>
      <div className="flex w-full mt-20 justify-center items-center">
      <div className="flex flex-col w-[25rem] my-auto bg-white rounded-md shadow-md">
        <h5 className="font-bold w-full text-center pt-3 text-2xl">
          <span className="text-red-500">Re</span>gister
        </h5>
        <p className="w-full text-center text-red-500">{message[0]}</p>

        <form onSubmit={handleSubmit} action="" className="flex flex-col px-3 py-5">
          <label htmlFor="">Nama Lengkap</label>
          <input
            onChange={(e) => form.full_name = e.target.value.toLowerCase()}
            type="text"
            className="w-full border-2 border-gray-600 mb-2 focus:outline-gray-800 p-1 rounded-md"
          />
          <label htmlFor="">Email</label>
          <input
            onChange={(e) => form.email = e.target.value.toLowerCase()}
            type="text"
            className="w-full border-2 border-gray-600 mb-2 focus:outline-gray-800 p-1 rounded-md"
          />
          <label htmlFor="">Password</label>
          <input
            onChange={(e) => form.password = e.target.value.toLowerCase()}
            type="password"
            className="w-full border-2 border-gray-600 mb-4 focus:outline-gray-800 p-1 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:opacity-80"
          >
            Register
          </button>
          <p className="mt-5 w-full text-center font-semibold underline hover:opacity-80">
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
    </Navbar>
    
  );
}
