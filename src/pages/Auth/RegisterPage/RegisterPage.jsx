import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RegisterRule } from "../../../utils/Rules";

import "./RegisterPage.css";

import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../hooks/AuthContext";
import { useActionData, useSubmit } from "react-router";

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
  const actionData = useActionData();
  const submit = useSubmit();
  console.log(actionData);
  useEffect(() => {
    if (actionData?.id && actionData?.username) {
      setUser(actionData);
      navigate("/dictionary");
    }

    if (actionData?.error) {
      console.log(actionData.error);
    }
  }, [actionData, setUser, navigate]);

  const onSubmit = async (data) => {
    submit(data, { action: "/register", method: "POST" });
  };

  return (
    <>
      <div className="RegisterPage">
        {actionData?.error && actionData?.error.length > 0 && (
          <p
            className=" text-Orange-1 text-[16px]  text-center"
            aria-live="polite"
            role="alert"
          >
            {actionData.error}
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
