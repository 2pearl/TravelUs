import React from "react";
import { useNavigate } from "react-router";

const BalanceSettlementCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full p-5 pb-8">
      <div className="h-full flex flex-col justify-between">
        <div className="h-full mt-32 flex flex-col items-center space-y-5">
          <img className="w-20 aspect-1" src="/assets/confirmIcon.png" alt="확인아이콘" />

          <div className="text-2xl">
            <div className="flex justify-center">
              <p className="text-[#1429A0] font-semibold">잔액 정산</p>
              <p>이</p>
            </div>
            <p>완료되었어요</p>
          </div>

          <p className="text-[#565656] text-center leading-tight">
            모임원의 입출금통장으로
            <br />
            정산금을 보냈어요.
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="w-full h-14 text-lg rounded-xl tracking-wide text-white bg-[#1429A0]">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceSettlementCompleted;
