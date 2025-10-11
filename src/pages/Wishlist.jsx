import MenuLink from "../components/MenuLink";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function Wishlist (){

    const [wishlist, setWishlist] = useState([]);                                         // Stato per la wishlist                                               
    
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");                                  // Recupera la wishlist dal localStorage se esiste
        setWishlist(saved ? JSON.parse(saved) : []);                                     // Altrimenti ritorna con un array vuoto, converte in oggetto JS
    }, []);

    const removeFromWishlist = (id) => {                                                // Funzione per rimuovere i prodotti dalla wishlist
        const updated = wishlist.filter(product => product.id !== id);                  // Filtra la wishlist rimuovendo il prodotto con l'id specificato
        setWishlist(updated);                                                           // Aggiorna lo stato della wishlist
        localStorage.setItem("wishlist", JSON.stringify(updated));                     // Aggiorna il localStorage con la wishlist aggiornata, convertendo in stringa JSON
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
                        <Link className="position-relative mt-2" to="">
                            <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontFamily:"30px"}} icon={faHeart} />
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <div className="button-wishlist">
                    <Link 
                        to={`/shop`}  
                    >
                        <p>
                            Torna allo shop
                        </p>
                    </Link>
                </div>
                <div className="container-card">
                    <div className="row">
                        {wishlist.length === 0 ? (
                             <div className="container text-center my-5" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"80vh", paddingLeft:"600px"}}>
                                    <div className="title" style={{textAlign:"center", marginBottom:"60px"}}>
                                        <h1>Nessun prodotto nella wishlist</h1>
                                    </div>
                                </div>
                        ) : (
                            wishlist.map(product => (
                                <div className="col-3" key={product.id}>
                                    <div className="card" style={{minHeight: "280px", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px"}}>
                                        <div className="card-body text-center">
                                            <Link to={`/products/${product.id}`} style={{textDecoration: "none"}}>
                                                <h3 className="card-title" style={{color: "#333", marginBottom: "15px", fontWeight: "bold", fontSize: "30px"}}>
                                                    {product.title}
                                                </h3>
                                            </Link>
                                            
                                            <p className="card-text" style={{fontSize:"17px", margin: "80px 20px"}}>
                                                <span style={{color:"#ff6543", fontWeight: "bold"}}>Categoria: </span>
                                                <span style={{color: "#666"}}>{product.category}</span>
                                            </p>
                                            <div style={{marginTop: "auto", paddingTop: "15px"}}>
                                                <button
                                                    className="btn"
                                                    style={{ 
                                                        color: "#ff6543", 
                                                        background: "none", 
                                                        border: "2px solid #ff6543", 
                                                        borderRadius: "8px",
                                                        padding: "8px 12px",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    onClick={() => removeFromWishlist(product.id)}
                                                    title="Rimuovi dalla wishlist"
                                                    onMouseOver={(e) => {
                                                        e.target.style.backgroundColor = "#ff6543";
                                                        e.target.style.color = "white";
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.backgroundColor = "transparent";
                                                        e.target.style.color = "#ff6543";
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}  />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
