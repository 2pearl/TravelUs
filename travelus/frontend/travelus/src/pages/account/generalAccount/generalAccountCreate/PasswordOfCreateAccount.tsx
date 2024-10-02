import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useNavigate, useParams } from "react-router";
import SecurityNumberKeyboard from "../../../../components/common/SecurityNumberKeyboard";
import { accountApi } from "../../../../api/account";
import { AxiosError } from "axios";
import { AxiosErrorResponseData } from "../../../../types/axiosError";
import { exchangeRateApi } from "../../../../api/exchange";

const PasswordOfCreateAccount = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (password.length === 4) {
      navigate("/account/create/password/check", { state: { originalPassword: password } });
    }
  }, [password]);

  return (
    <div className="h-full grid grid-rows-[2fr_1fr]">
      <div className="flex flex-col justify-center items-center space-y-10">
        <p className="text-xl text-center font-medium leading-tight">
          입출금 통장에서 사용할
          <br />
          비밀번호를 입력해주세요
        </p>

        <div className="flex space-x-3">
          {[...Array(4)].map((_, index) => (
            <div
              className={`w-4 aspect-1 ${index < password.length ? "bg-[#565656]" : "bg-[#D9D9D9]"} rounded-full`}
              key={index}></div>
          ))}
        </div>
      </div>

      <SecurityNumberKeyboard password={password} setPassword={setPassword} />
    </div>
  );
};

export default PasswordOfCreateAccount;
