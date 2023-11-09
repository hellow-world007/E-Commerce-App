import React, { useState, useContext, useRef } from "react";
import { AppContext } from "../page/Context";
import { Link, NavLink, Outlet, Navigate } from "react-router-dom";
import { RiShoppingBasketLine } from "react-icons/ri";
import BasketItem from "./BasketItem";

const Navbar = ({ glasses }) => {
  const {
    inputValue,
    setInputValue,
    isSubmit,
    setIsSubmit,
    itemId,
    setItemId,
    length,
    setLength,
    clearBasket,
    setClearBasket,
    array,
    setArray,
    click,
    setClick,
    deleteArray,
    setDeleteArray,
    removePrice,
    setRemovePrice,
    filteredData,
    removeArray,
    setRemoveArray,
  } = useContext(AppContext);

  const searchRef = useRef(null);

  const [quantity, setQuantity] = useState(1);
  const [basket, setBasket] = useState(false);

  let priceArray = [];
  filteredData.forEach((data) => {
    priceArray.push(data.price);
  });

  const initialValue = 0;
  const priceSum = priceArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const priceSum2 = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const priceSum3 = deleteArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const priceSum4 = removePrice.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const priceSum5 = removeArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  function handleSubmit(e) {
    e.preventDefault();
    const searchIn = searchRef.current.value;
    setInputValue(searchIn);
    setIsSubmit(true);
  }

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  function handleShowBasket() {
    setBasket(true);
  }

  function handleCloseBasket(e) {
    e.preventDefault();
    setBasket(false);
  }

  function handleClearBasket() {
    setClearBasket(true);
    itemId.splice(0, itemId.length);
    setArray([]);
    setDeleteArray([]);
    setRemovePrice([]);

    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  function checkOut() {
    alert(
      `Checkout - Subtotal: ${
        priceSum + priceSum2 - priceSum3 - priceSum5 - priceSum4
      }.00`
    );
  }

  return (
    <div className="link">
      <div className="links">
        <nav className="nav--links">
          <Link className="home" to="/">
            #E-COMMERCE
          </Link>

          <div className="side--links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Shop
            </NavLink>

            <NavLink
              to="/featured"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Featured
            </NavLink>

            <NavLink
              to="/recommended"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Recommended
            </NavLink>
          </div>
        </nav>

        <div className="others">
          <div className="first">
            <Link to="/search">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  ref={searchRef}
                  placeholder="Search products..."
                />
              </form>
            </Link>
          </div>

          <div className="second">
            <div className="basket--icon" onClick={handleShowBasket}>
              <RiShoppingBasketLine
                size="1.5rem"
                color="#222222"
                className="basket-icon"
              />
              <span>
                {filteredData.length > 0 &&
                  `${clearBasket ? length * 0 : length}`}
              </span>
            </div>

            <Link to="/login" className="login-link">
              Log In
            </Link>

            <button onClick={fakeLogOut} className="log-out">
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className={`basket-container ${basket ? "fade-in" : ""}`}>
        <div className="basket-header">
          <p>My Basket({`${clearBasket ? length * 0 : length} items`})</p>
          <div className="btn-container">
            <button className="close" onClick={handleCloseBasket}>
              Close
            </button>
            <button onClick={handleClearBasket}>Clear Basket</button>
          </div>
        </div>

        <div className="item-list">
          {/* { glassElements } */}
          {filteredData?.map((glass) => {
            return (
              <BasketItem
                key={glass.id}
                glass={glass}
                quantity={quantity}
                setQuantity={setQuantity}
                priceArray={priceArray}
                array={array}
                setArray={setArray}
                click={click}
                setClick={setClick}
              />
            );
          })}
        </div>

        <div className="basket-footer">
          <div className="basket-amount">
            <p className="title-amt">Subtotal Amount</p>
            <p className="summed-amount">
              {`$${
                priceSum + priceSum2 - priceSum3 - priceSum5 - priceSum4
              }.00`}
            </p>
          </div>
          <button onClick={checkOut}>CHECK OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
