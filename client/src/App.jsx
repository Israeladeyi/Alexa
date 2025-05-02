import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Redirect root → login */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          {/* Only one of these will render depending on URL */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Catch-all: redirect to login */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
