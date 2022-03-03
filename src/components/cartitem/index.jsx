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
      <div className="w-full border-b bg-white">
        <div className="flex justify-between items-center border-b-2 border-gray-300">
          <div className="flex items-center">
            <img src={`https://backend-foodstore.herokuapp.com/images/products/${val.image_url}`} alt="gambar" className="w-24 h-24 md:w-32 md:h-32 mr-3 bg-gray-200" />
          <div className="mr-0 md:mr-20 ">
            <ul>
              <li>
                <h3 className="md:text-xl font-semibold capitalize">{val.name}</h3>
              </li>
              <li className="text-sm md:text-lg">{val.price}</li>
            </ul>
          </div>
          </div>
          
          <div className="flex justify-center items-center ml-12 gap-3 mx-2">
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
