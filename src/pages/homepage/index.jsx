import React, { useCallback, useEffect } from "react";
import Card, { CardDetail } from "../../components/card";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getProducts,
  getTags,
  setForm,
} from "../../app/features/product/actions";
import { useSelector } from "react-redux";
import ListCategory from "../../components/atoms/listCategory";
import { CheckedTags } from "../../components/atoms/input";
import Pagination from "../../components/pagination";
import Navbar from "../../components/nav";

export default function Homepage() {
  const dispatch = useDispatch();
  let { tag, data, form, pagination, status, detail } = useSelector(
    (state) => state.product
  );
  const getProduct = useCallback(() => {
    dispatch(getProducts(form));
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch, form]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);
  useEffect(() => {
    return () => {
      getProduct()
    }
  }, [form, getProduct])
  
  let newData = data.filter((val) => {
    if (form.name === "") {
      return val;
    } else if (val.name.toLowerCase().includes(form.name.toLowerCase())) {
      return val;
    } else {
      return null;
    }
  })
  const totalData = newData.length; //panjang data seluruhnya
  const lastPost = pagination.currentPage * pagination.postPerPage;
  const firstPost = lastPost - pagination.postPerPage;
  const totalPage = Math.ceil(totalData / pagination.postPerPage);

  return (
    <>
      <Navbar>
        {detail.status && (
          <div className="absolute container h-full">
            <div className="flex justify-center items-center h-full shadow-md rounded-md w-full z-50">
              <CardDetail />
            </div>
          </div>
        )}

        <div className="flex flex-col justify-between">
          <header className="flex justify-center flex-col items-center mt-20">
            <div className="text-center font-bold">
              <h1 className="text-6xl">
                <span className="text-red-500">Food</span>Store
              </h1>
            </div>
            <div className="mt-12 border px-3 py-2 rounded-full shadow-md bg-white">
              <input
                type="text"
                name=""
                id=""
                placeholder="Cari"
                className="w-60 mr-3 py-1 px-3 focus:outline-none"
                onChange={(e) => {
                  dispatch(setForm("name", e.target.value));
                  getProduct();
                }}
              />
              <button className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-400 hover:shadow-md">
                Cari
              </button>
            </div>
          </header>
          <section className="list-product mt-14 px-4 md:px-0 w-full">
            <h5 className="font-bold text-3xl">Product</h5>
            {tag.length > 0 && (
              <div className="flex flex-col md:flex-row mt-8 gap-5">
                <div className="flex">
                  <label htmlFor="">
                    Category <ListCategory />
                  </label>
                </div>
                <div className="tags">
                  <p>Tags :</p>
                  <ul className="flex flex-row gap-1">
                    {tag.map((e, i) => {
                      return (
                        <li key={i}>
                          <CheckedTags name={e.name} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {status ? (
              <>
                {newData.length ? (
                  <>
                    <div className="mt-6 flex flex-col md:flex-row md:justify-center justify-center mb-2 w-full flex-wrap gap-10">
                      {newData.slice(firstPost, lastPost).map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="flex justify-center items-center mb-5"
                          >
                            <Card data={e} name={e.category.nama} />
                          </div>
                        );
                      })}
                    </div>
                    {totalPage > 1 && <Pagination totalPage={totalPage} />}
                  </>
                ) : (
                  <p className="text-red-500 mt-5 underline">Product Kosong</p>
                )}
              </>
            ) : (
              <p className="mt-6 w-full text-center h-40">Loading.....</p>
            )}
          </section>
        </div>
      </Navbar>
    </>
  );
}
