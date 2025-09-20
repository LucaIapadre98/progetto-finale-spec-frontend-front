import MenuLink from "../components/MenuLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";


export default function Details (){
    const [ setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const { id } = useParams();                                 // Prendi l'id dalla URL
    const [product, setProduct] = useState(null);

    const fetchProduct = () => {
        axios.get(`http://localhost:3001/products/${id}`)
            .then((res) => {                                   // chiamata API per ottenere il prodotto
                const { product } = res.data;                                   // destruttura la risposta per ottenere il prodotto
                setProduct(product); 
            })                                             // imposta il prodotto nello stato
    };
    useEffect(fetchProduct, [id]);
    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

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
            <div className="d-flex flex-md-row-reverse flex-grow-1 gap-3 col-12 col-sm-2 justify-content-center justify-content-md-start align-items-center">
                <div className="buttons d-flex gap-3">
                    <Link className="position-relative mt-2" to="">
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
            <div className="container-card">
                <div className="row">
                    {product ? (
                        <>
                            <div className="col-8">
                                <img 
                                    src={`http://localhost:3001/${product.image}`}
                                    alt={product.name}
                                    style={{ width: "55%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-4" style={{textAlign: "left", fontSize: "20px"}}>
                                <h2><spam className="spam">Modello: </spam>{product.title}</h2>
                                <h4><spam className="spam">Brand:</spam> {product.brand}</h4>
                                <p><spam className="spam">Categoria:</spam> {product.category}</p>
                                <p><spam className="spam">Descrizione:</spam> {product.description}</p>
                                <p><spam className="spam">Prezzo:</spam> {product.price}€</p>
                                <p>
                                    <Link className="position-relative mt-2" to={`/wishlist`}>
                                        <FontAwesomeIcon className="fs-4" style={{ 
                                            color: "#ff6543", 
                                            border:"1px solid #ff6543", 
                                            padding:"5px 5px", 
                                            borderRadius:"4px",
                                            backgroundColor:"white"
                                        }} icon={faHeart} onClick={() => toggleWishlist(product)} />
                                    </Link>
                                </p>
                            </div>
                        </>
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