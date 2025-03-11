import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext, useEffect } from "react";
import { LoginRule } from "../../../utils/Rules";
import { useNavigate } from "react-router";
import AuthContext from "../../../hooks/AuthContext";
import localforage from "localforage";
import { useSubmit, useActionData, Link } from "react-router";

import Navbar from "../../../components/Navbar/Navbar";
import "./LoginPage.css";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(LoginRule) });
  const { setUser, setIsLoggedIn, checkSession } = useContext(AuthContext);

  const actionData = useActionData();
  console.log(actionData);
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (actionData?.error) {
        console.log(actionData.error); // 處理錯誤
        setIsLoggedIn(false);
      }
      const newUser = { id: actionData?.id, username: actionData?.username };

      if (newUser.username != undefined && newUser.id != undefined) {
        console.log("found");
        await localforage.setItem("user", newUser);
        setUser(newUser);
        setIsLoggedIn(true);
        navigate("/dictionary");
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
  }, [actionData]);

  const onSubmit = async (data) => {
    submit(data, { action: "/login", method: "POST" });
  };

  return (
    <div className="Dictionary__LoginPage__bg font-Inter">
      <div className="Dictionary__LoginPage">
        <Navbar />
        <h1 className="Dictionary__LoginPage__item text-[28px] md:text-[48px] font-extrabold text-Black-3">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="Dictionary__LoginPage__item ">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              {...register("username")}
              placeholder="please input your username..."
              className={`Dictionary__LoginPage__input focus-within:outline-Purple-1 ${
                errors.username && "border-2 border-Orange-1"
              } `}
            />
            {errors.username && (
              <p
                className="Dictionary__LoginPage__item__error text-Orange-1 text-[16px] "
                aria-live="polite"
                role="alert"
              >
                {errors.username?.message}
              </p>
            )}
          </section>
          <section className="Dictionary__LoginPage__item ">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              {...register("password")}
              placeholder="please input your password..."
              className={`Dictionary__LoginPage__input focus-within:outline-Purple-1 ${
                errors.password && "border-2 border-Orange-1"
              } `}
            />
            {errors.password && (
              <p
                className=" text-Orange-1 text-[16px] ml-auto"
                aria-live="polite"
                role="alert"
              >
                {errors.password?.message}
              </p>
            )}
          </section>
          <div className="Dictionary__LoginPage__button__space">
            <button
              className="Dictionary__LoginPage__button font-extrabold bg-purple-500 text-white"
              type="submit"
            >
              Login
            </button>
            <button className="Dictionary__LoginPage__button font-extrabold bg-Black-3 text-white">
              <Link to={"/register"}>Register</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
