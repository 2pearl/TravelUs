import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router";
import { RiHome5Line } from "react-icons/ri";
import TypeSelect from "../../components/account/inputField/TypeSelect";

const ForeignMeetingAccountCreate = () => {
  // const {} = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const stepList = ["통화를", "희망 환율을", "여행 일정을"];
  const menuList = [
    { text: "CAD", value: "none" },
    { text: "CHF", value: "airplane" },
    { text: "CNY", value: "school" },
    { text: "EUR", value: "school" },
    { text: "GBP", value: "school" },
    { text: "EUR", value: "school" },
  ];
  const [currencyType, setCurrencyType] = useState("");

  const handleCurrencyTypeChange = (currencyType: string) => {
    setCurrencyType(currencyType);
    if (currencyType !== "") {
      setStep(1);
    }
  };

  // const handleMeetingNameChange = (meetingname: string) => {
  //   setMeetingName(meetingname);
  //   if (meetingname.length >= 2) {
  //     setStep(1);
  //   }
  // };

  // const handleMeetingTypeChange = (meetingType: string) => {
  //   setMeetingType(meetingType);
  //   if (meetingType !== "") {
  //     setStep(2);
  //   }
  // };

  // const handleNext = () => {
  //   dispatch(
  //     editGeneralMeetingAccountList({
  //       generalMeetingAccountName: meetingName,
  //       generalMeetingAccountIcon: meetingType,
  //       generalMeetingAccountUserName: name,
  //       generalMeetingAccountUserResidentNumber: residentNumber,
  //       generalMeetingAccountPassword: accountPassword,
  //       generalMeetingAccountMemberList: memberList,
  //     })
  //   );

  //   navigate("/foreignmeetingaccountcreate");
  // };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col space-y-5">
        <div className="p-5 grid grid-cols-[1fr_8fr_1fr]">
          <div className="flex items-center">
            <RiHome5Line className="text-2xl" />
          </div>
          <p className="text-xl text-center font-semibold">외화모임통장 가입정보</p>
        </div>

        <div className="p-5 grid gap-8">
          <div className="grid gap-3">
            <div className="flex space-x-2">
              <p className="text-[#0471E9] font-semibold">02</p>
              <p className="font-semibold">외화모임통장 계좌개설</p>
            </div>

            <div className="text-2xl font-semibold">
              <p>{stepList[step]}</p>
              <p>입력해주세요</p>
            </div>
          </div>

          <div className="grid gap-3">
            {/* <div
              className={`transition-transform duration-300 ease-in-out ${
                step > 1 ? "translate-y-0" : "translate-y-[3px]"
              }`}>
              {step > 1 && <NameInput labelName="모임주" name={name} onChange={handleNameChange} />}
            </div>

            <div
              className={`transition-transform duration-300 ease-in-out ${
                step > 0 ? "translate-y-0" : "translate-y-[3px]"
              }`}>
              {step > 0 && <TypeSelect meetingType={meetingType} onChange={handleMeetingTypeChange} />}
            </div> */}

            <div
              className={`transition-transform duration-300 ease-in-out ${
                step === 0 ? "translate-y-0" : "translate-y-[3px]"
              }`}>
              <TypeSelect
                label="통화"
                menuList={menuList}
                selectedType={currencyType}
                onChange={handleCurrencyTypeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-10">
        {/* <button
          className={`w-full py-3 text-white bg-[#0471E9] rounded-lg ${
            step !== 4 ||
            meetingName.length < 1 ||
            meetingType === "" ||
            name.length < 2 ||
            residentNumber.length !== 14 ||
            maskedPassword.length !== 4
              ? "opacity-40"
              : ""
          }`}
          onClick={() => setStep(5)}
          disabled={
            step !== 4 ||
            meetingName.length < 1 ||
            meetingType === "" ||
            name.length < 2 ||
            residentNumber.length !== 14 ||
            maskedPassword.length !== 4
          }>
          다음
        </button> */}
      </div>
    </div>
  );
};

export default ForeignMeetingAccountCreate;
