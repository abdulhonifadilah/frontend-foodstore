import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTags, getTags, setForm, setId } from "../../app/features/product/actions";
import { Btn } from "../atoms/button";
import { InputTag } from "../input";

export default function TabelTags() {
  const dispatch = useDispatch();
  let { tag,status } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  useEffect(() => {
    return () => {
    dispatch(getTags());
    }
  }, [dispatch, status])
  
  const handleDelete=(id)=>{
    if (window.confirm("apakah anda yakin")) {
      dispatch(deleteTags(id));
    }
  }
  return (
    <>
      <div className="w-full px-5">
        <h1 className="text-2xl text-center font-bold py-2">Tags</h1>
        <div className="flex flex-col w-full justify-start items-start">
          <InputTag />
          <table className="w-full table-fixed mt-3 border">
            <thead className="border-b py-2">
              <tr>
                <th className="py-2">Nama</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {tag.map((e, i) => {
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
