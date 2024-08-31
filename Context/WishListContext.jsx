import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";

export let wishListContext = createContext();

export default function WishListContextProvider(props) {
  const [wishList, setWishList] = useState([]);
  const [wishListSuccess, setWishListSuccess] = useState();

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToWishList(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers,
        }
      )
      .then((ref) => ref)
      .catch((err) => err);
  }

  async function getWishList() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((ref) => ref)
      .catch((err) => err);
  }
  async function removeWishList(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((ref) => ref)
      .catch((err) => err);
  }

  return (
    <>
      <wishListContext.Provider
        value={{
          wishList,
          setWishList,
          addToWishList,
          wishListSuccess,
          setWishListSuccess,
          getWishList,
          removeWishList,
        }}
      >
        {props.children}
      </wishListContext.Provider>
    </>
  );
}
