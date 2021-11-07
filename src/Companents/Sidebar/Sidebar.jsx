import { NavLink, Link } from "react-router-dom"

import "./Sidebar.css"
import Logo from "../../access/Images/Logo.png"
import assignment from "../../access/Icons/assignment.svg"
import people_alt from "../../access/Icons/people_alt.svg"
import loyalty from "../../access/Icons/loyalty.svg"

function Sidebar() {
  return(
    <>
    <section className="sidebar">
      <Link className="sidebar_logo" to="/">
        <img className="sidebar_logo-img" src={Logo} width="175" height="65" alt="site-logo" />
      </Link>

      <nav className="sidebar_nav">
        <ul className="sidebar_list">
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to="/">
            <span className="sidebar_icon">
                <img src={assignment} alt="" />
              </span>
              Buyurtmalar
            </NavLink>
          </li>
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to="/clients">
            <span className="sidebar_icon">
                <img src={people_alt} alt="" />
              </span>
              Stollar
            </NavLink>
          </li>
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to="/products">
            <span className="sidebar_icon">
                <img src={loyalty} alt="" />
              </span>
              Mahsulotlar
            </NavLink>
          </li>
{/*           <li className="sidebar_item">
            <NavLink className="sidebar_link" to="/settings">
            <span className="sidebar_icon">
                <img width="23" height="23" src={settings} alt="" />
              </span>
              Oziq ovqat bo'limlari
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </section>
    </>
  )
}

export default Sidebar