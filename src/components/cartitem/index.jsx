import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/actions";

export default function CartItem(data) {
  let val = data.data;
  const dispatch=useDispatch();
  const handlePlus=()=>{
    dispatch(addToCart({product:val.product, qty:val.qty + 1}))
  }
  const handleMin=()=>{
    if(val.qty>1){
      dispatch(addToCart({product:val.product, qty:val.qty - 1}))
    }
  }
  return (
    <>
      <div className="border-b bg-white">
        <div className="flex flex-row items-center pr-2 border-b-2 border-gray-300">
          <img src={`http://localhost:3000/images/products/${val.image_url}`} alt="gambar" className="w-32 h-32 mr-5 bg-gray-200" />
          <div className="w-72">
            <ul>
              <li>
                <h3 className="text-xl font-semibold capitalize">{val.name}</h3>
              </li>
              <li>{val.category}</li>
              <li>{val.price}</li>
            </ul>
          </div>
          <div className="flex justify-center items-center ml-12 gap-3">
            <button onClick={handleMin} className="h-6 w-6 bg-gray-400 hover:shadow-md hover:opacity-80">
              -
            </button>
            <p>{val.qty}</p>
            <button onClick={handlePlus} className="h-6 w-6 bg-green-500 hover:shadow-md hover:opacity-80">
              +
            </button>
          </div>
        </div>
        <p className="w-full text-right py-2 px-3 font-semibold">
          harga: {val.qty * val.price}
        </p>
      </div>
    </>
  );
}
