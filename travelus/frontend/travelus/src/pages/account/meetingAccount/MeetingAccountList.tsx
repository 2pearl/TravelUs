import React, { useState } from "react";
import { useNavigate } from "react-router";
import MeetingAccount from "../../../components/account/MeetingAccount";
import JoinedMeetingAccount from "../../../components/account/JoinedMeetingAccount";
import { useEffect } from "react";
import { accountApi } from "../../../api/account";
import { IoMdAdd } from "react-icons/io";
import { MeetingAccountInfo } from "../../../types/account";
import Lottie from "lottie-react";
import loadingAnimation from "../../../lottie/loadingAnimation.json";

const MeetingAccountListNew = () => {
  const navigate = useNavigate();
  const [createdAccountList, setCreatedAccountList] = useState<MeetingAccountInfo[]>([]);
  const [joinedAccountList, setJoinedAccountList] = useState<MeetingAccountInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const createdResponse = await accountApi.fetchCreatedMeetingAccount();
        setCreatedAccountList(createdResponse);

        const joinedResponse = await accountApi.fetchJoinedMeetingAccount();
        setJoinedAccountList(joinedResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // 의존성 배열에 필요한 값 추가

  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Lottie animationData={loadingAnimation} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full p-5 flex flex-col items-center space-y-8">
        <div className="w-full flex justify-start">
          <p className="text-xl font-bold">내 모임통장 계좌</p>
        </div>

        <div className="w-full flex flex-col space-y-6">
          <div className="p-6 bg-white rounded-xl">
            <p className="mb-7 text-lg font-bold">내가 개설한 모임통장</p>
            {/* 내가 개설한 모임 통장 있을 시 표시 */}
            {createdAccountList.length > 0 ? (
              <div className="flex flex-col space-y-6">
                {createdAccountList.map((account, index) => (
                  <MeetingAccount key={index} account={account} />
                ))}

                <div
                  onClick={() => {
                    navigate("/meeting/create/prepare");
                  }}
                  className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-zinc-200 rounded-full flex justify-center items-center">
                    <IoMdAdd className="text-3xl text-zinc-400 font-bold" />
                  </div>
                  <p className="font-bold text-[#949494]">모임통장 추가하기</p>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="flex items-center space-x-4"
                  onClick={() => {
                    navigate("/meeting/create/prepare");
                  }}>
                  <div className="w-11 h-11 bg-zinc-200 rounded-full flex justify-center items-center">
                    <IoMdAdd className="text-3xl text-zinc-400 font-bold" />
                  </div>
                  <p className="font-bold text-[#949494]">모임통장 추가하기</p>
                </div>
              </div>
            )}
          </div>

          {/* 내가 가입한 모임 통장 있을 시 표시 */}
          {joinedAccountList.length > 0 ? (
            <div className="p-6 bg-white rounded-xl">
              <p className="mb-7 text-lg font-bold">참여중인 모임통장</p>
              <div className="flex flex-col space-y-6">
                {joinedAccountList.map((account, index) => (
                  <JoinedMeetingAccount key={index} accountId={account.groupId} index={index} account={account} />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-white rounded-xl">
              <p className="mb-7 text-lg font-bold">참여중인 모임통장</p>
              <div className="flex flex-col space-y-3">
                <p className="">참여중인 모임 통장이 없어요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingAccountListNew;
