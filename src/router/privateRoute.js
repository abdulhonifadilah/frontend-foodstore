import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation} from "react-router-dom";

export default function PrivateRoute({ children }) {
  const {loggedIn, role} = useSelector((state) => state.auth);
  let location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if(role==='admin'){
    return <Navigate to="/dasboard" state={{from: location}} replace />
  }
    return children;
}


