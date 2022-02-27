import React, { useCallback, useEffect } from "react";
import Card from "../../components/card";
import Footer from "../../components/footer";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getProducts,
  getTags,
  setFilter,
} from "../../app/features/product/actions";
import { useSelector } from "react-redux";
import ListCategory from "../../components/atoms/listCategory";
import { CheckedTags } from "../../components/atoms/input";
import Pagination from "../../components/pagination";

export default function Homepage() {
  const dispatch = useDispatch();
  let { tag, data, form, pagination } = useSelector((state) => state.product);
  const getProduct = useCallback(() => {
    dispatch(getProducts(form));
  }, [dispatch, form]);  

  useEffect(() => {
    getProduct();
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch, form, getProduct]);
  const totalData = data.length; //panjang data seluruhnya
  const lastPost=pagination.currentPage*pagination.postPerPage
  const firstPost=lastPost-pagination.postPerPage;
  const totalPage=Math.ceil(totalData/pagination.postPerPage);
  useEffect(() => {
    return () => {
      getProduct();
    };
  }, [form, form.tags.length, getProduct]);

  return (
    <>
      <div className="container">
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
                dispatch(setFilter("name", e.target.value));
                getProduct();
              }}
            />
            <button className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-400 hover:shadow-md">
              Cari
            </button>
          </div>
        </header>
        <section className="list-product mt-14">
          <h5 className="font-bold text-3xl">Product</h5>
          <div className="flex mt-8 gap-5">
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
          <div className="mt-6 flex flex-wrap gap-3 mb-2">
            {data
              .slice(firstPost, lastPost)
              .map((e, i) => {
                return <Card data={e} name={e.category.nama} key={i} />;
              })}
          </div>
          {totalPage > 1 && <Pagination totalPage={totalPage} />}
        </section>
      </div>
      <Footer />
    </>
  );
}
