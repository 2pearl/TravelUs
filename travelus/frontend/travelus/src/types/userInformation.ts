// 회원가입 유저 정보
export interface SignUpUserInfo {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: string;
  phone: string;
  verificationCode: string;
  address: string;
}

// 유저 정보
export interface UserInfo {
  name: string;
  birth: string;
  phone: string;
  email: string;
  address: string;
  registerAt: string;
  isExit: boolean;
  userId: number;
  userKey: string | null;
}
