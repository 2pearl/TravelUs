import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import MyAccount from "./pages/viewaccount/MyAccount";
import GeneralAccount from "./pages/viewaccount/GeneralAccount";
import ForeignAccount from "./pages/viewaccount/ForeignAccount";
import ViewAccount from "./pages/viewaccount/ViewAccount";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AccountCreate from "./pages/account/AccountCreate";
import ExchangeRate from "./pages/exchange/ExchangeRate";
import Exchange from "./pages/exchange/Exchange";
import SelectAccount from "./pages/exchange/SelectAccount";
import Adjustment from "./pages/adjustment/Adujstment";


function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/exchangerate" element={<ExchangeRate />} />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/accountcreate" element={<AccountCreate />}></Route>
          <Route path="/myaccount" element={<MyAccount />}></Route>
          <Route path="/generalaccount" element={<GeneralAccount />}></Route>
          <Route path="/foreignaccount" element={<ForeignAccount />}></Route>
          <Route path="/account" element={<ViewAccount />}></Route>
          <Route path="/exchange" element={<Exchange />}></Route>
          <Route path="/selectaccount" element={<SelectAccount />}></Route>
          <Route path="/adjustment" element={<Adjustment />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
