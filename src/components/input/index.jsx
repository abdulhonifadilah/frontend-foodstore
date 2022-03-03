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
import * as Validator from "validatorjs";
import { createAddresses, setFormAddress, setFormAddressDefault, updateAddresses } from "../../app/features/address/actions";
import { DropdownKecamatan, DropdownKelurahan, DropdownKotaKab, DropdownProvinsi } from "../atoms/dropdown";

export function InputCategory(props) {
  let { form, id } = useSelector((state) => state.product);
  const [label, setlabel] = useState("tambah");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    let rules = {
      name: "required",
    };

    let validation = new Validator(form, rules, {
      required: {
        string: ":attribute harus di isi",
      },
    });

    validation.passes(() => {
      if (id.length > 0) {
        dispatch(updateCategories(id, form));
      } else {
        dispatch(createCategories(form));
      }
    }); // true

    validation.fails(() => window.alert("data harus di isi")); // false

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
  let { form, id } = useSelector((state) => state.product);
  const [label, setlabel] = useState("tambah");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    let rules = {
      name: "required",
    };

    let validation = new Validator(form, rules, {
      required: {
        string: ":attribute harus di isi",
      },
    });

    validation.passes(() => {
      if (id.length > 0) {
        dispatch(updateTags(id, form));
      } else {
        dispatch(createTags(form));
      }
    }); // true

    validation.fails(() => window.alert("data harus di isi")); // false
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
    dispatch(setImagePreview(URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let rules = {
      name: "required",
      price: "required",
      category: "required",
      tags: "required",
    };

    let validation = new Validator(form, rules, {
      required: {
        string: ":attribute harus di isi",
      },
    });

    validation.passes(() => {
      // dispatch(userRegister(form))
      if (id.length > 0) {
        dispatch(updateProduct(id, form));
      } else {
        dispatch(createProduct(form));
      }
    }); // true

    validation.fails(() => window.alert("data harus di isi")); // false
  };
  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-xl font-semibold capitalize">{label}</h3>
      <div className="flex justify-start gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <img src={imagePreview} alt="" className="w-20 h-20 bg-gray-200" />
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
            <p
              onClick={() => {
                dispatch(setFormDefault());
              }}
              className="capitalize hover:underline cursor-pointer"
            >
              Tambah
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


export  function InputAddress({setShow}) {
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
    <><h3 className="text-xl font-semibold capitalize text-left md:w-full mb-2 px-6">{label}</h3>
      <div className="flex flex-col md:flex-row w-full mb-2 transition-opacity">
        <div className="flex flex-col w-full md:w-1/2 gap-2 mr-2">
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
        <div className="flex flex-col justify-between gap-2 w-full md:w-1/2">
          <DropdownProvinsi/>
          <DropdownKotaKab/>
          <DropdownKecamatan/>
          <DropdownKelurahan/>
        </div>
      </div>
      <div className="flex justify-start mr-auto gap-2">
        <button
          onClick={() => {setShow(false)
          dispatch(setFormAddressDefault())
          }}
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


