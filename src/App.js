import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/homepage";
import Cart from "./pages/cart";
import Profil from "./pages/profil";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./router/privateRoute";
import Dasboard from "./pages/dasboard";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { role, loggedIn } = useSelector((state) => state.auth);
  let location = useLocation();
  useEffect(() => {
    if (role === "admin" && loggedIn) {
      <Navigate to="/dasboard" state={{ from: location }} replace />;
    }
  }, [location, loggedIn, role]);

  function Home({ children }) {
    if (role === "admin" && loggedIn) {
      return <Navigate to="/dasboard" state={{ from: location }} replace />;
    }
    return children;
  }

  return (
    <div style={{ backgroundColor: "#C4DCC2", minHeight: "100vh" }}>
      <Routes>
        <Route
          element={
            <Home>
              <Homepage />
            </Home>
          }
          path="/"
          exact
        />
        <Route
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
          path="/cart"
        />
        <Route
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
          path="/profil"
        />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Dasboard />} path="/dasboard" />
      </Routes>
    </div>
  );
}

export default App;
