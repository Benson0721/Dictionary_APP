import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { DictionaryContentProvider } from "./hooks/DictionaryContext.jsx";
import { ThemeContentProvider } from "./hooks/ThemeContext.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { FavoriteContentProvider } from "./hooks/FavoriteContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index/Index.jsx";
import Dictionary from "./pages/Dictionary/Dictionary.jsx";
import LoginPage from "./pages/Auth/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage.jsx";
import FavoritePage from "./pages/Favorite/FavoritePage.jsx";
import { loginAction } from "./pages/Auth/LoginPage/LoginAction.js";
import { registerAction } from "./pages/Auth/RegisterPage/RegisterAction.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    /*errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,*/
  },
  {
    path: "dictionary",
    element: <Dictionary />,
    /*loader: contactLoader,
    action: contactAction,*/
  },
  {
    path: "login",
    element: <LoginPage />,
    //loader: contactLoader,
    action: loginAction,
  },
  {
    path: "register",
    element: <RegisterPage />,
    //errorElement: <AuthError />,
    //loader: contactLoader,
    action: registerAction,
  },
  {
    path: ":id/favorite",
    element: <FavoritePage />,
    //errorElement: <AuthError />,
    //loader: contactLoader,
    action: registerAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContentProvider>
        <FavoriteContentProvider>
          <DictionaryContentProvider>
            <RouterProvider router={router} />
          </DictionaryContentProvider>
        </FavoriteContentProvider>
      </ThemeContentProvider>
    </AuthProvider>
  </StrictMode>
);
