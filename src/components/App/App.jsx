import Index from "../../pages/Index/Index.jsx";
import Dictionary from "../../pages/Dictionary/Dictionary.jsx";
import LoginPage from "../../pages/Auth/LoginPage/LoginPage.jsx";
import RegisterPage from "../../pages/Auth/RegisterPage/RegisterPage.jsx";
import { Route, Routes } from "react-router";
import React, { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
