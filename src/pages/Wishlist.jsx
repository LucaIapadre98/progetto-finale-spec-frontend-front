import MenuLink from "../components/MenuLink";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Wishlist (){

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        setWishlist(saved ? JSON.parse(saved) : []);
    }, []);

    const removeFromWishlist = (id) => {
        const updated = wishlist.filter(product => product.id !== id);
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
                            <div className="col-12">Nessun prodotto nella wishlist</div>
                        ) : (
                            wishlist.map(product => (
                                <div className="col-3" key={product.id}>
                                    <div className="card">
                                        <img
                                            src={`http://localhost:3001/${product.image}`}
                                            alt={product.name}
                                            className="card-img-top"
                                            style={{ width: "180px", height: "180px", objectFit: "cover", margin: "0 auto" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">{product.category}</p>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text"><strong>{product.price} €</strong></p>
                                            <button
                                                className="btn"
                                                style={{ color: "#ff6543", background: "none", border: "none", fontSize: "1.5rem" }}
                                                onClick={() => removeFromWishlist(product.id)}
                                                title="Rimuovi dalla wishlist"
                                            >
                                                <FontAwesomeIcon icon={ faTrashCan} style={{ color: "#ff6543", border:"1px solid #ff6543", padding:"3px 3px", borderRadius:"4px", backgroundColor:"white", marginRight:" 350px", marginTop:"80px"}} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </main>
        </>
    );
};
