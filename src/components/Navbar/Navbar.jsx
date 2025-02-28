import logo from "../../assets/images/logo.svg";
import moon from "../../assets/images/icon-moon.svg";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../hooks/ThemeContext";
import selectToggle from "../../assets/images/selector.svg";
import AuthContext from "../../hooks/AuthContext";
import avatar from "../../assets/images/emojinoko.jpg";
import { Link, useNavigate } from "react-router";

function DayNightToggle() {
  const { isNight, setIsNight } = useContext(ThemeContext);
  return (
    <div className="Dictionary__navbar__toggle">
      <label htmlFor="toggle" className="Dictionary__navbar__toggle-space ">
        <input
          checked={isNight}
          type="checkbox"
          id="toggle"
          onChange={() => {
            setIsNight(() => !isNight);
          }}
        />
        <span className="Dictionary__navbar__toggle-switch"></span>
      </label>
      <img src={moon} alt="moon" className="Dictionary__navbar__toggle-moon" />
    </div>
  );
}
function FontSelector({ setFont }) {
  const { isNight } = useContext(ThemeContext);
  return (
    <div className="Dictionary__navbar__selector-box">
      <img
        src={selectToggle}
        alt="toggler"
        className="Dictionary__navbar__selector-toggler"
      />
      <select
        className={`Dictionary__navbar__selector ${
          isNight ? "text-white" : ""
        } mr-6 pr-2 `}
        defaultValue={"Inter"}
        onChange={(e) => setFont(() => e.target.value)}
      >
        <option value="Inter">Sans Serif</option>
        <option value="Lora">Serif</option>
        <option value="Inconsolata">Mono</option>
      </select>
    </div>
  );
}
function UserInterface({ isLoggedIn, user, isNight, logout }) {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/dictionary");
  };

  return (
    <>
      <div
        className={`flex ${isNight ? "text-white" : "text-Black-3"} font-bold`}
      >
        {isLoggedIn ? (
          <div className="Dictionary__navbar__user m-4">
            <img
              className="Dictionary__navbar__user__avatar"
              src={avatar}
              alt="avatar"
            />
            <div className="flex mt-1">
              <p className="Dictionary__navbar__user__name">{user.username}</p>
              <form
                onSubmit={(event) => {
                  if (
                    !confirm("Please confirm you want to delete this record.")
                  ) {
                    event.preventDefault();
                  } else {
                    event.preventDefault();
                    handleLogout();
                  }
                }}
              >
                <button type="submit">logout</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <span className="mx-2">
              <Link to={"/register"}>SignUp</Link>
            </span>
            or
            <span className="mx-2">
              <Link to={"/login"}>Login</Link>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default function Navbar({ setFont }) {
  const { isLoggedIn, user, setUser, logout } = useContext(AuthContext);
  const { isNight } = useContext(ThemeContext);
  return (
    <nav className="Dictionary__navbar my-6 md:my-12">
      <a href="#">
        <img
          src={logo}
          alt="dictionary__logo"
          className="Dictionary__navbar__logo"
        />
      </a>
      <div className="Dictionary__navbar__space">
        <FontSelector setFont={setFont} />
        <DayNightToggle />
        <UserInterface
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          isNight={isNight}
          logout={logout}
        />
      </div>
    </nav>
  );
}
