import MenuLink from "../components/MenuLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";


export default function Details (){
    const [ products, setProducts] = useState([]);
    const { id } = useParams();                                                 // Prendi l'id dalla URL
    const [product, setProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);               // Stato per i prodotti filtrati
    const [searchTerm, setSearchTerm] = useState("");                           // Stato per il termine di ricerca

    useEffect(() => {
       setFilteredProducts(
           products.filter(product =>
               product.title.toLowerCase().includes(searchTerm.toLowerCase())
           )
       );
    }, [searchTerm, products]);


    const fetchProduct = () => {
        axios.get(`http://localhost:3001/products/${id}`)
            .then((res) => {
                const { product } = res.data;
                setProduct(product);
            })
            .catch(err => {
                console.error('Errore nel caricamento del prodotto:', err);
            });
    };
    useEffect(fetchProduct, [id]);                                      // Esegui fetchProduct quando l'id cambia
   
    
    
    useEffect(() => {
        axios.get("http://localhost:3001/products")                      // Fetch prodotti all'avvio
            .then(res => setProducts(res.data))                          // Imposta i prodotti con i dati ricevuti
            .catch(err => console.error(err));
    }, []);

    const [wishlist, setWishlist] = useState(() => {                           // Recupera la wishlist dal localStorage se esiste
        const saved = localStorage.getItem("wishlist");                        // Recupera la wishlist dal localStorage se esiste
        return saved ? JSON.parse(saved) : [];                                 // Altrimenti ritorna con un array vuoto, converte in oggetto JS
    });

    const toggleWishlist = (product) => {                               // Funzione toggle che aggiunge i prodotti nella wishlist
        let updated;
        if (wishlist.some(item => item.id === product.id)) {                 // Controlla se il prodotto è già nella wishlist
            updated = wishlist.filter(item => item.id !== product.id);       // Se è presente, rimuovilo
        } else { 
            updated = [...wishlist, product];                                     // Altrimenti, aggiungilo alla wishlist
        }
        setWishlist(updated);                                                  // Aggiorna lo stato della wishlist
        localStorage.setItem("wishlist", JSON.stringify(updated));           // Aggiorna il localStorage con la wishlist aggiornata, convertendo in stringa JSON
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
                    <Link className="position-relative mt-2" to={`/wishlist`}>
                        <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontFamily:"30px"}} icon={faHeart} />
                    </Link>
                </div>
            </div>
        </header>
        <main className="container-id">
            <div className="button">
                <Link to={`/shop`}>
                    <p>Torna allo shop</p>
                </Link>
            </div>
            <div className="container-card" style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <div className="row" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                    {product ? (
                        <div className="col-12 col-md-6" style={{ maxWidth: "500px" }}>
                            <div className="card" style={{
                                height: "auto",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                transition: "transform 0.2s"
                            }}>
                                <div className="card-header" style={{
                                    backgroundColor: "#f8f9fa",
                                    borderBottom: "1px solid #dee2e6",
                                    padding: "15px",
                                    borderRadius: "8px 8px 0 0",
                                    textAlign: "center"
                                }}>
                                    <div className="badge" style={{
                                        backgroundColor: "#ff6543",
                                        color: "white",
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                        fontWeight: "bold"
                                    }}>
                                        {product.category}
                                    </div>
                                </div>
                                <div className="card-body" style={{
                                    padding: "30px",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <div style={{ marginBottom: "20px" }}>
                                        <h2 style={{
                                            fontSize: "40px",
                                            fontWeight: "bold",
                                            color: "#333",
                                            marginBottom: "15px",
                                            textAlign: "center"
                                        }}>
                                            {product.title}
                                        </h2>
                                        <p style={{
                                            color: "#666",
                                            fontSize: "18px",
                                            marginBottom: "20px",
                                            textAlign: "center"
                                        }}>
                                            {product.brand}
                                        </p>
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
                                                border: "1px solid #ff6543",
                                                background: wishlist.some(item => item.id === product.id) ? "#ff6543" : "white",
                                                color: wishlist.some(item => item.id === product.id) ? "white" : "#ff6543",
                                                padding: "12px 20px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "16px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                transition: "all 0.3s"
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                            {wishlist.some(item => item.id === product.id)}
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