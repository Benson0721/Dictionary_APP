import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RegisterRule } from "../../../../src/utils/Rules";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import AuthContext from "../../../hooks/AuthContext";
import { useActionData, useSubmit, Link } from "react-router";
import Navbar from "../../../../src/components/Navbar/Navbar";
import localforage from "localforage";
import "./RegisterPage.css";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(RegisterRule) });

  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const actionData = useActionData();
  const submit = useSubmit();
  console.log(actionData);
  useEffect(() => {
    const checkUserStatus = async () => {
      if (actionData?.error) {
        setIsLoggedIn(false);
      }
      const newUser = { id: actionData?.id, username: actionData?.username };
      console.log(newUser);
      if (newUser.username != undefined && newUser.id != undefined) {
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
    submit(data, { action: "/register", method: "POST" });
  };

  return (
    <div className="Dictionary__RegisterPage__bg font-Inter">
      <div className="Dictionary__RegisterPage">
        <Navbar />
        <h1 className="Dictionary__RegisterPage__item text-[28px] md:text-[48px] font-extrabold text-Black-3">
          Register
        </h1>
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
          <section className="Dictionary__RegisterPage__item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="please input your email..."
              className={`Dictionary__RegisterPage__input focus-within:outline-Purple-1 ${
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

          <section className="Dictionary__RegisterPage__item ">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              {...register("username")}
              placeholder="please input your username..."
              className={`Dictionary__RegisterPage__input focus-within:outline-Purple-1 ${
                errors.username && "border-2 border-Orange-1"
              } `}
            />
            {errors.username && (
              <p
                className="Dictionary__RegisterPage__item__error text-Orange-1 text-[16px] "
                aria-live="polite"
                role="alert"
              >
                {errors.username?.message}
              </p>
            )}
          </section>
          <section className="Dictionary__RegisterPage__item ">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              {...register("password")}
              placeholder="please input your password..."
              className={`Dictionary__RegisterPage__input focus-within:outline-Purple-1 ${
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
          <div className="Dictionary__RegisterPage__button__space">
            <button
              className="Dictionary__RegisterPage__button font-extrabold bg-purple-500 text-white"
              type="submit"
            >
              Register
            </button>

            <button
              className="Dictionary__RegisterPage__button font-extrabold bg-Black-3 text-white"
              type="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
