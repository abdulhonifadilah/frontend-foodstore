import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/features/cart/actions";
import { closeDetail, openDetail } from "../../app/features/product/actions";

export default function Card(data) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  let val = data.data;
  const handlePlus = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      navigate("/login");
    } else {
      dispatch(addToCart({ product: val, qty: 1 }));
    }
  };
  let { loading } = useSelector((state) => state.cart);
  return (
    <>
      <div
        className={`${
          loading && "cursor-progress"
        } w-52 h-72 flex flex-col justify-between bg-white rounded overflow-hidden shadow-md`}
      >
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
        <div className="flex w-full">
          <button
            onClick={() => dispatch(openDetail(val))}
            className={`${
              loading && "cursor-progress"
            } py-1 font-semibold text-yellow-400 hover:underline w-1/2 border-t border-yellow-400`}
          >
            Detail
          </button>
          <button
            onClick={handlePlus}
            className={`${
              loading && "cursor-progress"
            } bg-red-500 py-1 font-semibold text-white hover:opacity-80 w-1/2`}
          >
            Pesan
          </button>
        </div>
      </div>
    </>
  );
}

export function CardDetail() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const { data } = useSelector((state) => state.product.detail);
  const navigate = useNavigate();
  const handlePlus = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      navigate("/login");
    } else {
      dispatch(addToCart({ product: data, qty: 1 }));
    }
  };
  let { loading } = useSelector((state) => state.cart);
  return (
    <>
      <div className="w-full h-screen bg-gray-400 flex justify-center items-center fixed bg-opacity-50">
        <div className="flex flex-col fixed bg-white z-20">
          <button
            onClick={() => dispatch(closeDetail())}
            className="px-3 rounded-full absolute w-full text-right text-xl hover:font-semibold"
          >
            x
          </button>
          <div class="flex flex-col md:flex-row font-sans">
            <div class="md:w-52 w-full flex justify-center items-center md:px-4 px-0">
              <img
                src={`https://backend-foodstore.herokuapp.com/images/products/${data.image_url}`}
                alt=""
                class=" h-40 object-cover bg-gray-300 w-full"
              />
            </div>
            <div class="flex flex-col justify-between p-3">
              <div class="flex flex-col gap-1">
                <h1 class="flex-auto text-xl font-bold text-slate-900">
                  {data.name}
                </h1>
                <div class="w-full flex-none font-medium text-slate-700 mt-2">
                  {data.category.name}
                </div>
                <div className="flex">
                  {data.tags.map((e, i) => (
                    <p
                      key={i}
                      className="bg-yellow-500 px-2 rounded-full text-white text-sm"
                    >
                      {e.name}
                    </p>
                  ))}
                </div>
                <div className="flex w-64 text-justify overflow-x-auto h-20">
                  <p>
                    {data.description}
                  </p>
                </div>
              </div>
              <div class="flex mt-3 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button
                    onClick={handlePlus}
                    className={`${
                      loading && "cursor-progress"
                    } bg-red-500 py-1 font-semibold text-lg text-white hover:opacity-90 px-3 rounded-md`}
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`${loading && 'cursor-progress'} w-52 h-72 md:w-64 md:h-96 md:72 flex flex-col justify-between bg-white rounded overflow-hidden shadow-md`}>
        <div className="header">
          <img
            src={``}
            alt=""
            className="w-full h-36 md:h-48"
          />
          <div className="heading mx-1">
            <label htmlFor="">Nama <h5 className="font-semibold capitalize text-xl">Pizza</h5></label>
            <label htmlFor="">Category :<p>pizza</p></label>
            <label htmlFor="">Tags</label>
            {/* <div className="flex gap-1">
              {val.tags.map((e, i) => (
                <p key={i}>{e.name}</p>
              ))}
            </div> */}
      {/* <label htmlFor="">Description : <p>description</p></label>
          </div> */}
      {/* </div>
        <button
          // onClick={handlePlus}
          className={`${loading && 'cursor-progress'} bg-red-500 py-1 font-bold text-lg text-white hover:opacity-90`}
        >
          Pesan
        </button> */}
      {/* </div> */}
    </>
  );
}
