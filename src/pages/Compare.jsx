import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MenuLink from "../components/MenuLink";
import Search from "../components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { useCompare } from "../context/CompareContext";



export default function Compare () {
    const [compareList, setCompareList] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "" );            //Memorizzare il testo digitato dall’utente nella barra di ricerca.
    const [products] = useState([]);                                               // Stato per tutti i prodotti

   
    
      
    useEffect(() => {
        const saved = localStorage.getItem("compareList");                                 // Recupera la lista di confronto dal localStorage
        setCompareList(saved ? JSON.parse(saved) : []);                                    // Imposta lo stato con la lista recuperata o un array vuoto se non esiste
    }, []); 

    if (compareList.length === 0) {                                                           // Se la lista di confronto è vuota, mostra un messaggio
        return ( 
            <div className="container text-center my-5" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"80vh"}}>
                <div className="title" style={{textAlign:"center", marginBottom:"60px"}}>
                    <h1>Nessun prodotto da confrontare</h1>
                </div>
                 <div className="button" style={{textAlign:" left"}}>
                    <Link to="/shop" className="btn btn-primary mt-3" style={{textDecoration: "none", border:" 1px solid #007bff", padding: "5px 10px", color: "#007bff"}}>Torna allo shop</Link>
                 </div>
            </div>
        );
    } 
    const handleSubmitSearch = (e) => {                                                                // Funzione per gestire la ricerca dei prodotti
        e.preventDefault();                                                                            // Previene il comportamento predefinito del form
        setFilteredProducts(                                                                          // Aggiorna lo stato dei prodotti filtrati
            (products || []).filter(product =>                                                       // Filtra i prodotti in base al termine di ricerca
                product.title.toLowerCase().includes(searchTerm.toLowerCase())                    // Confronta i titoli se includono il termine di ricerca
            ) 
        );
    };
 
    const removeFromCompare = (id) => {                                                        // Funzione per rimuovere un prodotto dalla lista di confronto
        const updatedList = compareList.filter(product => product.id !== id);                 // Filtra la lista per escludere il prodotto con l'id specificato
        setCompareList(updatedList);                                                          // Aggiorna lo stato con la nuova lista
        localStorage.setItem("compareList", JSON.stringify(updatedList));                     // Aggiorna il localStorage per mantenere i dati persistenti
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
                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSubmit={handleSubmitSearch} 
                />
                <div className="d-flex flex-md-row-reverse flex-grow-1 gap-3 col-12 col-sm-2 justify-content-center justify-content-md-start align-items-center">
                    <div className="buttons d-flex gap-3">
                        <Link className="position-relative mt-2" to={`/wishlist`}>
                            <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontFamily:"30px"}} icon={faHeart} />
                        </Link>
                    </div>
              </div>
            </header>
            <main>
                 <div className="button-wishlist" style={{margin:"15px 100px 0 100px"}}>
                    <Link 
                        to={`/shop`}  
                    >
                        <p>
                            Torna allo shop
                        </p>
                    </Link>
                </div>
                <div className="title" style={{textAlign:"center", marginBottom:"40px"}}>
                    <h2 className="text-center" style={{fontSize:" 40px", color:"#ff6543"}}>Confronto prodotti</h2>
                </div>
                <div className="container-card-compare" style={{margin:"0 100px"}}>
                    <div className="row align-items-stretch">
                            {compareList.map(product => (
                                <div className="col-3 d-flex h-100" key={product.id}>
                                    <div className="card h-100 d-flex flex-column" style={{
                                        height: "300px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                        transition: "transform 0.2s",
                                        margin: "5px 10px"
                                    }}>
                                        <div className="card-header" style={{
                                            backgroundColor: "#f8f9fa",
                                            borderBottom: "1px solid #dee2e6",
                                            padding: "15px",
                                            borderRadius: "8px 8px 0 0"
                                        }}>
                                            <div className="badge" style={{
                                                backgroundColor: "#ff6543",
                                                color: "white",
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                fontWeight: "bold"
                                            }}>
                                                {product.category}
                                            </div>
                                        </div>
                                        <div className="card-body" style={{
                                            padding: "20px",
                                            flex: "1",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                                                    <h3 className="card-title" style={{
                                                        fontSize: "18px",
                                                        fontWeight: "bold",
                                                        color: "#333",
                                                        marginBottom: "10px",
                                                        lineHeight: "1.2"
                                                    }}>
                                                        {product.title}
                                                    </h3>
                                                </Link>
                                                <p style={{
                                                    color: "#666",
                                                    fontSize: "14px",
                                                    marginBottom: "15px"
                                                    
                                                }}></p>
                                                <p style={{
                                                    fontSize: "16px",
                                                    textAlign: "center",
                                                }}>
                                                    {product.category}
                                                </p>
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                borderTop: "1px solid #eee",
                                                paddingTop: "15px"
                                            }}>
                                                <button 
                                                    onClick={() => removeFromCompare(product.id)}
                                                    style={{
                                                        border: "1px solid #ff6543",
                                                        background: "white",
                                                        color: "#ff6543",
                                                        padding: "8px 15px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "14px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "5px"
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    
                                                </button>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

