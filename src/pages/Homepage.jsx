import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faCartShopping, faTrophy, faClipboardList, faShieldHalved  } from "@fortawesome/free-solid-svg-icons";
import MenuLink from "../components/MenuLink";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import appleImg from "../brands/apple.jpg";
import fairphoneImg from "../brands/fairphone.jpg";
import googleImg from "../brands/google-2.jpg";
import huaweiImg from "../brands/huawei.jpg";
import onePlusImg from "../brands/OnePlus.jpg";
import samsungImg from "../brands/samsung.jpg";
import xiaomiImg from "../brands/Xiaomi.jpg";
import SmartphoneImg from "../brands/smart-2.jpg";
import TabletImg from "../brands/tablet.jpg";
import Footer from "../components/Footer";

export default function Homepage(){
    const [searchParams, setSearchParams] = useSearchParams();                            // Per gestire i parametri di ricerca nell'URL
    // const navigate = useNavigate();
    const [searchTerm] = useState(searchParams.get("q") || "" );                          // Memorizzare il testo digitato dall’utente nella barra di ricerca.
    const [products, setProducts] = useState([]);                                         // Stato per memorizzare i prodotti
    const [filteredProducts, setFilteredProducts] = useState([]);                         // Stato per memorizzare i prodotti filtrati in base alla ricerca
    

    
    useEffect(() => {
        axios.get("http://localhost:3001/products")                                         // Fetch prodotti all'avvio
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {                                                                      // Filtra prodotti quando cambia searchTerm o products
        if (!searchTerm) {                                                                 // Se searchTerm è vuoto, mostra tutti i prodotti
            setFilteredProducts(products);                                                 // Imposta filteredProducts con tutti i prodotti
        } else {
            setFilteredProducts(
              products.filter(product =>                                                // Filtra i prodotti in base al termine di ricerca
                product.name.toLowerCase().includes(searchTerm.toLowerCase())           // Confronta i nomi se includono il termine di ricerca
              )
            );
        } 
    }, [searchTerm, products]);                                                         // Dipendenze: esegui quando searchTerm o products cambiano
  
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
              <div className="d-flex flex-md-row-reverse flex-grow-1 gap-3 col-12 col-sm-2 justify-content-center justify-content-md-start align-items-center">
                <div className="buttons d-flex gap-3">
                  <Link className="position-relative mt-2"  to={`/wishlist`}>
                    <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontFamily:"30px"}} icon={faHeart} />
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
            <div className="brands" style={{
              display:"flex", 
              flexDirection:"column", 
              alignItems:"center", 
              justifyContent:"center",
              fontSize:"30px",
              color:"#ff6543",
            }}>
              <div className="title-brand">
                <h2>Tutti i brand che puoi trovare nel nostro negozio:</h2>
              </div>
              <div className="row-brand">
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={appleImg} alt="Apple"  />
                  </Link>
                </div>
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={fairphoneImg} alt="Fairphone" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={googleImg} alt="Google" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={huaweiImg} alt="Huawei" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={onePlusImg} alt="OnePlus" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={samsungImg}alt="Samsung" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link className="card-brand border">
                    <img src={xiaomiImg} alt="Xiaomi" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="container-col">
              <div className="row">
                <div className="col-6">
                  <div className="image">
                   <img src={SmartphoneImg} style={{
                    width:"80%",
                    height:"85%",
                   }} 
                   alt="Smartphone" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="image">
                   <img src={TabletImg}
                   style={{
                    width:"80%",
                    height:"85%",
                   }}  alt="Tablet" />
                  </div>
                </div>
              </div>
            </div>
            <Footer /> 
        </>
    );
};