import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/features/cart/actions";

export default function Card(data) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  let val = data.data;
  const handlePlus = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      navigate("/login");
    }else{
      dispatch(addToCart({ product: val, qty: 1 }));
    }
  };
let {loading}= useSelector(state=>state.cart)
  return (
    <>
      <div className={`${loading && 'cursor-progress'} w-52 h-72 flex flex-col justify-between bg-white rounded overflow-hidden shadow-md`}>
        <div className="header">
          <img
            src={`https://backend-foodstore.herokuapp.com/images/products/${val.image_url}`}
            alt=""
            className="w-full h-36"
          />
          <div className="heading mx-1">
            <h5 className="font-semibold capitalize text-xl">{val.name}</h5>
            <p>{val.category.name}</p>
            <div className="flex gap-1">
              {val.tags.map((e, i) => (
                <p key={i}>{e.name}</p>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handlePlus}
          className={`${loading && 'cursor-progress'} bg-red-500 py-1 font-bold text-lg text-white hover:opacity-90`}
        >
          Pesan
        </button>
      </div>
    </>
  );
}
