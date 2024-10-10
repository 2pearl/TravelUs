import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import ExchangeRateInputMui from "../../components/travelBox/ExchangeRateInputMui";
import ExchangeAmmountInput from "../../components/travelBox/ExchangeAmmountInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTravelboxInfo } from "../../redux/meetingAccountSlice";
import { IoPerson } from "react-icons/io5";
import { accountApi } from "../../api/account";

const SelectTypeOfAutoExchange: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const travelboxInfo = useSelector((state: RootState) => state.meetingAccount.travelboxInfo);
  const [type, setType] = useState<number | null>(null);
  const groupId = 1;
  const guideData = [
    {
      text: ["사용자 설정", "자동환전", "환율, 금액을 직접 선택해 자동환전해요"],
      img: "userIcon_blue",
    },
    {
      text: ["즉시", "자동환전", "모임통장 잔액을", "현재 환율로 즉시 자동환전해요"],
      img: "immediatelyExchange",
    },
    {
      text: ["자동환전", "안 할래요", "직접 환전을 통해서만 환전해요"],
      img: "directlyExchange",
    },
  ];

  const handleNext = () => {
    if (type === 0) {
      navigate("/travelbox/create/auto/exchange/rate", { state: { currency: location.state.currency } });
    } else if (type === 1) {
      changeExchangeMode();
    } else {
      navigate(`/travelbox/create/auto/exchange/completed/NONE`, {
        state: { nextPath: `/meetingaccount/${groupId}` },
      });
    }
  };

  const handleSelectType = (type: number) => {
    setType(type);
  };

  const changeExchangeMode = async () => {
    const data = {
      groupId: groupId,
      exchangeType: "NOW",
    };

    try {
      const response = await accountApi.fetchChangeExchangeMode(data);
      if (response.status === 200) {
        navigate("/travelbox/create/auto/exchange/completed/NOW");
      }
    } catch (error) {
      console.log("accountApi의 fetchChangeExchangeMode : ", error);
    }
  };

  return (
    <div className="h-full p-5 pb-8 flex flex-col justify-between">
      <div className="grid gap-14">
        <div className="flex items-center">
          <IoIosArrowBack className="text-2xl" />
        </div>

        <div className="grid gap-10">
          <div className="grid gap-3">
            <div className="flex space-x-2">
              <p className="text-[#0471E9] font-semibold">01</p>
              <p className="font-medium">자동환전 종류 선택</p>
            </div>

            <p className="text-2xl font-semibold">
              외화저금통으로
              <br />
              환전할 방법을 선택해주세요
            </p>
          </div>

          <div>
            <div className="flex flex-col space-y-5">
              {guideData.map((data, index) => (
                <div
                  onClick={() => handleSelectType(index)}
                  className={`w-full p-4 py-6 rounded-lg bg-[#eef4ff] flex flex-col transition-all duration-300 ease-in-out ${
                    type === index ? "border-2 border-[#1429A0] shadow-lg" : "border-2 border-transparent"
                  }`}>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-zinc-700">
                        {index === 1 ? (
                          <>
                            <p className="font-semibold">
                              <span className="text-[#1429A0]">{data.text[0]} </span>
                              {data.text[1]}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-[#1429A0] font-semibold">{data.text[0]}</p>
                            <p className="font-semibold">{data.text[1]}</p>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-zinc-600">
                        {index === 1 ? (
                          <>
                            {data.text[2]}
                            <br />
                            {data.text[3]}
                          </>
                        ) : (
                          data.text[2]
                        )}
                      </p>
                    </div>
                    <img className="w-16 h-16" src={`/assets/${data.img}.png`} alt="유저" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="w-full h-14 text-lg rounded-xl tracking-wide text-white bg-[#1429A0]"
        onClick={() => handleNext()}>
        다음
      </button>
    </div>
  );
};

export default SelectTypeOfAutoExchange;
