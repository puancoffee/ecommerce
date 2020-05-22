import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/Navbar";
// import Searches from './components/searchFilter/Searches'
import Carousel from "./components/carousel/Carousel";
import Cart from "./components/cart/Cart";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/Footer";
import ItemSell from "./components/ItemSelling/Sell";
import Login from "./components/login/Login2";
import MiniCarousel from "./components/carousel/MiniCarousel";
import Register from "./components/register/Register";
import ScrollTop from "./components/scrollTop";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/authToken";
import store from "./store/store";
import { setCurrentUser, logoutUser } from "./components/actioncreators/auth";
import { Provider } from "react-redux";
import localforage from "localforage";
import PrivateRoute from "./config/privateRoute";

// import TesSearch from "./components/searchFilter/TesSearch";
import Item from "./components/reducer/item";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./signin";
  }
}
try {
  const fun = async () => {
    console.log("halo");
    const val = await localforage.getItem("keranjang");
    window.dataKeranjang = val;
  };
  fun();
} catch {
  console.error("belum bisa pakai localforage");
}

// const storage = createStore(cartReducer , applyMiddleware(thunk));
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollTop>
            <div>
              <Navbar />
            </div>
            <div>
              {/* <TesSearch /> */}
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/seller">
                <ItemSell />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/item/:id">
                <Detail />
              </Route>
              <Route path="/">
                <Carousel />
                <MiniCarousel />
                <Item />
              </Route>
            </div>
            <Switch>
              <PrivateRoute exact path="/details/detail/:id" component={Item} />
            </Switch>
            <Footer />
          </ScrollTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
