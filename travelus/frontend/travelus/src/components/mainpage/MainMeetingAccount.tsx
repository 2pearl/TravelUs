import React from "react";
import { useNavigate } from "react-router";
import { IoHome } from "react-icons/io5";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { FaUserFriends, FaBriefcase, FaHeart } from "react-icons/fa";
import path from "path";
import { MeetingAccountInfo } from "../../types/account";

interface Props {
  index: number;
  account: MeetingAccountInfo;
}

const MainMeetingAccount = ({ index, account }: Props) => {
  const navigate = useNavigate();

  // 숫자를 세 자리마다 쉼표로 구분하여 표시
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const formatAccountNumber = (accountNo: string) => {
    // 계좌번호를 각 4자리씩 나누고 '-'로 연결
    return accountNo.replace(/(\d{3})(\d{4})(\d{4})(\d{5})/, "$1-$2-$3-$4");
  };

  const getIcon = (iconName: string) => {
    // 아이콘별 배경색을 정의하는 객체
    const iconBackgrounds: Record<string, string> = {
      airPlane: "bg-[#638ee4]",
      friend: "bg-[#F5E198]",
      family: "bg-[#FFB555]",
      lover: "bg-[#EB8CA2]",
      job: "bg-[#95DBC1]",
      default: "bg-[#638ee4]", // 기본 배경색
    };

    // 해당 아이콘의 배경색을 가져오고, 없으면 기본값 사용
    const backgroundClass = iconBackgrounds[iconName] || iconBackgrounds.default;

    const containerClasses = `w-6 h-6 ${backgroundClass} rounded-full flex justify-center items-center text-white`;
    const iconClasses = "w-[0.9rem] h-[0.9rem]"; // 아이콘 자체 크기를 줄이기 위한 클래스

    let IconComponent;

    switch (iconName) {
      case "airPlane":
        IconComponent = <PiAirplaneTiltFill className={iconClasses} />;
        break;
      case "friend":
        IconComponent = <FaUserFriends className={iconClasses} />;
        break;
      case "family":
        IconComponent = <IoHome className={iconClasses} />;
        break;
      case "lover":
        IconComponent = <FaHeart className={iconClasses} />;
        break;
      case "job":
        IconComponent = <FaBriefcase className={iconClasses} />;
        break;
      default:
        IconComponent = <PiAirplaneTiltFill className={iconClasses} />;
        break;
    }

    return <span className={containerClasses}>{IconComponent}</span>;
  };

  return (
    <>
      {account && (
        <div
          onClick={() => {
            navigate(`/meetingaccount/${account.groupId}`);
          }}
          className="w-full p-5 flex flex-col rounded-xl bg-white shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="flex mb-3 space-x-2">
              {getIcon(account.icon)}
              <p className="font-bold">{account.groupName}</p>
            </div>
            <div className="rounded-md flex justify-between">
              <div className="flex items-center space-x-1">
                <p className="text-[1.3rem] font-semibold">{formatCurrency(account.moneyBoxDtoList[0].balance)}</p>
                <p className="text-[1rem]">원</p>
              </div>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-sm">트래블박스</p>
              {account?.moneyBoxDtoList?.[1] ? (
                <p className="font-semibold">{account.moneyBoxDtoList[1].balance}</p>
              ) : (
                <button className="font-semibold">개설하기</button>
              )}
            </div>
            {/* {foreignAccount && (
              <div className="rounded-md flex justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-bold">외화모임통장</p>
                  <p className="text-sm text-zinc-500">{formatAccountNumber(foreignAccount.accountNo)}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <p className="text-[1.3rem] font-semibold">{formatCurrency(foreignAccount.balance)}</p>
                  <p className="text-[1rem]">{foreignAccount.currency.currencyCode}</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default MainMeetingAccount;
