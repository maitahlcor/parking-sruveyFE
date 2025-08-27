import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Locales from "./pages/Locales";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      {/* El Navbar solo se muestra si hay usuario (lo controlaremos dentro) */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/usuarios"
          element={
            <RequireAuth>
              <Usuarios />
            </RequireAuth>
          }
        />
        <Route
          path="/locales"
          element={
            <RequireAuth>
              <Locales />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}
