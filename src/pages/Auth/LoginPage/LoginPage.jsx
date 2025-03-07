import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext, useEffect } from "react";
import { LoginRule } from "../../../utils/Rules";
import { useNavigate } from "react-router";
import AuthContext from "../../../hooks/AuthContext";
import localforage from "localforage";
import { useSubmit, useActionData } from "react-router";
import FavoriteListsContext from "../../../hooks/FavoriteListsContext";
import "./LoginPage.css";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(LoginRule) });
  const { fetchLists, lists, toggleHeart, favoriteWords } =
    useContext(FavoriteListsContext);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {actionData?.error && actionData?.error.length > 0 && (
          <p
            className=" text-Orange-1 text-[16px]  text-center"
            aria-live="polite"
            role="alert"
          >
            {actionData.error}
          </p>
        )}
        <section>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username")}
            placeholder="please input your username..."
            className={`LoginPage__input focus-within:outline-Purple-1 ${
              errors.username && "border-2 border-Orange-1"
            } `}
          />
          {errors.username && (
            <p
              className=" text-Orange-1 text-[16px]  ml-auto"
              aria-live="polite"
              role="alert"
            >
              {errors.username?.message}
            </p>
          )}
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="please input your password..."
            className={`LoginPage__input focus-within:outline-Purple-1 ${
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
        <button className="LoginPage__button" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
