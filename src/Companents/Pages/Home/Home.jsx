import Sidebar from "../../Sidebar/Sidebar"
import Header from "./Header/Header"
import Orders from "../Orders/Orders"
import "./Home.css"

function Home() {
  return(
    <>
    <div className="main-wrapper">
      <div className="sidebar-wrapper"><Sidebar/></div>
      <div className="content-wrapper">
        <Header/>
        <div className="order-wrapper">
          <Orders/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home