import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { Route, withRouter, Link, Redirect } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { useSelector, useDispatch } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import SearchBar from "./components/SearchBar";
import CartSection from "./components/CartSection";
import { CATEGORIES } from "./constants/categoryConstants";
import LoadingBar from "react-top-loading-bar";
import CustomLink from "./components/CustomLink";
import { logout } from "./actions/userActions";
import Paginate from "./components/Paginate";
import NotFoundScreen from "./screens/NotFoundScreen";
import { push } from "connected-react-router";
export const LoadContext = React.createContext();
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
function App() {
  const loadRef = useRef(null);
  const [updateSamePage, setUpdateSamePage] = useState(false);
  const [preventFirstRender, setPreventFirstRender] = useState(true);
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo, loading:userInfoLoading } = userDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    const searchBar = document.querySelector(".search-bar");
    const searchBarSubmit = document.querySelector(".search-bar").nextSibling;
    const brand = document.querySelector(".brand").lastChild;
    const widthX = window.matchMedia("(max-width: 600px)");

    const searchBarExpand = () => {
      if (widthX.matches) {
        setTimeout(() => {
          brand.classList.add("on-search");
          searchBarSubmit.classList.add("on");
        }, 300);
      }
    };
    const searchBarCollapse = () => {
      if (widthX.matches) {
        setTimeout(() => {
          brand.classList.remove("on-search");
          searchBarSubmit.classList.remove("on");
        }, 300);
      }
    };
    setEventListeners({
      els: { searchBar },
      funcs: { searchBarExpand, searchBarCollapse },
    });

    return () => {
      searchBar.removeEventListener("focusin", searchBarExpand);
      searchBar.removeEventListener("focusout", searchBarCollapse);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector(".header");
    const accountSection = header.lastChild.firstChild;
    const cartTow = accountSection.nextSibling;
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        header.classList.add("onscroll");
        accountSection.style = `padding-top:${cartTow.offsetHeight + 7}px;`;
      } else {
        header.classList.remove("onscroll");
        accountSection.style = "";
      }
    };
  }, [userInfo]);
  console.log("userInfo", userInfo);
  // useEffect(() => {
  //   console.error("USEEFFECT LOGIN");
  //   if (loginStatus === false) props.history.push("/login");
  // }, [loadingLoginStatus]);
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const handleCartSection = () => {
    const cartSection = document.querySelector(".cart-tow").lastChild;
    const cartButton = cartSection.previousSibling;
    if (cartSection.classList.contains("hidden")) {
      cartButton.classList.add("clicked");
      cartSection.classList.remove("hidden");
      setTimeout(() => {
        cartSection.classList.remove("visuallyhidden");
      }, 20);
    } else {
      cartButton.classList.remove("clicked");
      cartSection.classList.add("visuallyhidden");
      cartSection.addEventListener(
        "transitionend",
        () => {
          cartSection.classList.add("hidden");
        },
        {
          capture: false,
          once: true,
          passive: false,
        }
      );
    }
  };
  const handleCategory = (newRelativePathQuery) => {
    // window.history.pushState(null, "", newRelativePathQuery);
    // window.location.search = searchParams.toString(); //causes reload page
    dispatch(push(newRelativePathQuery))
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  console.log('userInfo APP', userInfo)
  return (
    <LoadContext.Provider
      value={{
        loadRef: loadRef,
        updateSamePage: updateSamePage,
        setUpdateSamePage: setUpdateSamePage,
        preventFirstRender: preventFirstRender,
        setPreventFirstRender: setPreventFirstRender,
      }}
    >
      <LoadingBar
        ref={loadRef}
        color="#F9B93D"
        height={3}
        shadow
        transitionTime={350}
        loaderSpeed={450}
        waitingTime={700}
      />
      <div className="grid-container">
        <div className="top"></div>
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <CustomLink to="/">ramazon</CustomLink>
          </div>
          <div className="search-bar-section">
            <Route render={(props) => <SearchBar {...props} />} />
          </div>
          <div className="header-links">
            {userInfo?._id ? (
              <div className="account-section">
                <button className="account-button">Account</button>
                <div className="account-content">
                  <Link to="/profile">Profile</Link>
                  <div>
                    <div className="user-info-section">
                      <CustomLink className="profile" loading to="/profile">
                        {userInfo.name}
                      </CustomLink>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : userInfoLoading === false &&(
              <div>
                <CustomLink loading to="/login">
                  Login
                </CustomLink>
              </div>
            )}
            <div className="cart-tow">
              <button className="cart-button" onClick={handleCartSection}>
                <span className="cart-text"> Cart </span>
              </button>
              <CartSection />
            </div>
          </div>
        </header>
        <aside className="sidebar">
          <h3 className="category-title">Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="category-container">
            {CATEGORIES.map((category) => {
              const searchParams = new URLSearchParams();
              // console.log("searchParamsAPP", searchParams.toString());
              searchParams.set("category", category.toLowerCase());
              // console.log("searchParamsAPP", searchParams.toString());
              const newRelativePathQuery =
                "/search" + "?" + searchParams.toString();
              // console.log("newRelativePathQueryAPP", newRelativePathQuery);
              return (
                <li key={category} className="category-li">
                  <CustomLink
                    className="category-link"
                    to={newRelativePathQuery}
                    onClick={() => handleCategory(newRelativePathQuery)}
                  >
                    <span className="category"> {category}</span>
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        </aside>
        <main className="main">
          <Suspense fallback={<div>Waiting For Authentication ...</div>}>
            {console.log("worked")}
            <Route
              path="/products"
              render={(props) => <ProductsScreen {...props} />}
            />
            <Route
              path="/shipping"
              render={(props) => <ShippingScreen {...props} />}
            />
            <Route
              path="/payment"
              render={(props) => <PaymentScreen {...props} />}
            />
            <Route
              path="/placeorder"
              render={(props) => <PlaceOrderScreen {...props} />}
            />
            <Route
              path="/register"
              render={(props) => <RegisterScreen {...props} />}
            />
            <Route
              path="/login"
              render={(props) => <LoginScreen {...props} />}
            />
            <Route
              path="/product/:id"
              render={(props) => <ProductScreen {...props} />}
            />
            <Route
              path="/cart/:id?"
              render={(props) => <CartScreen {...props} />}
            />
            <Route
              path={["/search", "/"]}
              exact
              render={(props) => <HomeScreen {...props} />}
            />
            {/* <Route path="/404" component={NotFoundScreen} />
            <Redirect to="/404" /> */}
          </Suspense>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </LoadContext.Provider>
  );
}

const setEventListeners = (elsAndFuncs) => {
  elsAndFuncs.els.searchBar.addEventListener(
    "focusin",
    elsAndFuncs.funcs.searchBarExpand
  );
  elsAndFuncs.els.searchBar.addEventListener(
    "focusout",
    elsAndFuncs.funcs.searchBarCollapse
  );
};
export default withRouter(App);
