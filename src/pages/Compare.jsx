import { useEffect, useState } from "react";
import {Link, useSearchParams } from "react-router-dom";
import MenuLink from "../components/MenuLink";
import Search from "../components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";


export default function Compare () {
    const [products, setProducts] = useState([]);
    const [detailedProducts, setDetailedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);                       // Stato per controllare la sidebar

    useEffect(() => {
        const fetchDetailedProducts = async () => {
            try {
                const saved = localStorage.getItem("compareList");
                const savedProducts = saved ? JSON.parse(saved) : [];
                setProducts(savedProducts);

                if (savedProducts.length > 0) {
                    // Fetch dettagli completi per ogni prodotto
                    const detailedPromises = savedProducts.map(async (product) => {
                        const response = await fetch(`http://localhost:3001/products/${product.id}`);
                        const data = await response.json();
                        return data.product || data; // Adatta alla struttura della tua API
                    });

                    const detailedResults = await Promise.all(detailedPromises);
                    setDetailedProducts(detailedResults);
                }
            } catch (error) {
                console.error('Errore nel recupero dei dettagli prodotti:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailedProducts();
    }, []);

    // ...existing code...

    const removeFromCompare = (id) => {
        const updatedList = products.filter(product => product.id !== id);
        const updatedDetailedList = detailedProducts.filter(product => product.id !== id);
        
        setProducts(updatedList);
        setDetailedProducts(updatedDetailedList);
        localStorage.setItem("compareList", JSON.stringify(updatedList));
    };

    if (loading) {
        return (
            <div className="container text-center my-5" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"80vh"}}>
                <h2>Caricamento prodotti...</h2>
            </div>
        );
    }

    if (detailedProducts.length === 0) {
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
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];                       // Recupera la wishlist dal localStorage
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
                />
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

            <main >
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
                    <div className="row" style={{gap:".3rem"}}>
                            {detailedProducts.map((product) =>
                                <div className="col-4" style={{border:"1px solid #ddd", padding:"5px", borderRadius:"5px"}} key={product.id} >
                                    <div className="card h-100 d-flex flex-column">
                                        <div className="card-header" >
                                            <div className="badge" >
                                                {product.category}
                                            </div>
                                        </div>
                                        <div className="card-body d-flex flex-column flex-fill">
                                            <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                                                <h1 className="card-title"style={{
                                                    fontSize: "30px",
                                                    height: "25px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textAlign: "center"
                                                }}>
                                                    {product.title}
                                                </h1>
                                            </Link>
                                            <div className="image-container" style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "150px",
                                                marginBottom: "10px"
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
                                            <p style={{
                                                fontSize: "17px",
                                                textAlign: "center",
                                                height: "50px",
                                                overflow: "hidden",
                                                margin:"5px 5px 15px 5px",
                                                flex:"1",
                                                minHeight: "40px"
                                            }}> <span style={{color:"#ff6543"}}>Descrizione: </span><br />
                                                {product.description}
                                            </p>
                                            <p style={{
                                                fontSize: "17px",
                                                textAlign: "center",
                                                height: "40px",
                                                margin:"2px 5px",
                                                flex: "0 0 auto",
                                                minHeight: "40px"
                                            }}>
                                                <span style={{color:"#ff6543"}}>Sistema Operativo:</span> {product.sistemaOperativo}
                                            </p>
                                            <p style={{
                                                fontSize: "17px",
                                                textAlign: "center",
                                                height: "40px",
                                                margin:"2px 5px",
                                                flex: "0 0 auto",
                                                minHeight: "40px"
                                            }}>
                                                <span style={{color:"#ff6543"}}>Memoria:</span> {product.memoria}
                                            </p>
                                            <p style={{
                                                fontSize: "17px",
                                                textAlign: "center",
                                                height: "40px",
                                                margin:"2px 5px",
                                                flex: "0 0 auto",
                                                minHeight: "40px"
                                            }}>
                                                <span style={{color:"#ff6543"}}>RAM:</span> {product.ram}
                                            </p>
                                            <p style={{
                                                fontSize: "17px",
                                                textAlign: "center",
                                                height: "40px",
                                                margin:"2px 5px",
                                                flex: "0 0 auto",
                                                minHeight: "40px"
                                            }}>
                                                <span style={{color:"#ff6543"}}>Display:</span> {product.display}
                                            </p>
                                            <p style={{
                                                fontSize: "18px",
                                                textAlign: "center",
                                                height: "40px",
                                                margin:"2px 5px",
                                                flex: "0 0 auto",
                                                minHeight: "40px"
                                            }}>
                                                <span style={{color:"#ff6543"}}>Prezzo:</span> <span style={{color:"rgba(22, 177, 1, 1)"}}>{product.price}€</span>
                                            </p>
                                            <div className="mt-auto" style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                borderTop: "1px solid #eee",
                                                paddingTop: "5px",
                                                flex: "0 0 auto"
                                            }}>
                                                <button 
                                                    onClick={() => removeFromCompare(product.id)}
                                                    className="btn btn-outline-danger"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

