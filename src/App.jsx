import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth.jsx";
import UserContextProvider from "../Context/UserContext.jsx";
import CartContextProvider from "../Context/CartContext.jsx";
import WishListContextProvider from "../Context/WishListContext.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Allorders from "./components/Allorders/Allorders.jsx";
import Wishlist from "./components/WishList/WishList.jsx";

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedAuth>
            <Home />
          </ProtectedAuth>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedAuth>
            <Products />
          </ProtectedAuth>
        ),
      },
      {
        path: "productsdetails/:id/:cat",
        element: (
          <ProtectedAuth>
            <ProductsDetails />
          </ProtectedAuth>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedAuth>
            <Categories />
          </ProtectedAuth>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedAuth>
            <Wishlist />
          </ProtectedAuth>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedAuth>
            <Brands />
          </ProtectedAuth>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedAuth>
            <Cart />
          </ProtectedAuth>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedAuth>
            <Checkout />
          </ProtectedAuth>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedAuth>
            <Allorders />
          </ProtectedAuth>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <WishListContextProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <RouterProvider router={router} />
            </QueryClientProvider>
          </WishListContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
