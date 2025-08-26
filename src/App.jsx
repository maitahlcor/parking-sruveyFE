import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import Locales from "./pages/Locales.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/locales" element={<Locales />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
