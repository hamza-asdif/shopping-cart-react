/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import "./SideBarWidget.css";
import { FaRegCircleXmark } from "react-icons/fa6";
import ProductInCart from "./ProductInCart/ProductInCart";
import { useGlobalContext } from "../../Context/GlobalContext";
import { Link } from "react-router-dom";


export default function SideBarWidget() {
  const {
    productsInCart,
    productsInCart_TotalPrice,
    cartSideBarToggle, // This should control the visibility
    toggleCart,
  } = useGlobalContext();

  // Handler for overlay click
  const handleOverlayClick = () => {
    toggleCart(false);
  };

  
  

  return (
    <div dir="rtl">
      {/* Add overlay */}
      <div
        className={`cart-overlay ${cartSideBarToggle ? "active" : ""}`}
        onClick={handleOverlayClick}
      />

      {/* Add active class based on cartSideBarToggle */}
      <div className={`cart-sidebar ${cartSideBarToggle ? "active" : ""}`}>
        <div className="cart-sidebar-header">
          <div className="sidebar-header-content">
            <h3 className="sidebar-header-title">سلة مشترياتي</h3>
            <span className="sidebar-header-span">
              {productsInCart.length} عناصر
            </span>
          </div>

          <FaRegCircleXmark
            id="close-sidebar"
            onClick={() => toggleCart(false)}
          />
        </div>

        <div
          className={`cart-sidebar-products ${
            !productsInCart.length ? "No-Product-Span" : ""
          }`}
        >
          <ul className="ul-product-dom">
            {productsInCart.length ? (
              productsInCart.map((CartP) => (
                <ProductInCart Cart_Products={CartP} key={CartP.id} />
              ))
            ) : (
              <span className="No-Product-Span">سلة مشترياتكم فارغة</span>
            )}
          </ul>
        </div>

        <div className="sidebar-call-to-action">
          <div className="sidebar-first-tab">
            <span className="first-tab-title">مجموع سلة التسوق</span>
            <span className="first-tab-span" id="cart-sum-span">
              {productsInCart_TotalPrice} ريال سعودي
            </span>
          </div>

          <div className="sidebar-middle-tab">
            <Link to="/cart" className="middle-tab-btn" >شراء الآن</Link>
          </div>

          <div className="sidebar-last-tab">
            <Link to="/" className="last-tab-btn" onClick={() => toggleCart(false)}>
              استمر في التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
