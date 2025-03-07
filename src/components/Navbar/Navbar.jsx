import logo from "../../assets/images/logo.svg";
import moon from "../../assets/images/icon-moon.svg";
import "./Navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../hooks/ThemeContext";
import selectToggle from "../../assets/images/selector.svg";
import AuthContext from "../../hooks/AuthContext";
import avatar from "../../assets/images/emojinoko.jpg";
import { Link, useNavigate, useActionData } from "react-router";

function DayNightToggle() {
  const { isNight, setIsNight } = useContext(ThemeContext);
  return (
    <div className="Dictionary__navbar-toggle">
      <label htmlFor="toggle" className="Dictionary__navbar-toggle__space ">
        <input
          checked={isNight}
          type="checkbox"
          id="toggle"
          onChange={() => {
            setIsNight(() => !isNight);
          }}
        />
        <span className="Dictionary__navbar-toggle__switch"></span>
      </label>
      <img src={moon} alt="moon" className="Dictionary__navbar-toggle__moon" />
    </div>
  );
}
function FontSelector({ font, setFont }) {
  const { isNight } = useContext(ThemeContext);
  const [fontToggle, setFontToggle] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setFontToggle(false);
      }
    };

    if (fontToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fontToggle]);
  return (
    <div
      className={`Dictionary__navbar-font__box ${isNight ? "text-white" : ""}`}
      ref={selectRef}
    >
      <span className="font-bold">{font}</span>
      <img
        src={selectToggle}
        alt="toggler"
        className={`Dictionary__navbar-font__toggler ${
          fontToggle && "rotate-180"
        }`}
        onClick={() => setFontToggle((prev) => !prev)}
      />

      <ul
        className={`${
          fontToggle
            ? "Dictionary__navbar-font__selector--open"
            : "Dictionary__navbar-font__selector--close"
        } Dictionary__navbar-font__selector-box font-bold`}
      >
        <li
          className="Dictionary__navbar-font__selector__item font-Inter"
          onClick={() => {
            setFont(() => "Inter");
            setFontToggle(() => false);
          }}
        >
          Inter
        </li>
        <li
          className="Dictionary__navbar-font__selector__item font-Lora"
          onClick={() => {
            setFont(() => "Lora");
            setFontToggle(() => false);
          }}
        >
          Lora
        </li>
        <li
          className="Dictionary__navbar-font__selector__item font-Inconsolata "
          onClick={() => {
            setFont(() => "Inconsolata");
            setFontToggle(() => false);
          }}
        >
          Inconsolata
        </li>
      </ul>
    </div>
  );
}

function UserInterface({
  isLoggedIn,
  user,
  setUser,
  isNight,
  logout,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = useState(true);
  const [userToggle, setUserToggle] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/dictionary");
  };
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserToggle(false);
      }
    };

    if (userToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userToggle]);

  return (
    <div className={`Dictionary__navbar-user m-4 font-bold `} ref={menuRef}>
      {isLoggedIn ? (
        <>
          <img
            className="Dictionary__navbar-user__avatar"
            src={avatar}
            alt="avatar"
          />
          <p
            className={`Dictionary__navbar-user__name mt-1 ${
              isNight ? "text-white" : "text-Black-3"
            }`}
          >
            {user.username}
          </p>
          <img
            src={selectToggle}
            alt="toggler"
            className={`Dictionary__navbar-user__toggler  ${
              userToggle && "rotate-180"
            }`}
            onClick={() => setUserToggle(!userToggle)}
          />
          <nav
            className={`${
              userToggle
                ? "Dictionary__navbar-user__menu--open"
                : "Dictionary__navbar-user__menu--close"
            } Dictionary__navbar-user__menu-box`}
          >
            <div className="Dictionary__navbar-user__menu__item">
              <Link to={`/${user.id}/favorite`}>Favorites</Link>
            </div>
            <div className="Dictionary__navbar-user__menu__item">
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
                <button type="submit">Logout</button>
              </form>
            </div>
          </nav>
        </>
      ) : (
        <>
          <img
            className="Dictionary__navbar-user__avatar"
            src={avatar}
            alt="avatar"
          />
          <p
            className={`Dictionary__navbar-user__name mt-1 ${
              isNight ? "text-white" : "text-Black-3"
            }`}
          >
            Anonymous
          </p>
          <img
            src={selectToggle}
            alt="toggler"
            className={`Dictionary__navbar-user__toggler  ${
              userToggle && "rotate-180"
            }`}
            onClick={() => setUserToggle(!userToggle)}
          />
          <nav
            className={`${
              userToggle
                ? "Dictionary__navbar-user__menu--open"
                : "Dictionary__navbar-user__menu--close"
            } Dictionary__navbar-user__menu-box`}
          >
            <div className="Dictionary__navbar-user__menu__item">
              <Link to={"/register"}>SignUp</Link>
            </div>
            <div className="Dictionary__navbar-user__menu__item">
              <Link to={"/login"}>Login</Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
export default function Navbar({ setFont, font }) {
  const { isLoggedIn, user, setUser, logout, setIsLoggedIn } =
    useContext(AuthContext);
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
        <FontSelector setFont={setFont} font={font} />
        <DayNightToggle />
        <UserInterface
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
          isNight={isNight}
          logout={logout}
        />
      </div>
    </nav>
  );
}
