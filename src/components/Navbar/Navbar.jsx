import logo from "../../assets/images/logo.svg";
import moon from "../../assets/images/icon-moon.svg";
import "./Navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../hooks/ThemeContext";
import selectToggle from "../../assets/images/selector.svg";
import AuthContext from "../../hooks/AuthContext";
import avatar from "../../assets/images/emojinoko.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router";

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
  const fonts = ["Inter", "Lora", "Incons"];
  const currentIndex = fonts.indexOf(font);

  const handleNext = () => {
    setFont(() => fonts[(currentIndex + 1) % fonts.length]);
  };
  const handlePrev = () => {
    setFont(() => fonts[(currentIndex - 1) % fonts.length]);
  };

  return (
    <div className={`Dictionary__navbar-font__box`}>
      <button
        className={`Dictionary__navbar-font__toggler Dictionary__navbar-font__toggler--prev `}
        onClick={() => handlePrev()}
      >
        <img src={selectToggle} alt="toggler" />
      </button>
      <span className={`font-bold mx-4 `}>{font}</span>
      <button
        className={`Dictionary__navbar-font__toggler Dictionary__navbar-font__toggler--next `}
        onClick={() => handleNext()}
      >
        <img src={selectToggle} alt="toggler" />
      </button>
    </div>
  );
}

function VistorInterface({ isMobile, isNight }) {
  const [toggle, setToggle] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);
  return (
    <div className={`Dictionary__navbar-interface `} ref={menuRef}>
      {isMobile ? (
        <>
          <div className="Dictionary__navbar__space__item">
            <Link to={"/register"}>SignUp</Link>
          </div>
          <div className="Dictionary__navbar__space__item">
            <Link to={"/login"}>Login</Link>
          </div>
        </>
      ) : (
        <nav
          className={` ${
            isNight ? "bg-Black-3" : "bg-white"
          } Dictionary__navbar-interface__menu`}
        >
          <button
            className={`Dictionary__navbar-interface__button ${
              isNight ? "bg-white text-Black-3" : "bg-Black-3 text-white"
            }`}
          >
            <Link to={"/register"}>SignUp</Link>
          </button>
          <button
            className={`Dictionary__navbar-interface__button ${
              isNight ? "bg-purple-600 text-white" : "bg-purple-600 text-white"
            } ml-4`}
          >
            <Link to={"/login"}>Login</Link>
          </button>
        </nav>
      )}
    </div>
  );
}

function UserInterface({ user, isNight, logout, isMobile }) {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/dictionary");
  };
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div className={`Dictionary__navbar-interface`} ref={menuRef}>
      {!isMobile && (
        <div
          className={`Dictionary__navbar-interface__user `}
          onClick={() => setToggle(!toggle)}
        >
          <img
            className="Dictionary__navbar-interface__avatar"
            src={avatar}
            alt="avatar"
          />
          <span className="mt-1">{user.username}</span>
          <img
            src={selectToggle}
            alt="toggler"
            className={`Dictionary__navbar-interface__toggler  ${
              toggle && "rotate-180"
            }`}
          />
        </div>
      )}

      {isMobile ? (
        <div className="Dictionary__navbar__space__item">
          <form
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
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
      ) : (
        <nav
          className={`${
            toggle
              ? "Dictionary__navbar-interface__menu--open"
              : "Dictionary__navbar-interface__menu--close"
          } ${
            isNight ? "bg-Black-3 text-white" : "bg-white text-Black-3"
          }  Dictionary__navbar-interface__menu-box`}
        >
          <div className="Dictionary__navbar-interface__menu-box__item">
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
      )}
    </div>
  );
}

