import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/actions";

export default function Card(data,name) {
  const dispatch = useDispatch();
  let val = data.data;
  const handlePlus=()=>{
    dispatch(addToCart({product: val, qty:1}))
    // console.log(val);
  }
  return (
    <>
      <div className="w-52 h-72 flex flex-col justify-between bg-white rounded overflow-hidden shadow-md">
          <div className="header">
            <img src={`http://localhost:3000/images/products/${val.image_url}`} alt="" className="w-full h-36"/>
            <div className="heading mx-1">
              <h5 className="font-semibold capitalize text-xl">{val.name}</h5>
              <p>{val.category.name}</p>
              <div className="flex gap-1">
                {
                val.tags.map((e,i)=><p key={i}>{e.name}</p>)
              }
              </div>
              
              
            </div>
          </div>
          <button onClick={handlePlus} className="bg-red-500 py-1 font-bold text-lg text-white hover:opacity-90">Pesan</button>
      </div>
    </>
  );
}
