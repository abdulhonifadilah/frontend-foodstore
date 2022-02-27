import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteCategories,
  getCategories,
  setForm,
  setId,
} from "../../app/features/product/actions";
import { Btn } from "../atoms/button";
import { InputCategory } from "../input";

export default function Category() {
  let { category, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    return () => {
        dispatch(getCategories());
    };
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm("apakah anda yakin")) {
      dispatch(deleteCategories(id));
    }
  };

  return (
    <>
      <div className="w-full items-center justify-center px-5 flex flex-col">
        <h1 className="text-2xl text-center font-bold py-2">Category</h1>
        <div className="flex flex-col w-full items-start justify-start">
          <InputCategory />
          <table className="w-full table-fixed mt-3 border">
            <thead className="border-b py-2 w-1/">
              <tr>
                <th className="py-2">Nama</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {category.map((e, i) => {
                return (
                  <tr key={i} className="py-2 text-center">
                    <td>{e.name}</td>
                    <td className="gap-2 flex justify-center">
                      <Btn
                        label="Edit"
                        color="bg-green-500"
                        onClick={() => {
                          dispatch(setId(e._id));
                          dispatch(setForm("name", e.name));
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
        </div>
      </div>
    </>
  );
}
