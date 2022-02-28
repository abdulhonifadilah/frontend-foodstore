import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const { form } = useSelector((state) => state.product);
  const [ischecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    if (form.tags.includes(props.name)) {
      setIsChecked(true);
    }else{
      setIsChecked(false)
    } 
  }, [form.tags, props.name]);
  const handleToggleTags = (val) => {
    setIsChecked(!ischecked);
    let arrTags = form.tags.indexOf(val);
    if (arrTags !== -1) {
      form.tags.splice(arrTags, 1);
    } else {
      form.tags.push(val);
    }
  };

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
