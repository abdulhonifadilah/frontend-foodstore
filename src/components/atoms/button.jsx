import React, { useState } from "react";

export function Btn(props) {
  return (
    <>
      <button {...props} className={`${props.color} hover:opacity-90 py-1 px-2 w-20 min-w-min h-8 text-sm capitalize font-semibold rounded-md text-white`}>{props.label}</button>
    </>
  );
}

export const BtnToggle = (props) => {
    const [active, setactive] = useState(false)
  return (
    <>
      <div onClick={()=> setactive(!active)} className={`${active ? 'bg-yellow-500' : 'bg-white'}`}>
        {/* <button {...props} className="text-sm py-1 px-3 w-20 min-w-min">{props.label}</button> */}
        {props.children}
      </div>
    </>
  );
};
