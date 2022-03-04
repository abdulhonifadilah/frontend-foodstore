import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getOrdersById,
} from "../../app/features/order/actions";

export default function Invoice() {
  const [detail, setDetail] = useState(false);
  const dispatch = useDispatch();
  let { invoice, order } = useSelector((state) => state.order);

  return (
    <div className="flex flex-col items-center justify-center border rounded-md px-2 py-3 md:w-full w-[40rem]">
      <h1 className="font-semibold text-xl mb-3">Invoice</h1>
      <table className="w-full text-center">
        <thead className="font-normal text-gray-800 border-y-2">
          <tr>
            <th></th>
            <th className="py-2">Order-Id</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="border-b">
          {invoice.data.length > 0 && invoice.data.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <button
                    onClick={() => {
                      dispatch(getOrdersById(e.order._id));
                      setDetail(!detail);
                    }}
                  >
                    +
                  </button>
                </td>
                <td className="py-2">#{e.order.order_number}</td>
                <td>{e.total}</td>
                <td>{e.payment_status}</td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {detail && order.status && (
        <table className="w-full text-center">
          <thead className="font-normal text-gray-800 border-y-2">
            <tr>
              <th className="w-1/4">Name</th>
              <th className="py-2">Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.data.map((e, i) => {
              return (
                <tr className="border-y-2" key={i}>
                  <td className="py-2">{e.name}</td>
                  <td>{e.price}</td>
                  <td>{e.qty}</td>
                  <td>{e.qty * e.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!invoice.status &&<p className="mt-6 w-full text-center h-40">Loading.....</p>}
    </div>
  );
}
