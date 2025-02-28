import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RegisterRule } from "../../../utils/Rules";

import { signUp } from "../Auth";
import "./RegisterPage.css";
import localforage from "localforage";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../hooks/AuthContext";

/*export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  try {
    const user = await signUp(userData);
    if (user.error) {
      //又沒辦法使用useState
    } else {
      await localforage.setItem("user", JSON.stringify(user._id));
      return redirect(`/dictionary`);
    }
  } catch (e) {
    console.log(e);
  }
}*/

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(RegisterRule) });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    const result = await signUp(data);
    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      setErrorMessage(null);
      await localforage.setItem("user", {
        id: result._id,
        username: result.username,
      });
      const newUser = { id: result._id, username: result.username };
      await localforage.setItem("user", newUser);
      setUser(newUser);
      navigate("/dictionary");
    }
  };

  return (
    <>
      <div className="RegisterPage">
        {errorMessage && errorMessage.length > 0 && (
          <p
            className=" text-Orange-1 text-[16px]  text-center"
            aria-live="polite"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="please input your email..."
              className={`RegisterPage__input focus-within:outline-Purple-1 ${
                errors.email && "border-2 border-Orange-1"
              } `}
            />
            {errors.email && (
              <p
                className=" text-Orange-1 text-[16px]  ml-auto"
                aria-live="polite"
                role="alert"
              >
                {errors.email?.message}
              </p>
            )}
          </section>
          <section>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="please input your password"
              className={`RegisterPage__input focus-within:outline-Purple-1 ${
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
              className={`RegisterPage__input focus-within:outline-Purple-1 ${
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
          <button className="RegisterPage__button" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
