import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAddresses ,getProv, setFormAddress, updateAddresses } from "../../app/features/address/actions";
import {} from '../../app/features/address/actions'
import { DropdownKecamatan, DropdownKelurahan, DropdownKotaKab, DropdownProvinsi } from "../atoms/dropdown";

export default function AddAddress({ setShow }) {
  const dispatch = useDispatch();
  const { form,id,status } = useSelector((state) => state.address);
  const [label, setlabel] = useState("tambah")
  useEffect(() => {
    if(id.length){
      setlabel("edit")
    }
  }, [id.length]);
useEffect(() => {
  return () => {
    if(status){
      setShow(false)
    }
  }
}, [setShow, status])

  const handleSubmit=()=>{
    if(id.length){
      dispatch(updateAddresses(id, form))
    }else{
      dispatch(createAddresses(form));
    }
  }
  return (
    <><h3 className="text-xl font-semibold capitalize text-left w-full mb-2">{label}</h3>
      <div className="flex flex-row w-full mb-2 transition-opacity">
        <div className="flex flex-col w-1/2 gap-2 mr-2">
          <label htmlFor="nama">
            Nama
            <input
              id="nama"
              value={form.name}
              onChange={(e) => (dispatch(setFormAddress("name",e.target.value)))}
              type="text"
              className=" py-1 px-2 border-2 w-full"
              placeholder="nama"
            />
          </label>
          <label htmlFor="detail">
            Detail
            <textarea
              placeholder="detail"
              value={form.detail}
              name=""
              id="detail"
              cols="10"
              rows="6"
              className="px-2 py-1 w-full border-2"
              onChange={(e) => (dispatch(setFormAddress("detail",e.target.value)))}

            ></textarea>
          </label>
        </div>
        <div className="flex flex-col justify-between gap-2 w-1/2">
          <DropdownProvinsi/>
          <DropdownKotaKab/>
          <DropdownKecamatan/>
          <DropdownKelurahan/>
        </div>
      </div>
      <div className="flex justify-start mr-auto gap-2">
        <button
          onClick={() => setShow(false)}
          className="w-20 py-1 bg-gray-400 mb-2 text-white font-semibold rounded-md mr-auto hover:opacity-80 hover:shadow-md"
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          className="w-20 py-1 bg-green-400 mb-2 text-white font-semibold rounded-md mr-auto hover:opacity-80 hover:shadow-md"
        >
          save
        </button>
      </div>
    </>
  );
}
