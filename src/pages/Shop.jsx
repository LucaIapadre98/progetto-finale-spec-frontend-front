import MenuLink from "../components/MenuLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link , useSearchParams, useLocation  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Search from "../components/Search";

export default function Shop (){
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "" );      //Memorizzare il testo digitato dall’utente nella barra di ricerca.
    const [sortOrder, setSortOrder] = useState({ field: null, asc: true });           //Per mostarre i prodotti in ordine
    const location = useLocation();                                              //Per non mostrare il tasto quando si trova in "/shop"
    const [selectedCategory, setSelectedCategory] = useState(""); // "" = tutte, "Tablet" o "Smartphone"

    
    useEffect(() => {
        axios.get("http://localhost:3001/products")               // Fetch prodotti all'avvio
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const brand = searchParams.get("brand");
        if (brand) {
            setFilteredProducts(
                products.filter(
                    (product) => product.brand.toLowerCase() === brand.toLowerCase()
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchParams]);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setFilteredProducts(
            (products || []).filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const sortByTitle = () => {                                                  // Funzione per ordine per titolo
        const asc = !(sortOrder.field === "title" && sortOrder.asc);
        const sorted = [...filteredProducts].sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return asc ? -1 : 1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return asc ? 1 : -1;
            return 0;
        });
        setFilteredProducts(sorted);
        setSortOrder({ field: "title", asc });
    };

    const sortByCategory = () => {                                           // Funzione per ordine per categoria
        const asc = !(sortOrder.field === "category" && sortOrder.asc);
        const sorted = [...filteredProducts].sort((a, b) => {
            if (a.category.toLowerCase() < b.category.toLowerCase()) return asc ? -1 : 1;
            if (a.category.toLowerCase() > b.category.toLowerCase()) return asc ? 1 : -1;
            return 0;
        });
        setFilteredProducts(sorted);
        setSortOrder({ field: "category", asc });
    };
    const [wishlist, setWishlist] = useState(() => {                           // Recupera la wishlist dal localStorage se esiste
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });
 
    const toggleWishlist = (product) => {                             // Funzione toggle che aggiunge i prodotti nella wishlist
        let updated;
        if (wishlist.some(item => item.id === product.id)) {
            updated = wishlist.filter(item => item.id !== product.id);
        } else {
        updated = [...wishlist, product];
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
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
            <div className="container-card">
                <div className="row">
                    <div className="col-12">
                        <div className="row-table" style={{display: "flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%"}}>
                            <div className="col-12">
                                {location.pathname !== "/shop" && (
                                    <Link to="/shop" className="btn btn-primary">
                                        Torna allo shop
                                    </Link>
                                )}
                            </div>
                            <div className="col-12">
                                <button className="btn  w-100" onClick={sortByTitle} style={{padding:"6px 11px", color: "#ff6543", background:"white", border:"1px solid #ff6543", marginTop:"5px"}}>
                                    Ordina Titolo {sortOrder.field === "title" ? (sortOrder.asc ? "▲" : "▼") : ""}
                                </button>
                            </div>
                            <div className="col-12">
                                <button className="btn w-100" onClick={sortByCategory} style={{padding:"6px 11px", color: "#ff6543", background:"white",  border:"1px solid #ff6543",marginTop:"5px"}}>
                                    Ordina Categoria {sortOrder.field === "category" ? (sortOrder.asc ? "▲" : "▼") : ""}
                                </button>
                            </div>
                            <div className="col-12">
                                <button
                                    className={`btn ${selectedCategory === "" ? "btn-primary" : "btn-outline-primary"}`} style={{
                                        padding:"6px 11px", 
                                        color: "rgb(103, 103, 255)", 
                                        backgroundColor: "white",
                                        border:"1px solid rgb(103, 103, 255)",
                                        marginLeft:"20px"
                                    }}
                                    onClick={() => setSelectedCategory("")}
                                >
                                    Tutti
                                </button>
                                <button
                                    className={`btn ${selectedCategory === "Tablet" ? "btn-primary" : "btn-outline-primary"}`} style={{
                                        margin:"5px 5px ",
                                        padding:"6px 11px", 
                                        color: "rgb(103, 103, 255)", 
                                        backgroundColor: "white",
                                        border:"1px solid rgb(103, 103, 255)"
                                    }}
                                    onClick={() => setSelectedCategory("Tablet")}
                                >
                                    Solo Tablet
                                </button>
                                <button 
                                    className={`btn ${selectedCategory === "Smartphone" ? "btn-primary" : "btn-outline-primary"}`} style={{
                                        padding:"6px 11px", 
                                        color: "rgb(103, 103, 255)", 
                                        backgroundColor: "white",
                                        border:"1px solid rgb(103, 103, 255)"
                                    }}
                                    onClick={() => setSelectedCategory("Smartphone")}
                                >
                                    Solo Smartphone
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12"> 
                        <div className="row">
                            {selectedCategory === "Tablet" &&
                                filteredProducts.filter(p => p.category === "Tablet").length === 0 && (
                                <div className="alert alert-warning text-center my-4">
                                    Nessun tablet disponibile per questo brand
                                </div>
                            )}            
                            {filteredProducts.length === 0 ? (
                                <div className="row justify-content-center" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>Nessun prodotto trovato</div>
                            ) : (
                                filteredProducts
                                    .filter(product => selectedCategory === "" ? true : product.category === selectedCategory)
                                    .map(product => (
                                    <div className="col-3" 
                                        key={product.id}
                                        style={{
                                            minWidth: filteredProducts.length <= 2 ? "320px" : "220px",
                                            maxWidth: "350px",
                                            flex: "1 1 320px",
                                            margin: "20px"
                                        }}>
                                        <div className="card">
                                            <Link to={`/products/${product.id}`}>
                                                <img 
                                                    src={`http://localhost:3001/${product.image}`}
                                                    style={{maxWidth: "100%", maxHeight:"100%", alignItems:"center"}}  
                                                    alt={product.name} 
                                                    className="image-top"
                                                />
                                            </Link>
                                            <div className="card-body">
                                                <h2 className="card-title">{product.title}</h2>
                                                <h5 className="card-text">{product.category}</h5>
                                                <div className="button-click" style={{textAlign:"left"}}>
                                                    <Link className="mt-2"  style={{ marginLeft:"30px"}}>
                                                        <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", border:"1px solid #ff6543", padding:"5px 5px", borderRadius:"4px", backgroundColor:"white", margin:"50px 0"}} icon={faHeart} onClick={() => toggleWishlist(product)} />
                                                    </Link>
                                                    <Link className=" mt-2" to={``} style={{ marginLeft:"5px"}}>
                                                        <FontAwesomeIcon className="fs-4" style={{ color: "hsla(113, 90%, 72%, 1.00)", border:"1px solid hsla(113, 90%, 72%, 1.00)", padding:"5px 5px", borderRadius:"4px", backgroundColor:"white", margin:"50px 0"}} icon={faCircleCheck} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </main>
            <Footer />
        </>
    );
};