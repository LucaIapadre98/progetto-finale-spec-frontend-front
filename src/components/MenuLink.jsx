import { NavLink } from "react-router-dom";

export default function MenuLink() {
  return (
    <div className="container-menu">
        <NavLink className="nav-link" aria-current="page" to="/">
            Home
        </NavLink>
        <NavLink className="nav-link" to="/shop">
            Shop
        </NavLink>
    </div>
  );
}
