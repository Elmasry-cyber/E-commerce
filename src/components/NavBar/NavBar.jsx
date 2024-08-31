import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/UserContext";
import { cartContext } from "../../../Context/CartContext";

function NavBar() {
  let { userLogin, setUserLogin } = useContext(userContext);

  let navigate = useNavigate();

  let { cartNum } = useContext(cartContext);

  function logout() {
    setUserLogin(null);
    localStorage.clear("userToken");
    navigate("/login");
  }

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary py-3 position-fixed w-100 z-3"
    >
      <Container fluid>
        <Link to="" className="text-decoration-none text-black fw-bold fs-3">
          <i className="fa-solid fa-cart-shopping fa-flip t-main"></i>
          Fresh Cart
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {userLogin ? (
            <Nav className="m-auto my-2 my-lg-0">
              <NavLink to="" className=" text-decoration-none t-black fs-5 m-2">
                Home
              </NavLink>
              <NavLink
                to="/products"
                className=" text-decoration-none t-black fs-5 m-2"
              >
                Products
              </NavLink>
              <NavLink
                to="/categories"
                className=" text-decoration-none t-black fs-5 m-2"
              >
                Categories
              </NavLink>
              <NavLink
                to="/wishlist"
                className=" text-decoration-none t-black fs-5 m-2"
              >
                Wish List
              </NavLink>
              <NavLink
                to="/brands"
                className=" text-decoration-none t-black fs-5 m-2"
              >
                Brands
              </NavLink>
              <NavLink
                to="/cart"
                className="position-relative text-decoration-none t-black fs-5 m-2"
              >
                Cart
                <span className="cart-num t-main position-absolute">
                  {cartNum}
                </span>
              </NavLink>
            </Nav>
          ) : (
            ""
          )}
          <ul className="list-unstyled d-flex align-items-center justify-content-center mb-0 ms-auto">
            {userLogin ? (
              <>
                <Link to="/cart">
                  <i className="fa-solid fa-cart-shopping fa-beat t-main fa-xl position-relative">
                    <span className="cart-num t-main position-absolute">
                      {cartNum}
                    </span>
                  </i>
                </Link>
                <li className="ms-4">
                  <a
                    onClick={logout}
                    className=" text-decoration-none t-black fs-5 m-2 cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className=" text-decoration-none t-black fs-5 m-2"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className=" text-decoration-none t-black fs-5 m-2"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
