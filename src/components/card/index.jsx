import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getToCart } from "../../app/features/cart/actions";

export default function Card(data) {
  const dispatch = useDispatch();
  const [view, setView] = useState(false)
  let val = data.data;
  const handlePlus = () => {
    dispatch(addToCart({ product: val, qty: 1 }));
    // console.log(val);
  };
  let cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getToCart());
  }, [cart.data, dispatch, val.name]);


  // useEffect(() => {
  //   cart.data.filter((e)=>e.name === val.name && setView(true))
  // }, [cart.data, val.name])
  
  


  return (
    <>
      <div className="w-52 h-72 flex flex-col justify-between bg-white rounded overflow-hidden shadow-md">
        {view && <div className="absolute bg-gray-200 w-52 h-72 text-center items-center bg-opacity-50">
          <p className="mt-20 font-bold text-xl">Sudah masuk ke keranjang</p>
        </div>}
        
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
          className="bg-red-500 py-1 font-bold text-lg text-white hover:opacity-90"
        >
          Pesan
        </button>
      </div>
    </>
  );
}
