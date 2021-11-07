import "./Products.css"

import Sidebar from "../../Sidebar/Sidebar"
import Header from "../Home/Header/Header"
import Categorise from "./Categorise"

function Products() {
  return(
    <>
    <div className="main-wrapper">
      <div className="sidebar-wrapper"><Sidebar/></div>
      <div className="content-wrapper">
        <Header/>
        <div className="order-wrapper">
          <div className="products-section">
            <ul className="products-section__list">
              <li className="products-section__item">
                <a className="products-section__link products-section__link-active" href="/products">Categories</a>
              </li>
              <li className="products-section__item">
                <a className="products-section__link" href="/products/product">Products</a>
              </li>
            </ul>

            <div className="categories__wrapper">
              <Categorise/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Products