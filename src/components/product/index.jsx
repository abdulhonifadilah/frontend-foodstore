import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  getProducts,
  setForm,
  setId,
  setImagePreview,
} from "../../app/features/product/actions";
import { Btn } from "../atoms/button";
import { InputProduct } from "../input";
import Pagination from "../pagination";

export default function TabelProduct() {
  const dispatch = useDispatch();
  const { data,  status,pagination,filter } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts(filter));
  }, [dispatch, filter]);
  useEffect(() => {
    return () => {
      dispatch(getProducts(filter));
    };
  }, [dispatch, filter, status]);

  
  const totalData = data.length; //panjang data seluruhnya
  const lastPost=pagination.currentPage*pagination.postPerPage
  const firstPost=lastPost-pagination.postPerPage;
  const totalPage=Math.ceil(totalData/pagination.postPerPage);

  const handleSetForm = (e) => {
    let setTags= [];
    e.tags.map((e)=> setTags.push(e.name))
    dispatch(setForm("name", e.name));
    dispatch(
      setImagePreview(`http://localhost:3000/images/products/${e.image_url}`)
    );
    dispatch(setForm("description", e.description));
    dispatch(setForm("category", e.category.name));
    dispatch(setForm("tags", setTags));
    dispatch(setForm("price", e.price));
    dispatch(setId(e._id));
  };

  const handleDelete = (id) => {
    if (window.confirm("apakah anda yakin")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <div className="w-full px-5">
      <h1 className="text-2xl text-center font-bold py-2 mb-3">Product</h1>
      <div className="flex">
        <InputProduct />
      </div>
      <table className="w-full table-auto mt-2 border">
        <thead className="border-b py-2">
          <tr>
            <th className="py-2">Foto</th>
            <th>Nama</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tags</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {data.slice(firstPost, lastPost).map((e) => {
            return (
              <tr className="py-2 text-center" key={e._id}>
                <td className="flex justify-center py-1">
                  <img
                    className="w-14"
                    src={`http://localhost:3000/images/products/${e.image_url}`}
                    alt=""
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.category.name}</td>
                <td>{e.tags.map((e) => e.name + " ")}</td>
                <td className="gap-2 flex justify-center">
                  <Btn
                    label="Edit"
                    color="bg-green-500"
                    onClick={() => {
                      handleSetForm(e)
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
      {totalPage > 1 && <Pagination totalPage={totalPage}/>}
      
    </div>
  );
}
