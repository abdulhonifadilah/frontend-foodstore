import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../../app/features/product/actions";

export default function ListCategory() {
  const { category ,form} = useSelector((state) => state.product);
  const [Open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="text-right w-40 z-10">
        <div className="relative flex-col bg-gray-100 rounded-sm">
          <div className="border flex items-center justify-end rounded">
            <button
              type="button"
              onClick={() => {
                setOpen(!Open);
              }}
              className="flex justify-between w-full items-center px-1 py-0.5 capitalize h-7"
            >
              {form.category}
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
            <li
                    className=" border hover:bg-gray-50 border-gray-300"
                  >
                    <button
                      className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                      onClick={() => {
                        setOpen(false);
                        dispatch(setForm("category", ""));
                      }}
                    >
                      Pilih Categeory
                    </button>
                  </li>
              {category.map((e, i) => {
                return (
                  <li
                    key={i}
                    className=" border hover:bg-gray-50 border-gray-300"
                  >
                    <button
                      className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                      onClick={() => {
                        setOpen(false);
                        dispatch(setForm("category", e.name));
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
    </Fragment>
  );
}
