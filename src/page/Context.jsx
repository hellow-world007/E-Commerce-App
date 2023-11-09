import React, { createContext, useState, useEffect } from "react";
import { getGlasses } from "../api";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [glasses, setGlasses] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [basketItemsId, setBasketItemsId] = useState("");

  const [itemId, setItemId] = useState([]);
  const [length, setLength] = useState(0);
  const [clearBasket, setClearBasket] = useState(false);

  const [status, setStatus] = useState([]);
  const [detailStatus, setDetailStatus] = useState([]);
  const [deleteArray, setDeleteArray] = useState([]);
  const [removePrice, setRemovePrice] = useState([]);
  const [removeArray, setRemoveArray] = useState([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [array, setArray] = useState([]);
  const [click, setClick] = useState(false);
  const [menuItem, setMenuItem] = useState([]);

  const toggleRemove = () => {
    setIsRemove(!isRemove);
  };

  useEffect(() => {
    async function getAllData() {
      const data = await getGlasses();
      setGlasses(data);
    }
    getAllData();
  }, []);
  
  let filteredData = []
  
  for(let i=0; i<itemId.length ; i++){
    if(glasses){
      clearBasket ? filteredData : filteredData.push(...glasses.filter(item => item.id === itemId[i] ))
    }
  }

  const value = {
    glasses,
    setGlasses,
    inputValue,
    setInputValue,
    isSubmit,
    setIsSubmit,
    basketItemsId,
    setBasketItemsId,
    itemId,
    setItemId,
    length,
    setLength,
    clearBasket,
    setClearBasket,
    status,
    setStatus,
    loading,
    setLoading,
    array,
    setArray,
    click,
    setClick,
    deleteArray,
    setDeleteArray,
    removePrice,
    setRemovePrice,
    detailStatus,
    setDetailStatus,
    filteredData,
    menuItem, setMenuItem,
    removeArray, setRemoveArray
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
