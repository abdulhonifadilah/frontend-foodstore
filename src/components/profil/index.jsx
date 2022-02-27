import React from "react";
import { useSelector } from "react-redux";

export default function DetailProfil() {
  let {auth} = useSelector(state=> state.auth);
  return (
    <div className="flex flex-col items-center justify-center border rounded-md px-2 py-3">
      <h1 className="font-semibold text-xl mb-3">Profil</h1>
      <table className="w-full">
        <tbody className="border-t-2">
          <tr className="border-b">
            <td className="py-3">Nama</td>
            <td>email</td>
          </tr>
          <tr className="border-b">
            <td className="py-3">{auth.user.name}</td>
            <td>{auth.user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
