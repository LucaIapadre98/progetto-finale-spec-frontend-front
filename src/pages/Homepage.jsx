import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart,faCartShopping, faTrophy, faClipboardList, faShieldHalved  } from "@fortawesome/free-solid-svg-icons";
import MenuLink from "../components/MenuLink";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import appleImg from "../public/brand/Apple.jpg";
import fairphoneImg from "../public/brand/fairphone.jpg";
import googleImg from "../public/brand/google-2.jpg";
import huaweiImg from"../public/brand/huawei.jpg";
import onePlusImg from "../public/brand/OnePlus.jpg";
import samsungImg from "../public/brand/samsung.jpg";
import xiaomiImg from "../public/brand/Xiaomi.jpg";
import SmartphoneImg from "../public/brand/smart-2.jpg";
import TabletImg from "../public/brand/tablet.jpg";
import Footer from "../components/Footer";

export default function Homepage(){
     
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "" );
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    

    
    useEffect(() => {
        axios.get("http://localhost:3001/products")    // Fetch prodotti all'avvio
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {        // Filtra prodotti quando cambia searchTerm o products
        if (!searchTerm) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, products]);

    const handleSubmit = (e) => {               // Gestione submit ricerca
        e.preventDefault();
        const newParams = {
            ...Object.fromEntries(searchParams.entries()),
            q: searchTerm,
            page: 1,
        };
        setSearchParams(newParams);         // Non serve navigate rimanendo sulla stessa pagina
    };

    return (
        <>
          <header className="container">
              <nav className="navbar">
                <div className="container-navbar">
                  <div className="button">
                    <span style={{ color: "#ff6543", fontSize:"40px" }}>Smart</span>
                    <span className="text-dark" style={{fontSize:"40px"}}>Store</span>
                  </div>
                </div>
              </nav>
              <div className="container-link">
                <MenuLink />
              </div>
              <div className="d-flex flex-column flex-md-row col-12 col-md-3 justify-content-center align-items-center">
                <form  className="d-flex justify-content-center align-items-center np-form w-100 mt-2 mt-md-0">
                  <input 
                    type="text" 
                    className="form-control border-0 shadow-none np-input" 
                    style={{padding: "7px 14px",}} 
                    placeholder="Cerca..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      background: "#ff6543",
                      color: "#fff",
                      borderRadius: "0 25px 25px 0",
                      border: "none",
                      padding: "8px 14px",
                    }}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </form>
              </div>
              <div className="d-flex flex-md-row-reverse flex-grow-1 gap-3 col-12 col-sm-2 justify-content-center justify-content-md-start align-items-center">
                <div className="buttons d-flex gap-3">
                  <Link className="position-relative mt-2" to="">
                    <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontFamily:"30px"}} icon={faHeart} />
                  </Link>
                  <Link className="position-relative mt-2" to="">
                    <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543" }} icon={faCartShopping} />
                  </Link>
                </div>
              </div>
          </header>
          <main className="container-main">
            <div className="services ">
              <div className="row">
                <div className="col-3">
                  <div className="service ">
                    <div className="service-icon">
                      <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faCartShopping} />
                    </div>
                    <div className="service-content">
                      <h5>Spedizione Gratuita</h5>
                      <p>Spedizione gratuita per tutti gli ordini superiori a 100€</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="service">
                    <div className="service-icon">
                      <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faTrophy} />
                    </div>
                    <div className="service-content">
                      <h5>Qualità</h5>
                      <p>Prodotti originali e di alta qualità</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="service ">
                    <div className="service-icon">
                      <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faShieldHalved} />
                    </div>
                    <div className="service-content">
                      <h5>Sicurezza</h5>
                      <p>Pagamento sicuro con PayPal, Carta di Credito, Bonifico Bancario</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="service">
                    <div className="service-icon">
                      <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faClipboardList} />
                    </div>
                    <div className="service-content">
                      <h5>Offerte</h5>
                      <p>Offerte e sconti sui nostri prodotti</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
            <div className="brands">
              <div className="row-brand">
                <div className="col-1">
                  <Link to="/shop?brand=Apple" className="card-brand border">
                    <img src={appleImg} alt="Apple"  />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="/shop?brand=Fairphone" className="card-brand border">
                    <img src={fairphoneImg} alt="Fairphone" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="/shop?brand=Google" className="card-brand border">
                    <img src={googleImg} alt="Google" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="/shop?brand=Huawei" className="card-brand border">
                    <img src={huaweiImg} alt="Huawei" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="/shop?brand=OnePlus" className="card-brand border">
                    <img src={onePlusImg} alt="OnePlus" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="/shop?brand=Samsung" className="card-brand border">
                    <img src={samsungImg}alt="Samsung" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="/shop?brand=Xiaomi" className="card-brand border">
                    <img src={xiaomiImg} alt="Xiaomi" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="container-col">
              <div className="row">
                <div className="col-6">
                  <div className="image">
                   <img src={SmartphoneImg} alt="Smartphone" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="image">
                   <img src={TabletImg} alt="Tablet" />
                  </div>
                </div>
              </div>
            </div>
            <Footer /> 
        </>
    );
};