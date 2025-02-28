import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { login } from "../Auth";
import { useState, useContext, useEffect } from "react";
import { LoginRule } from "../../../utils/Rules";
import { useNavigate } from "react-router";
import AuthContext from "../../../hooks/AuthContext";
import localforage from "localforage";
import "./LoginPage.css";


export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  try {
    const user = await login(userData);
    if (user.error) {
      //又沒辦法使用useState
    } else {
      await localforage.setItem("user", JSON.stringify(user._id));
      return redirect(`/dictionary`);
    }
  } catch (e) {
    console.log(e);
  }
}


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: joiResolver(LoginRule) });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    const result = await login(data);
    console.log(result);
    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      setErrorMessage(null);
      const newUser = { id: result._id, username: result.username };
      await localforage.setItem("user", newUser);
      setUser(newUser);
      navigate("/dictionary");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && errorMessage.length > 0 && (
          <p
            className=" text-Orange-1 text-[16px]  text-center"
            aria-live="polite"
            role="alert"
          >
            {errorMessage}
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
