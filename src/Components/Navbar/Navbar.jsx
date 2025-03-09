import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import SideBarWidget from "../SideBarWidget/SideBarWidget";
import { NavLink, Link } from "react-router-dom";

import Topbar from "./TopBar/Topbar";
import "./Navbar.css";
import "./navBar-mobile.css";

import { useGlobalContext } from "../../Context/GlobalContext";
import SearchBar from "../searchBar/SearchBar";

export default function Navbar() {
  const HeaderLinks = ["الصفحة الرئيسية", "تسجيل الدخول", "إنشاء حساب"];
  const { productsInCart, productsInCart_TotalPrice, toggleCart, cartSideBarToggle, setSearchState, searchState } =
    useGlobalContext();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setSearchState((val) => !val);
  };

  useEffect(() => {
    return () => {
      toggleCart(false);
      setSearchState(false);
    };
  }, [])

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    // تنفيذ الفحص عند تحميل المكون
    checkScreenSize();

    // إضافة مستمع للتغيير في حجم النافذة
    window.addEventListener("resize", checkScreenSize);

    // تنظيف المستمع عند إزالة المكون
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // تبديل حالة قائمة الجوال
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div>
        <Topbar />
        <header className="header" dir="ltr">
          <div className="header-container">
            {isMobile && (
              <div className="mobile-menu-box">
                <FaBarsStaggered id="mobile-menu" onClick={toggleMobileMenu} />
              </div>
            )}

            {/* عرض القائمة دائمًا ولكن مع تطبيق أنماط CSS المناسبة */}
            <div
              className={`header-links ${
                isMobile && mobileMenuOpen ? "mobile-menu-active" : ""
              }`}
            >
              <ul>
                {HeaderLinks.map((link, index) => (
                  <li className="header-li" key={index}>
                    <a href="#" className="header-a">
                      {link}
                    </a>
                  </li>
                ))}

                <li className="header-li" onClick={toggleSearch}>
                  <a href="#" className="header-a">
                    <IoSearch
                      className="header-search-icon"
                      id="header-search-icon"
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div className="header-logo">
              <NavLink to="" className="logo-box">
              <img src={`${import.meta.env.BASE_URL}/images/logo.png`} alt="Logo" />


              </NavLink>
            </div>

            <div className="header-cart">
              <div className="cart-box">
                <div className="cart-box-div">
                  <div className="cart-content">
                    <a
                      href="#"
                      className="cart-link"
                      onClick={() => toggleCart(true)}
                    >
                      <span className="cart-span" dir="rtl">
                        {productsInCart_TotalPrice} ريال سعودي
                      </span>
                      <div className="cart-icon-box">
                        <FaCartPlus id="cart-icon" />
                      </div>
                      <span className="cart-counter">
                        {productsInCart.length}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </header>
      </div>

      {searchState && <SearchBar />}
      {cartSideBarToggle && <SideBarWidget />}

    </>
  );
}
