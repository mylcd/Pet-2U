import { useNavigate } from "react-router-dom";
import NavLogo from "../../../public/NavLogo.svg"
import NavCart from "../../../public/NavCart.svg"
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();

  // Home icon navigates to home page
  const handleNavigateHome = () => {
    navigate('/');
  }
  // Cart icon navigates to Shopping Cart page
  const handleNavigateCart = () => {
    navigate('/cart');
  }

  return (
    <nav className="navbar">
      <div>
        <button
          id="home-button"
          onClick={handleNavigateHome}
        >
          <img id="home-logo" src={NavLogo}/>
        </button>
      </div>

      <div className="nav-topright">
        <ProfileButton />
        <button
          id="cart-button"
          onClick={handleNavigateCart}
        >
          <img id="cart-logo" src={NavCart}/>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
