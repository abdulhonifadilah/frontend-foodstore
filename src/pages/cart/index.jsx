import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getToCart } from "../../app/features/cart/actions";
import { getAddresses } from "../../app/features/address/actions";
import CartItem from "../../components/cartitem";
import { createOrders, setFormOrder } from "../../app/features/order/actions";
import { Btn } from "../../components/atoms/button";
import Navbar from "../../components/nav";

export default function Cart() {
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let address = useSelector((state) => state.address);
  let order = useSelector((state) => state.order);
  const [Open, setOpen] = useState(false);
  const [detailAddress, setdetailAddress] = useState(false);
  const [detail, setdetail] = useState({ name: "" });
  let { status } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getToCart());
    dispatch(getAddresses());
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(getToCart());
    };
  }, [cart.loading, dispatch]);

  return (
    <Navbar>
      <div className="container">
        <div className="flex justify-center flex-col items-center mt-8 px-4">
          <h3 className="font-bold text-3xl">Cart</h3>
          {!status ? 
            <p className="mt-6 w-full text-center h-40">Loading.....</p>
           : (cart.data.length  ? (
            <div className={`flex flex-col mt-6`}>
              {cart.data.map((e, i) => {
                return (
                  <div className="w-full" key={i}>
                    <CartItem data={e} />
                  </div>
                );
              })}
              <div className="flex justify-start mt-3 gap-2 mb-2">
                <div className="text-right w-1/4">
                  <div className="relative flex-col bg-gray-100 rounded-sm">
                    <div className="border flex items-center justify-end rounded">
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(!Open);
                        }}
                        className="flex justify-between w-full items-center px-1 py-0.5 capitalize h-7"
                      >
                        {detail.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className={`${
                        Open ? "absolute" : "hidden"
                      } absolute items-start w-full bg-gray-100 rounded-b-md`}
                    >
                      <ul className={` w-full justify-center`}>
                        {address.data.map((e, i) => {
                          return (
                            <li
                              key={i}
                              className=" border hover:bg-gray-50 border-gray-300"
                            >
                              <button
                                className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                                onClick={() => {
                                  setOpen(false);
                                  setdetail(e);
                                  dispatch(
                                    setFormOrder("delivery_address", e._id)
                                  );
                                  setdetailAddress(true);
                                }}
                              >
                                {e.name}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                {detailAddress && (
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col bg-white rounded w-full p-2">
                      <p>{detail.name}</p>
                      <p>
                        kelurahan {detail.kelurahan} kecamatan{" "}
                        {detail.kecamatan}
                      </p>
                      <p>
                        {detail.kabupaten} {detail.provinsi}
                      </p>
                    </div>
                    <div className="w-full justify-end mt-3 flex text-right">
                      <p className="">
                        Biaya Pengiriman : {order.form.delivery_fee}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <Btn
                label="Checkout"
                color="bg-blue-500"
                onClick={() => dispatch(createOrders(order.form))}
              />
            </div>
          ) : <p className="mt-3 text-red-500 underline">Tidak ada pesanan</p>)
          }
        </div>
      </div>
    </Navbar>
  );
}