function Settings({ isNight, setFont, font, isMobile }) {
  const menuRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div
          className={` ${
            isNight ? "bg-Black-3" : "bg-white"
          } Dictionary__navbar-settings__menu-box `}
        >
          <div className="Dictionary__navbar-settings__menu__item">
            <FontSelector setFont={setFont} font={font} />
          </div>
          <div className="Dictionary__navbar-settings__menu__item">
            <DayNightToggle />
          </div>
        </div>
      ) : (
        <div className={`Dictionary__navbar-settings `} ref={menuRef}>
          <div
            className={`Dictionary__navbar-settings__name `}
            onClick={() => setToggle(!toggle)}
          >
            Settings
            <img
              src={selectToggle}
              alt="toggler"
              className={`Dictionary__navbar-settings__toggler  ${
                toggle && "rotate-180"
              }`}
            />
          </div>
          <nav
            className={`${
              toggle
                ? "Dictionary__navbar-settings__menu--open"
                : "Dictionary__navbar-settings__menu--close"
            } ${
              isNight ? "bg-Black-3" : "bg-white"
            } Dictionary__navbar-settings__menu-box `}
          >
            <div className="Dictionary__navbar-settings__menu__item">
              <FontSelector setFont={setFont} font={font} />
            </div>
            <div className="Dictionary__navbar-settings__menu__item">
              <DayNightToggle />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
export default function Navbar({ setFont, font, iconStyle }) {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { isNight } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const hamButtonStyle = {
    color: isNight ? "white" : "gray",
    fontSize: 30,
    marginLeft: "auto",
  };

  const getNavItems = () => {
    switch (location.pathname) {
      case "/":
        return [
          { to: "/dictionary", text: "Dictionary" },
          { to: `/${user?.id}/favorites`, text: "Favorites" },
        ];
      case `/${user?.id}/favorites`:
        return [
          { to: "/", text: "Home" },
          { to: "/dictionary", text: "Dictionary" },
        ];
      case "/dictionary":
        return [
          { to: "/", text: "Home" },
          { to: `/${user?.id}/favorites`, text: "Favorites" },
        ];
      case "/login":
        return [
          { to: "/", text: "Home" },
          { to: "/dictionary", text: "Dictionary" },
          { to: `/${user?.id}/favorites`, text: "Favorites" },
        ];
      case "/register":
        return [
          { to: "/", text: "Home" },
          { to: "/dictionary", text: "Dictionary" },
          { to: `/${user?.id}/favorites`, text: "Favorites" },
        ];

      default:
        return [
          { to: "/", label: "Home" },
          { to: "/dictionary", label: "Dictionary" },
          { to: `/${user?.id}/favorites`, label: "Favorites" },
        ];
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isWideScreen = window.innerWidth >= 768;
      setIsMobile(!isWideScreen);
      setIsOpen(isWideScreen); // 如果是桌機模式就自動打開選單
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 767) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={menuRef}
      className={`Dictionary__navbar ${
        isNight ? "text-white" : "text-Black-3"
      }  transition duration-400 ease-in-out`}
    >
      <img
        src={logo}
        alt="dictionary__logo"
        className="Dictionary__navbar__logo"
      />

      {isMobile && (
        <MenuIcon
          sx={hamButtonStyle}
          onClick={() => setIsOpen(() => !isOpen)}
        />
      )}
      <div
        className={`Dictionary__navbar__space ${
          isOpen
            ? "Dictionary__navbar__space--open"
            : "Dictionary__navbar__space--close"
        } ${isNight ? "" : "bg-white"}
        `}
      >
        {getNavItems().map((item, index) => (
          <div key={index} className="Dictionary__navbar__space__item">
            <Link to={`${item.to}`}>{item.text}</Link>
          </div>
        ))}
        {location.pathname === "/dictionary" && (
          <div className="Dictionary__navbar__space__item">
            <Settings
              setFont={setFont}
              font={font}
              isNight={isNight}
              isMobile={isMobile}
            />
          </div>
        )}
        <div className="Dictionary__navbar__space__item order-1">
          {isLoggedIn ? (
            <UserInterface
              user={user}
              isNight={isNight}
              logout={logout}
              isMobile={isMobile}
            />
          ) : (
            <VistorInterface isMobile={isMobile} isNight={isNight} />
          )}
        </div>
      </div>
    </nav>
  );
}
