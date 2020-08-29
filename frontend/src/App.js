import React, { useState, useRef, memo, useEffect } from "react";
import "./App.css";
import { Route, Link, withRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigningScreen";
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
import LinkLoading from "./components/LinkLoading";
import { signout } from "./actions/userActions";
import AuthWrapper from "./components/AuthWrapper";

export const LoadContext = React.createContext();

function App(props) {
  const loadRef = useRef(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, userInfo, error } = userDetails;

  const userLoginStatus = useSelector((state) => state.userLoginStatus);
  const {
    loading: loadingSignOut,
    loginStatus,
    error: errorSignOut,
  } = userLoginStatus;
  const dispatch = useDispatch();
  useEffect(() => {
    const searchBar = document.querySelector(".search-bar");
    const brand = document.querySelector(".brand").lastChild;
    const widthX = window.matchMedia("(max-width: 600px)");

    const searchBarExpand = () => {
      if (widthX.matches) {
        brand.classList.add("search");
      }
    };
    const searchBarCollapse = () => {
      if (widthX.matches) {
        setTimeout(() => {
          brand.classList.remove("search");
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

    if (loginStatus === false) props.history.push("/signin");
  }, [loginStatus]);
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const handleCartSection = () => {
    const cartSection = document.querySelector(".cart-section");
    if (cartSection.classList.contains("hidden")) {
      cartSection.classList.remove("hidden");
      setTimeout(() => {
        cartSection.classList.remove("visuallyhidden");
      }, 20);
    } else {
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
    window.history.pushState(null, "", newRelativePathQuery);
    // window.location.search = searchParams.toString(); //causes reload page
  };
  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <LoadContext.Provider
      value={{
        loadRef: loadRef,
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
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <LinkLoading to="/">{userInfo.name}</LinkLoading>
            <div></div>
          </div>
          <div className="search-bar-section">
            <SearchBar historyPush={props.history.push} />
          </div>
          <div className="header-links">
            <div className="cart-link" onClick={handleCartSection}>
              Cart{" "}
            </div>
            <div>
              <LinkLoading to="/profile"></LinkLoading>
              <button onClick={() => signOutHandler()}>Sign out</button>
            </div>
            <LinkLoading to="/signin">Signin</LinkLoading>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            {CATEGORIES.map((category) => {
              const searchParams = new URLSearchParams();
              // console.log("searchParamsAPP", searchParams.toString());
              searchParams.set("category", category.toLowerCase());
              // console.log("searchParamsAPP", searchParams.toString());
              const newRelativePathQuery =
                "/search" + "?" + searchParams.toString();
              // console.log("newRelativePathQueryAPP", newRelativePathQuery);
              return (
                <li key={category}>
                  <Link
                    to={newRelativePathQuery}
                    onClick={() => handleCategory(newRelativePathQuery)}
                  >
                    {category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        <main className="main">
          <div className="content"></div>
          <CartSection />

          <Route
            path="/products"
            render={(props) => (
              <AuthWrapper>
                {" "}
                <ProductsScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/shipping"
            render={(props) => (
              <AuthWrapper>
                <ShippingScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/payment"
            render={(props) => (
              <AuthWrapper>
                <PaymentScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/placeorder"
            render={(props) => (
              <AuthWrapper>
                <PlaceOrderScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <AuthWrapper>
                <RegisterScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/signin"
            render={(props) => (
              <AuthWrapper>
                {" "}
                <SigninScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/product/:id"
            render={(props) => (
              <AuthWrapper>
                {" "}
                <ProductScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path="/cart/:id?"
            render={(props) => (
              <AuthWrapper>
                <CartScreen {...props} />
              </AuthWrapper>
            )}
          />
          <Route
            path={["/search", "/"]}
            exact
            render={(props) => (
              <AuthWrapper>
                <HomeScreen {...props} />
              </AuthWrapper>
            )}
          />
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
