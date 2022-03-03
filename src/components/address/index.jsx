import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteAddresses,
  getAddresses,
  setFormAddress,
  setIdAddresses,
} from "../../app/features/address/actions";
import { Btn } from "../atoms/button";
import { InputAddress } from "../input";

export default function Address() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  let { data, status } = useSelector((state) => state.address);
  useEffect(() => {
    return () => {
    dispatch(getAddresses());
    }
  }, [dispatch, status])
  
  const handleDelete = (id) => {
    if (window.confirm("apakah anda yakin")) {
      dispatch(deleteAddresses(id));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center md:border rounded-md px-4 py-3 w-full">
      <h1 className="font-semibold text-xl mb-3">Address</h1>
      {show ? (
        <>
          <InputAddress setShow={setShow} />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setShow(true);
              dispatch(setIdAddresses(""));
            }}
            className="px-2 py-1 bg-red-500 mb-2 text-white font-semibold rounded-md mr-auto hover:opacity-80 hover:shadow-md"
          >
            Tambah Alamat
          </button>
          <table className="text-center md:w-full w-[40rem]">
            <thead className="border-y-2">
              <tr>
                <th className="py-2 w-1/3">Nama</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {data.map((e, i) => {
                return (
                  <tr key={i} className="border-b">
                    <td className="py-2">{e.name}</td>
                    <td>{`${e.kelurahan} kecamatan ${e.kecamatan} ${e.kabupaten} ${e.provinsi}`}</td>
                    <td className="gap-2 flex justify-center">
                      <Btn
                        label="Edit"
                        color="bg-green-500"
                        onClick={() => {
                          dispatch(setIdAddresses(e._id));
                          dispatch(setFormAddress("name", e.name));
                          dispatch(setFormAddress("detail", e.detail));
                          dispatch(setFormAddress("provinsi", e.provinsi));
                          dispatch(setFormAddress("kabupaten", e.kabupaten));
                          dispatch(setFormAddress("kecamatan", e.kecamatan));
                          dispatch(setFormAddress("kelurahan", e.kelurahan));
                          setShow(true);
                        }}
                      />
                      <Btn
                        label="Hapus"
                        color="bg-red-500"
                        onClick={() => handleDelete(e._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
