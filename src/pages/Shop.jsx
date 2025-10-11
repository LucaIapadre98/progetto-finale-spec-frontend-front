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
     
    const [products, setProducts] = useState([]);                                    // Stato per memorizzare i prodotti
    const [filteredProducts, setFilteredProducts] = useState([]);                    // Stato per memorizzare i prodotti filtrati in base alla ricerca
    const [searchParams] = useSearchParams();                                        // Per gestire i parametri di ricerca nell'URL
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "" );      // Memorizzare il testo digitato dall’utente nella barra di ricerca.
    const [sortOrder, setSortOrder] = useState({ field: null, asc: true });          // Per mostarre i prodotti in ordine
    const location = useLocation();                                                  // Per non mostrare il tasto quando si trova in "/shop"
    const [selectedCategory, setSelectedCategory] = useState("");                    // Se

    
    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(res => {
                console.log('Prodotti ricevuti:', res.data); // Debug
                setProducts(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const brand = searchParams.get("brand");                        // Filtra i prodotti in base al parametro "brand" nella URL
        if (brand) {                                                    // Se esiste il parametro "brand", filtra i prodotti
            setFilteredProducts(                                        // Aggiorna i prodotti filtrati
                products.filter(
                    (product) => product.brand === brand    //Confronta il brand del prodotto con il parametro "brand"
                )
            );
        } else {
            setFilteredProducts(products);                                  // Altrimenti, mostra tutti i prodotti
        } 
    }, [products, searchParams]);                                          // Eseguito quando cambiano "products" o "searchParams"

    const handleSubmitSearch = (e) => {                                    // Funzione per la ricerca
        e.preventDefault();
        setFilteredProducts(                                              // Aggiorna i prodotti filtrati in base al termine di ricerca
            (products || []).filter(product =>                            //Prodotti che includono il termine di ricerca
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const sortByTitle = () => {                                                  // Funzione per ordine per titolo
        const asc = !(sortOrder.field === "title" && sortOrder.asc);             // Determina se l'ordinamento deve essere ascendente o discendente
        const sorted = [...filteredProducts].sort((a, b) => {                    // Crea una copia dell'array e lo ordina
            if (a.title.toLowerCase() < b.title.toLowerCase()) return asc ? -1 : 1;    
            if (a.title.toLowerCase() > b.title.toLowerCase()) return asc ? 1 : -1;     
            return 0;
        });
        setFilteredProducts(sorted);                                             // Aggiorna i prodotti filtrati con l'array ordinato
        setSortOrder({ field: "title", asc });                                   // Aggiorna lo stato dell'ordinamento
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
        return saved ? JSON.parse(saved) : [];                                 // Altrimenti ritorna con un array vuoto     
    });
    
    const toggleWishlist = (product) => {
        console.log('Prodotto da aggiungere alla wishlist:', product); 
        console.log('Prezzo del prodotto:', product.price); 
        
        let updated;
        if (wishlist.some(item => item.id === product.id)) {
            updated = wishlist.filter(item => item.id !== product.id);
        } else {
            const completeProduct = {
                id: product.id,
                title: product.title,
                category: product.category,
            };
            console.log('Prodotto completo da salvare:', completeProduct); // Debug
            updated = [...wishlist, completeProduct];
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
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

    const handleSearch = (term) => {                                    // Funzione per la ricerca con debounce
        setFilteredProducts(
            (products || []).filter(product =>
                product.title.toLowerCase().includes(term.toLowerCase())
            )
        );
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
                    onSearch={handleSearch}
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
                    <div className="col-12" style={{margin:"5px 100px 20px 410px"}}>
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
                                    className={`btn ${selectedCategory === "" ? "btn-primary" : "btn-outline-primary"}`} 
                                    onClick={() => setSelectedCategory("")}
                                >
                                    Tutti
                                </button>
                                <button
                                    className={`btn ${selectedCategory === "Tablet" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setSelectedCategory("Tablet")}
                                >
                                    Solo Tablet
                                </button>
                                <button 
                                    className={`btn ${selectedCategory === "Smartphone" ? "btn-primary" : "btn-outline-primary"}`}
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
                                            maxWidth: "350px",
                                            flex: "1 1 320px",
                                            margin: "20px"
                                        }}>
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="badge">
                                                    {product.category}
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                                                        <h2 className="card-title" style={{
                                                            fontSize: "28px",
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            marginBottom: "10px",
                                                            lineHeight: "1.2"
                                                        }}>
                                                            {product.title}
                                                        </h2>
                                                    </Link>
                                                    <p style={{
                                                        color: "#666",
                                                        fontSize: "14px",
                                                        marginBottom: "15px"
                                                    }}>
                                                        {product.brand}
                                                    </p>
                                                    {product.price && (
                                                        <div style={{
                                                            fontSize: "20px",
                                                            fontWeight: "bold",
                                                            color: "#ff6543",
                                                            marginBottom: "15px"
                                                        }}>
                                                            €{product.price}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="button-click">
                                                    <button
                                                        onClick={() => toggleWishlist(product)}
                                                        style={{
                                                            border: "none",
                                                            background: "transparent",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        <FontAwesomeIcon 
                                                            className="fs-4" 
                                                            style={{color: wishlist.some(item => item.id === product.id) ? "#ff6543" : "#ccc"}} 
                                                            icon={faHeart} 
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleCompare(product)}
                                                        style={{
                                                            border: "none",
                                                            background: "transparent",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            className="fs-4"
                                                            style={{
                                                                color: compareList.some(item => item.id === product.id) ? "green" : "hsla(113, 90%, 72%, 1.00)",
                                                                backgroundColor: compareList.some(item => item.id === product.id) ? "#eaffea" : "white"
                                                            }}
                                                            icon={faCircleCheck}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {/* Pulsante per andare alla pagina di confronto se almeno 2 prodotti selezionati */}
                {compareList.length >= 2 && (
                    <div className="text-center my-3">
                        <Link to="/compare" className="btn btn-success" style={{textDecoration:"none", border:"1px solid #ff6543", display:"inline-block", padding:"5px 10px", borderRadius:"4px", color:"#ff6543", margin:" 20px 10px"}}>
                            Confronta {compareList.length} prodotti selezionati
                        </Link>
                    </div>
                )}
            </div>
            </main>
            <Footer />
        </>
    );
};