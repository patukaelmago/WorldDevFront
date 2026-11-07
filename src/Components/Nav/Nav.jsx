import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import logo from "./world-developers.png";
import suitcase from "./suitcase.svg";
import defaultPic from "./defaultPic.svg";
import "./Styles.css";
import { useAuth } from "../../context/AuthContext";
import { clearCart } from "../../redux/action/cartAction";
import { getDetailUser } from "../../redux/action/actionAuth";
import NavItem from "../NavItem/NavItem";

const navLinks = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/home",
    label: "Hotels",
  },
  {
    path: "/home/Events",
    label: "Events",
  },
  {
    path: "/about",
    label: "About us",
  },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { logout, user } = useAuth();
  const datosTotal= useSelector(state => state.reducerAuth.users)
  const cartTotalQuantity = useSelector(
    (state) => state.reducerCart.cartTotalQuantity
  );

  useEffect(() => {
    if(user && user.hasOwnProperty('uid')){
      dispatch(getDetailUser(user.uid))
    }
  }, [dispatch, user])

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearCart())
      setUserMenuOpen(!isUserMenuOpen)
      navigate('/')
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUserMenuToggle = () => setUserMenuOpen(!isUserMenuOpen)
  
  return (
    <nav className="nav-container navbar navbar-expand-lg sticky-top">
      <div className="container-fluid position-relative" style={{ maxWidth: "1200px" }}>
        <Link className="navbar-brand" to="/">
          <img height={40} src={logo} alt="World Developers logo" />
        </Link>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(open => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse pb-2 pb-lg-0${mobileOpen ? ' show' : ''}`} id="navbarSupportedContent">
          <div className="mx-auto"></div>
          <ul className="navbar-nav d-flex align-items-center">
            {navLinks.map(link => (
              <NavItem key={link.label} {...link} />
            ))}
            <li className="nav-cart-container nav-item">
              <Link className="nav-link text-dark mx-2" to="/cart">
                <img src={suitcase} alt="Shopping Cart" />
                <span className="nav-cart-itemsSelected">
                  {cartTotalQuantity}
                </span>
              </Link>
            </li>

            {!user ? (
              <button className="nav-log-btn ms-lg-4" onClick={() => navigate('/login')} type="button">
                Log in
              </button>
            ) : (
              <button className="d-flex flex-column align-items-center ms-lg-4 pe-lg-1 border-0 bg-transparent" type="button" aria-label="Open profile menu" aria-expanded={isUserMenuOpen} onClick={handleUserMenuToggle}>
                <img className="rounded-circle" width={40} src={user?.photoURL || defaultPic} alt="Profile pic" />
              </button>
            )}

            {isUserMenuOpen && (
              <div className="nav-usermenu-bg">
                <p>{user?.displayName || user?.email}</p>
                <hr className="my-3" />
                <p>
                  {datosTotal.rol === "user" ? (
                    <Link className="text-reset" onClick={handleUserMenuToggle} to="/profileusers">
                      See profile
                    </Link>
                  ) : null}
                  {datosTotal.rol === "admin" ? (
                    <Link className="text-reset" onClick={handleUserMenuToggle} to="/profileAdmin">
                      See profile
                    </Link>
                  ) : null}
                  {datosTotal.rol === "superAdmin" ? (
                    <Link className="text-reset" onClick={handleUserMenuToggle} to="/profileSuperAdmin">
                      See profile
                    </Link>
                  ) : null}
                </p>
                <button className="nav-log-btn" onClick={handleLogout} type="button">
                  Log out
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
