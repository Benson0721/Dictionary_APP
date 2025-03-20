import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import "./assets/css/generated-tailwind.css";
import { DictionaryContentProvider } from "./hooks/DictionaryContext.jsx";
import { ThemeContentProvider } from "./hooks/ThemeContext.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { FavoriteListsContextProvider } from "./hooks/FavoriteListsContext.jsx";
import { FavoriteWordsContextProvider } from "./hooks/FavoriteWordsContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FrontPage from "./pages/FrontPage/FrontPage.jsx";
import Dictionary from "./pages/Dictionary/Dictionary.jsx";
import LoginPage from "./pages/Auth/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage.jsx";
import FavoritePage from "./pages/FavoritePage/FavoritePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { loginAction } from "./pages/Auth/LoginPage/LoginAction.js";
import { registerAction } from "./pages/Auth/RegisterPage/RegisterAction.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "dictionary",
    element: <Dictionary />,
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: "register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: ":id/favorites",
    element: (
      <ProtectedRoute>
        <FavoritePage />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContentProvider>
        <FavoriteListsContextProvider>
          <FavoriteWordsContextProvider>
            <DictionaryContentProvider>
              <RouterProvider router={router} />
            </DictionaryContentProvider>
          </FavoriteWordsContextProvider>
        </FavoriteListsContextProvider>
      </ThemeContentProvider>
    </AuthProvider>
  </StrictMode>
);
