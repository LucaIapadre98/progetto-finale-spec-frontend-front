import MenuLink from "../components/MenuLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, use } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";


export default function Details (){
    const [ products, setProducts] = useState([]);
    const { id } = useParams();                                                 // Prendi l'id dalla URL
    const [product, setProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);               // Stato per i prodotti filtrati
    const [searchTerm, setSearchTerm] = useState("");                           // Stato per il termine di ricerca
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);                       // Stato per controllare la sidebar

    useEffect(() => {
       setFilteredProducts(
           products.filter(product =>
               product.title.toLowerCase().includes(searchTerm.toLowerCase())
           )
       );
    }, [searchTerm, products]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/products/${id}`);
            const { product } = res.data;
            console.log("prodotto:", product);
            setProduct(product);
        } catch (err) {
            console.error('Errore nel caricamento del prodotto:', err);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3001/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const [wishlist, setWishlist] = useState(() => {                           // Recupera la wishlist dal localStorage se esiste
        const saved = localStorage.getItem("wishlist");                        // Recupera la wishlist dal localStorage se esiste
        return saved ? JSON.parse(saved) : [];                                 // Altrimenti ritorna con un array vuoto, converte in oggetto JS
    });

    const toggleWishlist = (product) => {                                   // Funzione toggle che aggiunge i prodotti nella wishlist
        let updated;
        if (wishlist.some(item => item.id === product.id)) {                 // Controlla se il prodotto è già nella wishlist
            updated = wishlist.filter(item => item.id !== product.id);       // Se è presente, rimuovilo
        } else { 
            updated = [...wishlist, product];                                     // Altrimenti, aggiungilo alla wishlist
        }
        setWishlist(updated);                                                  // Aggiorna lo stato della wishlist
        localStorage.setItem("wishlist", JSON.stringify(updated));           // Aggiorna il localStorage con la wishlist aggiornata, convertendo in stringa JSON
    };

    const [compareList, setCompareList] = useState(() => {                     // Stato per la lista di confronto, sincronizzato con localStorage
        const saved = localStorage.getItem("compareList");
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {                                                        // Aggiorna localStorage quando compareList cambia
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);

    const toggleCompare = (product) => {                                     // Funzione toggle per aggiungere/rimuovere prodotti dalla lista di confronto
        let updated;
        if (compareList.some(item => item.id === product.id)) {
            updated = compareList.filter(item => item.id !== product.id);
        } else {
            updated = [...compareList, product];
        }
        setCompareList(updated);
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
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <h5 style={{ margin: '0 0 5px 0', color: 'black', fontSize: "19px" }}>{item.title}</h5>
                                    </Link>
                                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{item.category}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button
                                            onClick={() => toggleWishlist(item)}
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

        <main className="container-id">
            <div className="button" style={{display:"flex", justifyContent:"space-between"}}>
                <Link to={`/shop`}>
                    <p>Torna allo shop</p>
                </Link>
                 {compareList.length >= 2 && (
                    <span className="text-center my-3">
                        <Link to="/compare" className="btn btn-success" style={{textDecoration:"none", border:"1px solid #ff6543", display:"inline-block", padding:"5px 10px", borderRadius:"4px", color:"#ff6543", margin:" 8px 10px"}}>
                            Confronta {compareList.length} prodotti selezionati
                        </Link>
                    </span>
                )}
            </div>
            <div className="container-card" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                <div className="row" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                    {product ? (
                        <div className="col-12 col-md-6" style={{ maxWidth: "500px" }}>
                            <div className="card">
                                <div className="card-header">
                                    <div className="badge">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div style={{ marginBottom: "10px" }}>
                                        <h2>
                                            {product.title}
                                        </h2>
                                        <p style={{ fontSize:" 22px"}}>
                                            {product.brand}
                                        </p>
                                        <div style={{
                                            width: "100%",
                                            height: "300px",
                                            marginBottom: "20px",   
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            overflow: "hidden",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                                        }}>
                                            <img
                                                src={`/image${product.image}`}  // Rimuovi lo slash qui anche
                                                alt={product.title}
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",  
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: "20px" }}>
                                        <div style={{
                                            borderTop: "1px solid #eee",
                                            paddingTop: "20px"
                                        }}>
                                            {product.price && (
                                            <p style={{
                                                fontSize: "24px",
                                                fontWeight: "bold",
                                                marginBottom: "25px",
                                                textAlign: "center"
                                            }}>
                                              <span style={{fontWeight:"bold", color:"#ff6543"}}>Prezzo:</span> <span style={{color:"rgba(22, 177, 1, 1)"}}>{product.price}€</span>
                                            </p>
                                        )}
                                            {product.description && (
                                                <p style={{
                                                    fontSize: "16px",
                                                    color: "#666",
                                                    marginBottom: "15px",
                                                    lineHeight: "1.5"
                                                }}>
                                                    <span style={{fontWeight:"bold", color:"#ff6543"}}>Descrizione:</span> {product.description}
                                                </p>
                                            )}
                                            
                                            {product.sistemaOperativo && (
                                                <p style={{
                                                    fontSize: "16px",
                                                    color: "#666",
                                                    marginBottom: "10px"
                                                }}>
                                                    <span style={{fontWeight:"bold", color:"#ff6543"}}>Sistema Operativo:</span> {product.sistemaOperativo}
                                                </p>
                                            )}
                                            
                                            {product.memoria && (
                                                <p style={{
                                                    fontSize: "16px",
                                                    color: "#666",
                                                    marginBottom: "20px"
                                                }}>
                                                    <span style={{fontWeight:"bold", color:"#ff6543"}}>Memoria:</span> {product.memoria}
                                                </p>
                                            )}
                                            {product.ram && (
                                                <p style={{
                                                    fontSize: "16px",
                                                    
                                                    color: "#666",
                                                    marginBottom: "20px"
                                                }}> 
                                                    <span style={{fontWeight:"bold", color:"#ff6543"}}>RAM:</span> {product.ram}
                                                </p>
                                            )}
                                            {product.display && (
                                                <p style={{
                                                    fontSize: "16px",   
                                                    color: "#666",
                                                    marginBottom: "20px"
                                                }}> 
                                                    <span style={{fontWeight:"bold", color:"#ff6543"}}>Display:</span> {product.display}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        borderTop: "1px solid #eee",
                                        paddingTop: "20px"
                                    }}>
                                        <button 
                                            onClick={() => toggleWishlist(product)}
                                            style={{
                                                color: wishlist.some(item => item.id === product.id) ? "#ff6543" : "#ccc",
                                                backgroundColor: "white"
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                            {wishlist.some(item => item.id === product.id)}
                                        </button>
                                        <button
                                            onClick={() => toggleCompare(product)}
                                            style={{
                                                background: "white",
                                                cursor: "pointer",
                                                border: "1px solid #ff6543",
                                                padding: "10px 20px",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCircleCheck}
                                                style={{
                                                    color: compareList.some(item => item.id === product.id) ? "green" : "hsla(113, 90%, 72%, 1.00)",
                                                    backgroundColor: compareList.some(item => item.id === product.id) ? "#eaffea" : "white"
                                                }}
                                            />
                                            {compareList.some(item => item.id === product.id)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12">
                             <h3>Caricamento...</h3>
                        </div>
                    )}
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
};