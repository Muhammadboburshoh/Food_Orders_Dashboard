import logout from "../../../../access/Icons/logout.svg"
import Profile from "../../../../access/Icons/Profile.svg"
import "./Header.css";

function Header() {

  const user = JSON.parse(window.localStorage.getItem("__auth"))
  return(
    <>
    <header className="header">

      <div className="header__right">
        <div className="profile">
          <div className="profile__info">
            <span className="profile__name">{user.user.username}</span>
          </div>
          <button className="profile__btn">
            <img src={Profile} width="35" height="30" alt="" />
          </button>
          <div className="profile__wrapper">
            <button className="logout-btn">
              Chiqish
              <img className="logout-img" src={logout} alt="logout" />
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header