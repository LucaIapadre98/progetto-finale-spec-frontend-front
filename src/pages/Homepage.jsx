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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);                           // Stato per controllare la sidebar

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

    const toggleWishlist = (product) => {                                                 // Funzione per aggiungere/rimuovere prodotti dalla wishlist
        console.log('Toggling wishlist for product:', product); 
        console.log('Current wishlist:', wishlist);
        let updated;
        if (wishlist.some(item => item.id === product.id)) {                   // Se il prodotto è già nella wishlist, rimuovilo
            updated = wishlist.filter(item => item.id !== product.id);         // Altrimenti, aggiungilo
        } else {
            const completeProduct = {                                          // Crea un oggetto prodotto completo con le proprietà necessarie
                id: product.id, 
                title: product.title,
                category: product.category,
            };
            updated = [...wishlist, completeProduct];                        // Aggiungi il prodotto completo alla wishlist
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };
    const [wishlist, setWishlist] = useState(() => {                           // Recupera la wishlist dal localStorage se esiste
        const saved = localStorage.getItem("wishlist");                        
        return saved ? JSON.parse(saved) : [];                                 // Altrimenti ritorna con un array vuoto     
    });
  
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
                        <button 
                            className="btn "
                            style={{ backgroundColor: "white", border: "none" }}
                            type="button" 
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontSize:"15px"}} icon={faHeart} />
                        </button>
                    </div>
              </div>
          </header>

          {/* Sidebar Wishlist */}
            <div 
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}                                  // Se la sidebar è aperta, aggiungi la classe 'active'
                onClick={() => setIsSidebarOpen(false)}                                                         // Chiudi la sidebar al click sull'overlay
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    opacity: isSidebarOpen ? 1 : 0,
                    visibility: isSidebarOpen ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease'
                }}
            >
                <div 
                    className={`wishlist-sidebar ${isSidebarOpen ? 'open' : ''}`}
                    onClick={(e) => e.preventDefault()}
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: isSidebarOpen ? 0 : '-400px',
                        width: '400px',
                        height: '100%',
                        backgroundColor: 'white',
                        boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
                        transition: 'right 0.3s ease',
                        zIndex: 1001,
                        padding: '20px',
                        overflowY: 'auto'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, color: '#ff6543' }}>Wishlist</h3>
                        <button 
                            onClick={() => setIsSidebarOpen(false)}                                                     // Chiudi la sidebar al click sul bottone
                            style={{
                                border: 'none',
                                background: 'transparent',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: 'black'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    {wishlist.length === 0 ? (
                        <p style={{ textAlign: 'center', color: "black ", marginTop: '50px', fontSize: '18px' }}>
                            La tua wishlist è vuota
                        </p>
                    ) : (
                        <div>
                            {wishlist.map(item => (
                                <div 
                                    key={item.id} 
                                    style={{
                                        border: '1px solid #eee',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        marginBottom: '15px',
                                        backgroundColor: '#f9f9f9'
                                    }}
                                >
                                    <Link 
                                        to={`/products/${item.id}`} 
                                        style={{ 
                                            color: '#ff6543', 
                                            textDecoration: 'none',
                                            fontSize: '14px'
                                        }}
                                        onClick={() => setIsSidebarOpen(false)}                            // Chiudi la sidebar al click sul link
                                    >
                                        <h5 style={{ margin: '0 0 5px 0', color: 'black', fontSize: "19px" }}>{item.title}</h5>
                                    </Link>
                                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{item.category}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button
                                            onClick={() => toggleWishlist(item)}                           // Rimuovi il prodotto dalla wishlist al click sul bottone
                                            style={{ 
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                color: '#ff6543',
                                                fontSize: "24px"
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
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
              <div className="title-brand">
                <h2 style={{ color: "#ff6543" }}>Tutti i brand che puoi trovare nel nostro negozio:</h2>
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