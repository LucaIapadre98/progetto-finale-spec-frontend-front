import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Shop from "./pages/Shop";
import Details from "./pages/Details";
import Wishlist from "./pages/Wishlist";


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop/>}  />
        <Route path="/products/:id" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
};