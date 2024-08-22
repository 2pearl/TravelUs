import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Header from "./components/common/Header";
import AccountCreate from "./pages/account/AccountCreate";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/accountcreate" element={<AccountCreate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
