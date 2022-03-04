import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/actions";

export default function Card(data) {
  const dispatch = useDispatch();
  let val = data.data;
  const handlePlus = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product: val, qty: 1 }));
  };
let {status}= useSelector(state=>state.cart)
  return (
    <>
      <div className={`${status && 'cursor-progress'} w-52 h-72 flex flex-col justify-between bg-white rounded overflow-hidden shadow-md`}>
        {/* <div className="absolute w-52 bg-gray-500 bg-opacity-50 justify-center items-center text-center py-10"><p className="my-auto h-full">loading</p></div> */}
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
          className={`${status && 'cursor-progress'} bg-red-500 py-1 font-bold text-lg text-white hover:opacity-90`}
        >
          Pesan
        </button>
      </div>
    </>
  );
}
