import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../../components/address";
import Invoice from "../../components/invoice";
import DetailProfil from "../../components/profil";
import { userLogout } from "../../app/features/auth/actions";
import { useNavigate } from "react-router-dom";

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
  const dispath = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleLogout = () => {
    if (window.confirm("apakah anda yakin")) {
      dispath(userLogout());
    }
  };
  return (
    <div className="container flex mt-14 justify-center">
      <div className="flex bg-white p-5">
        <ul className="mr-5">
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
        <div className="w-[40rem]">{main}</div>
      </div>
    </div>
  );
}
