import MenuLink from "../components/MenuLink";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Wishlist (){
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
                    <Link to={`/shop`}>
                        <p>
                            Torna allo shop
                        </p>
                    </Link>
                </div>
            </main>
        </>
    );
};
