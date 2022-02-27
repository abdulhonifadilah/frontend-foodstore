import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getKecamatan,
  getKelurahan,
  getKotaKab,
  getProv,
  setFormAddress,
} from "../../app/features/address/actions";

export function DropdownProvinsi() {
  const [Open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { provinsi, form } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getProv());
  }, [dispatch]);

  useEffect(() => {
    if (form.provinsi.length) {
      provinsi.data.filter(
        (val) =>
          val.nama.toLowerCase() === form.provinsi.toLowerCase() &&
          dispatch(getKotaKab(val.id))
      );
    }
  }, [dispatch, form.provinsi, provinsi.data]);

  return (
    <>
      <div className="flex flex-col w-full">
        <h3>Provinsi</h3>
        <div className="text-right w-full">
          <div className="relative flex-col bg-gray-100 rounded-sm">
            <div className="border flex items-center justify-end rounded">
              <button
                type="button"
                onClick={() => {
                  setOpen(!Open);
                }}
                className="flex justify-between w-full items-center px-1 py-0.5 capitalize h-7"
              >
                {form.provinsi}
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
                Open ? "absolute z-10" : "hidden"
              } items-start w-full bg-gray-100 rounded-b-md`}
            >
              <ul className="w-full justify-center h-40 overflow-x-scroll">
                {provinsi.data.map((e, i) => {
                  return (
                    <li
                      key={i}
                      className=" border hover:bg-gray-50 border-gray-300"
                    >
                      <button
                        className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                        onClick={() => {
                          dispatch(setFormAddress("provinsi", e.nama.toLowerCase()));
                          dispatch(setFormAddress("kabupaten", ""));
                          dispatch(setFormAddress("kecamatan", ""));
                          dispatch(setFormAddress("kelurahan", ""));
                          setOpen(false);
                        }}
                      >
                        {e.nama}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DropdownKotaKab() {
  const [Open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { kota_kab, form } = useSelector((state) => state.address);

  useEffect(() => {
    if (form.kabupaten.length) {
      kota_kab.data.filter(
        (val) =>
          val.nama.toLowerCase() === form.kabupaten.toLowerCase() &&
          dispatch(getKecamatan(val.id))
      );
    }
  }, [dispatch, form.kabupaten, form.kabupaten.length, kota_kab.data]);

  return (
    <>
      <div className="flex flex-col w-full">
        <h3>Kabupaten/Kota</h3>
        <div className="text-right w-full">
          <div className="relative flex-col bg-gray-100 rounded-sm">
            <div className="border flex items-center justify-end rounded">
              <button
                type="button"
                onClick={() => {
                  setOpen(!Open);
                }}
                className="flex justify-between w-full items-center px-1 py-0.5 capitalize h-7"
              >
                {form.kabupaten}
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
                Open ? "absolute z-10" : "hidden"
              } items-start w-full bg-gray-100 rounded-b-md`}
            >
              <ul className="w-full justify-center h-40 overflow-x-scroll">
                {kota_kab.data.map((e, i) => {
                  return (
                    <li
                      key={i}
                      className=" border hover:bg-gray-50 border-gray-300"
                    >
                      <button
                        className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                        onClick={() => {
                          dispatch(setFormAddress("kabupaten", e.nama.toLowerCase()));
                          dispatch(setFormAddress("kecamatan", ""));
                          dispatch(setFormAddress("kelurahan", ""));
                          setOpen(false);
                        }}
                      >
                        {e.nama}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DropdownKecamatan() {
  const [Open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { kecamatan, form } = useSelector((state) => state.address);

  useEffect(() => {
    if (form.kecamatan.length) {
      kecamatan.data.filter(
        (val) =>
          val.nama.toLowerCase() === form.kecamatan.toLowerCase() &&
          dispatch(getKelurahan(val.id))
      );
    }
  }, [dispatch, form.kecamatan, kecamatan.data]);

  return (
    <>
      <div className="flex flex-col w-full">
        <h3>Kecamatan</h3>
        <div className="text-right w-full">
          <div className="relative flex-col bg-gray-100 rounded-sm">
            <div className="border flex items-center justify-end rounded">
              <button
                type="button"
                onClick={() => {
                  setOpen(!Open);
                }}
                className="flex justify-between w-full items-center px-1 py-0.5 capitalize h-7"
              >
                {form.kecamatan}
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
                Open ? "absolute z-10" : "hidden"
              } items-start w-full bg-gray-100 rounded-b-md`}
            >
              <ul className="w-full justify-center h-40 overflow-x-scroll">
                {kecamatan.data.map((e, i) => {
                  return (
                    <li
                      key={i}
                      className=" border hover:bg-gray-50 border-gray-300"
                    >
                      <button
                        className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                        onClick={() => {
                          dispatch(setFormAddress("kecamatan", e.nama.toLowerCase()));
                          dispatch(setFormAddress("kelurahan", ""));
                          setOpen(false);
                        }}
                      >
                        {e.nama}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export function DropdownKelurahan() {
  const [Open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { kelurahan, form } = useSelector((state) => state.address);

  return (
    <>
      <div className="flex flex-col w-full">
        <h3>Kelurahan</h3>
        <div className="text-right w-full">
          <div className="relative flex-col bg-gray-100 rounded-sm">
            <div className="border flex items-center justify-end rounded">
              <button
                type="button"
                onClick={() => {
                  setOpen(!Open);
                }}
                className="flex justify-between w-full items-center px-1 py-0.5 capitalize h-7"
              >
                {form.kelurahan}
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
                Open ? "absolute z-10" : "hidden"
              } items-start w-full bg-gray-100 rounded-b-md`}
            >
              <ul className="w-full justify-center h-40 overflow-x-scroll">
                {kelurahan.data.map((e, i) => {
                  return (
                    <li
                      key={i}
                      className=" border hover:bg-gray-50 border-gray-300"
                    >
                      <button
                        className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                        onClick={() => {
                          dispatch(setFormAddress("kelurahan", e.nama.toLowerCase()));
                          setOpen(false);
                        }}
                      >
                        {e.nama}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
