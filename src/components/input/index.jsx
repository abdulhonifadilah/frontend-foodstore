import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Btn } from "../atoms/button";
import Input, { CheckedTags } from "../atoms/input";
import {
  createCategories,
  createProduct,
  createTags,
  getCategories,
  getTags,
  setForm,
  setId,
  updateCategories,
  updateTags,
  setImagePreview,
  setFormDefault,
  updateProduct,
} from "../../app/features/product/actions";
import ListCategory from "../atoms/listCategory";

export function InputCategory(props) {
  let { form,  id} = useSelector((state) => state.product);
  const [label, setlabel] = useState("tambah");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (label === "edit") {
      dispatch(updateCategories(id,form));
    } else {
      dispatch(createCategories(form));
    }
    // console.log(form.id.length)
  }
  const cb = useCallback(() => {
    if (id.length > 0) {
      setlabel("edit");
    } else {
      setlabel("tambah");
    }
  }, [id.length]);

  useEffect(() => {
    cb();
  }, [cb]);

  return (
    <>
      <div className="flex justify-end items-end mt-3">
        <h1 className=" capitalize text-xl font-semibold w-20">{label}</h1>
        <form
          onSubmit={handleSubmit}
          className="flex mt-2 gap-2 items-end"
          autoComplete="off"
        >
          <Input
            type="text"
            value={form.name}
            label="nama"
            onChange={(e) => dispatch(setForm("name", e.target.value))}
          />
          <div className="flex gap-2 w-full">
            <Btn type="submit" color="bg-blue-500" label="Simpan" />

            {label === "edit" && (
              <p
                onClick={() => {
                  dispatch(setId(""));
                }}
                className="capitalize hover:underline cursor-pointer"
              >
                Tambah
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
export function InputTag(props) {
  let { form,  id } = useSelector((state) => state.product);
  const [label, setlabel] = useState("tambah");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (id.length > 0) {
      dispatch(updateTags(id,form));
    } else {
      dispatch(createTags(form));
    }
    // console.log(form.id.length)
  }
  const cb = useCallback(() => {
   if (id.length > 0) {
      setlabel("edit");
    } else {
      setlabel("tambah");
      dispatch(setForm("name", ""));
    }
  }, [dispatch, id.length]);

  useEffect(() => {
    cb();
  }, [cb]);

  return (
    <>
      <div className="flex justify-end items-end mt-3">
        <h1 className=" capitalize text-xl font-semibold w-20">{label}</h1>
        <form
          onSubmit={handleSubmit}
          className="flex mt-2 gap-2 items-end"
          autoComplete="off"
        >
          <Input
            type="text"
            value={form.name}
            label="nama"
            onChange={(e) => dispatch(setForm("name", e.target.value))}
          />
          <div className="flex gap-2 w-full">
            <Btn type="submit" color="bg-blue-500" label="Simpan" />

            {label === "edit" && (
              <p
                onClick={() => {
                  dispatch(setId(""));
                }}
                className="capitalize hover:underline cursor-pointer"
              >
                Tambah
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export function InputProduct(props) {
  const [label, setlabel] = useState("tambah");
  let { tag, form, imagePreview, id } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const cb = useCallback(() => {
    dispatch(getCategories());
    dispatch(getTags());
    if (id.length) {
      setlabel("edit");
    } else {
      setlabel("tambah");
    }
  }, [dispatch, id.length]);

  useEffect(() => {
    cb();
  }, [cb]);

  const onImageUpload = (e) => {
    let file = e.target.files[0];
    dispatch(setForm("image", file));
    dispatch(setImagePreview(URL.createObjectURL(file)))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.length > 0) {
      dispatch(updateProduct(id,form));
    } else{
      dispatch(createProduct(form));
    }
  };
  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-xl font-semibold capitalize">{label}</h3>
      <div className="flex justify-start gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <img
            src={imagePreview}
            alt=""
            className="w-20 h-20 bg-gray-200"
          />
          <input
            type="file"
            name=""
            id=""
            className="text-sm"
            onChange={(e) => onImageUpload(e)}
          />
        </div>
        <div className="flex flex-col">
          <Input
            type="text"
            label="nama"
            value={form.name}
            onChange={(e) => dispatch(setForm("name", e.target.value))}
          />

          <Input
            type="text"
            label="price"
            value={form.price}
            onChange={(e) => dispatch(setForm("price", e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Description</label>
          <textarea
            className="border border-gray-500"
            name=""
            id=""
            cols="25"
            rows="5"
            value={form.description}

            onChange={(e) => dispatch(setForm("description", e.target.value))}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">
            Category <ListCategory />
          </label>
          <div className="flex gap-2 items-start">
            <p>Tags</p>
            <ul>
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
        <div className="flex mt-auto gap-2 items-center">
          <Btn onClick={handleSubmit} color="bg-blue-500" label="Simpan" />
          {label === "edit" && (
            <p  onClick={() => {
              dispatch(setFormDefault());
            }} className="capitalize hover:underline cursor-pointer">Tambah</p>
          )}
        </div>
      </div>
    </div>
  );
}
