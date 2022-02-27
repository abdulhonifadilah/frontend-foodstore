import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation} from "react-router-dom";

export default function AdminRoute({ children }) {
  const {loggedIn, role} = useSelector((state) => state.auth);
  let location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if(role==='user' && loggedIn){
    return <Navigate to="/" state={{from: location}} replace />
  }
    return children;
}