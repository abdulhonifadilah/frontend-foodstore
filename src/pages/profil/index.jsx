import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../../components/address";
import Invoice from "../../components/invoice";
import DetailProfil from "../../components/profil";
import { userLogout } from "../../app/features/auth/actions";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav";
import { getInvoices } from "../../app/features/order/actions";
import { getAddresses } from "../../app/features/address/actions";

const sidebar = [
  {
    label: "Profil",
    main: <DetailProfil />,
  },
  {
    label: "Invoice",
    main: <Invoice />,
  },
  {
    label: "Address",
    main: <Address />,
  },
];
export default function Profil() {
  const [main, setMain] = useState(<DetailProfil />);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    dispatch(getInvoices());
    dispatch(getAddresses());
  }, [dispatch])
  

  const handleLogout = () => {
    if (window.confirm("apakah anda yakin")) {
      dispatch(userLogout());
    }
  };
  return (
    <Navbar>
      <div className="container flex mt-14 md:justify-center">
        <div className="flex bg-white p-5 w-full">
          <div className={`${show?'ml-0':'-ml-28 '}md:ml-0 transition duration-1000 ease-in-out`}>
            <p onClick={()=> setshow(!show)} className="flex ml-28 absolute md:hidden rounded-full w-5 h-5 bg-slate-300 shadow-md text-center justify-center items-center font-bold">
             {show? '-':'+'}
            </p>
            <ul className="flex flex-col ">
              {sidebar.map((e, i) => {
                return (
                  <li key={i} className="p-2 border w-28 font-semibold">
                    <button onClick={() => setMain(e.main)}>{e.label}</button>
                  </li>
                );
              })}
              <li className="p-2 border w-28 font-semibold">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>

          <div className="w-full overflow-x-auto">
            {main}
          </div>
        </div>
      </div>
    </Navbar>
  );
}
