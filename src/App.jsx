import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompareProvider } from "./context/CompareContext";
import Homepage from "./pages/Homepage";
import Shop from "./pages/Shop";
import Details from "./pages/Details";
import Wishlist from "./pages/Wishlist";
import Compare from "./pages/Compare";


export default function App() {
  
  return (
    <CompareProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </BrowserRouter>
    </CompareProvider>
  );
};