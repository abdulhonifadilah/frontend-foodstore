import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../app/features/auth/actions";
import Category from "../../components/category";
import TabelProduct from "../../components/product";
import TabelTags from "../../components/tag";

const sidebar = [
  {
    label: "Product",
    main: <TabelProduct />,
  },
  {
    label: "Category",
    main: <Category />,
  },
  {
    label: "Tags",
    main: <TabelTags />,
  },
];

export default function Dasboard() {
  const dispatch = useDispatch();
  const { loggedIn, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [main, setmain] = useState(<TabelProduct/>);
  useEffect(() => {
    if (!loggedIn || role === "user") {
      navigate("/");
    }
  }, [loggedIn, navigate, role]);
  const handleLogout = () => {
    if (window.confirm("apakah anda yakin")) {
      dispatch(userLogout());
    }
  };
  return (
    <div className="container">
      <div className="flex bg-white w-full pb-3">
        <div className="bg-white justify-center w-[17rem] border-r-2">
          <h1 className="text-2xl font-bold w-full text-center py-3">
            Dasboard
          </h1>
          <ul className="mt-3 border-y-2">
              {
                  sidebar.map((e, i)=>{
                      return(
                        <li key={i}>
                        <button onClick={() => setmain(e.main)} className="border-b-2 py-2 px-2 hover:opacity-90 hover:bg-gray-100 cursor-pointer w-full">
                          {e.label}
                        </button>
                      </li>
                      )
                  })
              }
            <li>
              <button onClick={handleLogout} className="border-b-2 py-2 px-2 hover:opacity-90 hover:bg-gray-100 cursor-pointer w-full">
                logout
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full">
        {main}
        </div>
      </div>
    </div>
  );
}
