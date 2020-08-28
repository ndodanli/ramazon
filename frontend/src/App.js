import React, { useState, useRef, memo, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  NavLink,
} from "react-router-dom";
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
import LoginScreen from "./screens/LoginScreen";
import { auth, signout } from "./actions/userActions";
import { USER_AUTH_CLEAN } from "./constants/userConstants";
import AuthControl from "./hooks/useAuthControl";
export const LoadContext = React.createContext();

function App(props) {
  const loadRef = useRef(null);
  const [userInfo, setUserInfo] = useState({})
  // const userAuth = useSelector((state) => state.userAuth);
  // const { userInfo } = userAuth;
  const dispatch = useDispatch();
  useEffect(() => {
    const cartSection = document.querySelector(".cart-section");
    const searchBar = document.querySelector(".search-bar");
    setEventListeners(cartSection);
    return () => {
      cartSection.removeEventListener();
      searchBar.removeEventListener();
    };
  }, []);
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
    }
  };
  const handleCategory = (newRelativePathQuery) => {
    window.history.pushState(null, "", newRelativePathQuery);
    // window.location.search = searchParams.toString(); //causes reload page
  };
  const signOutHandler = () => {
    dispatch(signout());
  };
  // const test = useRef(true);
  // console.log('APPPP')
  // if(test.current){
  //   console.log('test.current', test.current)
  //   AuthControl().then(res => setUserInfo(res))
  // }
  // test.current = false
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
            <LinkLoading to="/">ramazon</LinkLoading>
          </div>
          <div className="search-bar-section">
            <SearchBar historyPush={props.history.push} />
          </div>
          <div className="header-links">
            <div className="cart-link" onClick={handleCartSection}>
              Cart{" "}
            </div>
            {userInfo ? (
              <div>
                <LinkLoading to="/profile">{userInfo.name}</LinkLoading>
                <LinkLoading to="/" onClick={() => signOutHandler()}>
                  Sign out
                </LinkLoading>
              </div>
            ) : (
              <LinkLoading to="/signin">Signin</LinkLoading>
            )}
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
          <Route path="/products" component={ProductsScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          {/* <Route path="/oauth_callback" component={LoginCallback} /> */}
          <Route
            path={["/search", "/"]}
            exact
            component={withRouter(HomeScreen)}
          />
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </LoadContext.Provider>
  );
}

const setEventListeners = (cartSection) => {
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
  const searchBar = document.querySelector(".search-bar");
  const brand = document.querySelector(".brand").lastChild;
  const widthX = window.matchMedia("(max-width: 600px)");
  searchBar.addEventListener("focusin", () => {
    if (widthX.matches) {
      brand.classList.add("search");
    }
  });
  searchBar.addEventListener("focusout", () => {
    if (widthX.matches) {
      setTimeout(() => {
        brand.classList.remove("search");
      }, 300);
    }
  });
};
export default withRouter(App);
