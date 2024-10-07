import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { MeetingAccountInfo } from "../../../../types/account";
import { accountApi } from "../../../../api/account";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../lottie/loadingAnimation.json";

const FillSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupId } = useParams();
  const [meeting, setMeeting] = useState<MeetingAccountInfo | null>(null);
  const { transferAmount } = location.state as { transferAmount: string };

  useEffect(() => {
    fetchSpecificMeetingAccount();
  }, [groupId]);

  // 특정 모임 조회 API 호출
  const fetchSpecificMeetingAccount = async () => {
    try {
      const response = await accountApi.fetchSpecificMeetingAccount(Number(groupId));
      if (response.status === 200) {
        const meetingData = response.data;
        console.log(meetingData);
        setMeeting(meetingData);
      }
    } catch (error) {
      console.error("모임 조회 에러", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  if (!meeting) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Lottie animationData={loadingAnimation} />
      </div>
    );
  }

  return (
    <div className="h-full p-5 pb-8">
      <div className="h-full flex flex-col justify-between">
        <div className="h-full mt-32 flex flex-col items-center space-y-5">
          <img className="w-20 aspect-1" src="/assets/confirmIcon.png" alt="확인아이콘" />
          <div className="text-2xl font-semibold text-center">
            <p>
              {meeting?.groupName}
              <span className="font-normal"> 님에게</span>
            </p>
            <p>
              {formatCurrency(parseInt(transferAmount))}원<span className="font-normal">을</span>
            </p>
            <p className="font-normal">보냈어요</p>
          </div>
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

export default FillSuccess;
