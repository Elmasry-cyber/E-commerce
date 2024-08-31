import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNum, setCartNum] = useState(0);
  const [cartId, setCartId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [isErrorPayment, setIsErrorPayment] = useState();

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToCArt(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers,
        }
      )
      .then((ref) => {
        console.log(ref);
        return ref;
        // console.log(ref?.data.message);
        // console.log(ref?.data.numOfCartItems);
        // console.log(ref?.data.status);
        // console.log(ref?.data.data._id); // id Owner
        // toast.success(ref?.data.message);
      })
      .catch((err) => {
        console.log(err?.response.data.message);
        return err;
        // toast.error(err?.response.data.message);
      });
  }

  async function getItems() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function removeItems(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function removeAllItems() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function updateItems(productId, count) {
    if (count == 0) {
      removeItems(productId);
    }
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function checkOut(shippingAddress) {
    setIsLoading(true);
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      )
      .then((res) => {
        if (res?.data.status === "success") {
          window.location.href = res?.data.session.url;
        }
        setIsLoading(false);
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        setIsErrorPayment(err?.response.data.message);
        setIsLoading(false);
        return err;
      });
  }

  return (
    <cartContext.Provider
      value={{
        addToCArt,
        getItems,
        removeItems,
        removeAllItems,
        updateItems,
        checkOut,
        cartNum,
        setCartNum,
        cartId,
        setCartId,
        isLoading,
        isErrorPayment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
