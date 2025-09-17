import MenuLink from "../components/MenuLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart,faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link ,useNavigate, useSearchParams  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

export default function Shop (){

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "" );

    
    useEffect(() => {
        axios.get("http://localhost:3001/products")       // Fetch prodotti all'avvio
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
                <div className="d-flex flex-column flex-md-row col-12 col-md-3 justify-content-center align-items-center">
                    <form  className="d-flex justify-content-center align-items-center np-form w-100 mt-2 mt-md-0">
                        <input 
                            type="text" 
                            className="form-control border-0 shadow-none np-input" 
                            style={{padding: "7px 14px",}} 
                            placeholder="Cerca..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                        <button
                            className="btn"
                            type="submit"
                            style={{
                                background: "#ff6543",
                                color: "#fff",
                                borderRadius: "0 25px 25px 0",
                                border: "none",
                                padding: "8px 14px",
                            }}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
                <div className="d-flex flex-md-row-reverse flex-grow-1 gap-3 col-12 col-sm-2 justify-content-center justify-content-md-start align-items-center">
                    <div className="buttons d-flex gap-3">
                        <Link className="position-relative mt-2" to="">
                            <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543", fontFamily:"30px"}} icon={faHeart} />
                        </Link>
                        <Link className="position-relative mt-2" to="">
                            <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543" }} icon={faCartShopping} />
                        </Link>
                    </div>
              </div>
            </header>
            <main>
            <div className="container-card">
                <div className="row">
                    {filteredProducts.length === 0 ? (
                        <div className="col-12">Nessun prodotto trovato</div>
                    ) : (
                        filteredProducts.map(product => (
                            <div className="col-3" key={product.id}>
                                <div className="card">
                                    <Link to={`/products/${product.id}`}>
                                        <img 
                                            src={`http://localhost:3001/${product.image}`}  
                                            alt={product.name} 
                                            className="image-top"
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h3 className="card-title">{product.brand}</h3>
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"><strong>{product.price} €</strong></p>
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