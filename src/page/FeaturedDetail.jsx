import React, { useContext } from "react";
import { getGlass } from "../api";
import { AppContext } from "./Context";
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailForm from "./DetailForm";

export function loader({ params }) {
  return getGlass(params.id);
}

const FeaturedDetail = () => {
  const {
    setItemId,
    length,
    setLength,
    clearBasket,
    setClearBasket,
    detailStatus,
    setDetailStatus,
    setArray,
    setDeleteArray,
    setRemovePrice,
    filteredData,
    menuItem,
    setMenuItem,
  } = useContext(AppContext);

  const location = useLocation();

  const detail = useLoaderData();

  const addToBasket = (e) => {
    const ID = e.target.parentElement.parentElement.id;

    const findMatch = filteredData.some((data) => data.id === ID);
    if (findMatch) {
      toast("You have already ordered it!", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-message",
      });
      return;
    }

    setItemId((prevState) => {
      return [...prevState, `${ID}`];
    });

    toast("Item added to basket!", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message",
    });

    setLength(length + 1);
    setClearBasket(false);
    setDetailStatus((prev) => [...prev, e.target]);

    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "block";
  };

  function removeFromBasket(e) {
    setLength(length - 1);
    setItemId((prev) => {
      return prev.filter(
        (item) => item !== e.target.parentElement.parentElement.id
      );
    });

    toast("Item removed from basket!", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message",
    });

    e.target.style.display = "none";
    e.target.previousElementSibling.style.display = "block";

    setArray([]);
    setDeleteArray([]);
    setRemovePrice([]);
  }

  function handleSearch(size, color, id) {
    setMenuItem([...menuItem, { id: id, size: size, color: color }]);
  }

  console.log(menuItem);

  const search = location.state?.search && location.state?.search;
  const name = location.state?.name && location.state?.name;

  return (
    <div className="details-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {name} items</span>
      </Link>

      {detail && (
        <div className="detailed-items">
          <img src={detail.imageUrl} />
          <div id={detail.id} className="detail-elements">
            <p className="nickname">{detail.category}</p>
            <p className="main-name">{detail.name}</p>
            <p className="descriptionn">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
              earum veniam cum sit non in delectus rem consequuntur! Voluptas,
              reiciendis.
            </p>
            <hr />

            <DetailForm onSearch={handleSearch} id={detail.id} />

            <p className="main-price">{`$${detail.price}.00`}</p>
            <div className="buttons">
              <button
                className="add-to-baskett"
                id={detail.id}
                onClick={addToBasket}
              >
                Add to basket
              </button>
              <button
                className="remove-from-baskett"
                onClick={removeFromBasket}
              >
                Remove from basket
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FeaturedDetail;
