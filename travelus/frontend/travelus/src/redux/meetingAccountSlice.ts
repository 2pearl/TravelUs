import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MeetingAccountInfo, TravelboxInfo } from "../types/meetingAccount";

export interface meetingAccountState {
  meetingName: string;
  meetingType: string;
  meetingAccounInfo: MeetingAccountInfo;
  travelboxInfo: TravelboxInfo;
  individualAccountNo: string;
}

const initialState: meetingAccountState = {
  meetingName: "",
  meetingType: "",
  meetingAccounInfo: {
    groupAccountPassword: "",
    groupName: "",
    icon: "",
  },
  travelboxInfo: {
    accountPassword: "",
    accountNo: "",
    currencyCode: "",
  },
  individualAccountNo: "",
}

export const meetingAccountSilce = createSlice({
  name: "meetingAccount",
  initialState,
  reducers: {
    setMeetingName: (state, action: PayloadAction<string>) => {
      state.meetingName = action.payload;
    },
    setMeetingType: (state, action: PayloadAction<string>) => {
      state.meetingType = action.payload;
    },
    setMeetingAccountInfo: (state, action: PayloadAction<MeetingAccountInfo>) => {
      state.meetingAccounInfo = action.payload;
    },
    setTravelboxInfo: (state, action: PayloadAction<TravelboxInfo>) => {
      state.travelboxInfo = action.payload;
    },
    setindividualAccountNo: (state, action: PayloadAction<string>) => {
      state.individualAccountNo = action.payload;
    },
  },
});

export const { setMeetingName, setMeetingType, setMeetingAccountInfo, setTravelboxInfo, setindividualAccountNo } = meetingAccountSilce.actions;

export default meetingAccountSilce.reducer;