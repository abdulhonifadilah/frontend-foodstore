import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setForm} from "../../app/features/product/actions"

export default function Input(props) {
  return (
    <label className="capitalize w-48">
      {props.label} :
      <input
        className="text-sm font-semibold border-gray-500 border py-1 px-2 rounded"
        type={props.type}
        {...props}
      />
    </label>
  );
}

export function CheckedTags(props) {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.product);
  const [ischecked, setIsChecked] = useState(false);
  
  const setChecked = useCallback(() => {
    if (form.tags.includes(props.name)) {
      setIsChecked(true);
    }else{
      setIsChecked(false)
    } 
  }, [form, props.name]);

  useEffect(() => {
    setChecked();
  }, [ setChecked]);
  const handleToggleTags = (val) => {
    setIsChecked(!ischecked);
    let arrTags = form.tags.indexOf(val);
    if (arrTags !== -1) {
      form.tags.splice(arrTags, 1);
    } else {
      form.tags.push(val);
    }
  };
useEffect(() => {
  return () => {
    dispatch(setForm("tags", form.tags))
  }
}, [dispatch, form.tags, form.tags.length])

  return (
    <>
      <label htmlFor="">
        <input
          type="checkbox"
          checked={ischecked}
          name=""
          id=""
          onChange={() => handleToggleTags(props.name)}
        />
        {props.name}
      </label>
    </>
  );
}
