// 환율 타입
export interface ExchangeRateInfo {
  currencyCode: string;
  exchangeRate: number;
  exchangeMin: number;
  created: string;
}

// 환율 그래프를 위한 타입
export interface ExchangeRateHistoryRequest {
  currencyCode: string;
  startDate: string;
  endDate: string;
}

export interface ExchangeRateHistoryResponse {
  id: number;
  postAt: string;
  dealBasR: number;
  ttb: number;
  tts: number;
  cashBuying: number;
  cashSelling: number;
  tcBuying: number;
}

// 환전 진행 관련 요청 / 응답
export interface ExchangeRequest {
  userId: number;
  accountId: number;
  accountNo: string;
  currencyCode: string;
  exchangeAmount: number;
  exchangeRate: number;
}

export interface ExchangeResponse {
  exchangeCurrencyDto: {
    amount: number;
    exchangeRate: number;
    currency: string;
  },
  accountInfoDto: {
    accountNo: string;
    accountId: number;
    amount: number;
    balance: number;
  },
  executed_at: string;
}

// 통화 종류
export const currencyNames: { [key: string]: string } = {
  USD: '미국 달러',
  JPY: '일본 엔',
  EUR: '유럽 유로',
  CNY: '중국 위안',
};

// 통화 종류 목록
export const currencyTypeList: Array<{text: string, value: string}> = [
  { text: "USD(미국/$)", value: "USD" },
  { text: "JPY(일본/¥)", value: "JPY" },
  { text: "EUR(유로/€)", value: "EUR" },
  { text: "CNY(중국/¥)", value: "CNY" },
];

// --------------------------------------------------
// 환율 예측 types 선언
export interface ExchangeRateInfo2 {
  currencyCode: string;
  exchangeRate: number;
  lastUpdated: string;
}

export interface RecentRates {
  "1_week": { [date: string]: number };
  "1_month": { [date: string]: number };
  "3_months": { [date: string]: number };
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
}

export interface CurrencyPrediction {
  forecast: { [date: string]: number };
  average_forecast: number;
  confidence_interval: ConfidenceInterval;
  daily_changes: { [date: string]: number };
  recent_rates: RecentRates;
}

export interface ExchangeRateInfo {
  currencyCode: string;
  exchangeRate: number;
  lastUpdated: string;
}

export interface PredictionResponse {
  USD: CurrencyPrediction;
  JPY: CurrencyPrediction;
  EUR: { recent_rates: RecentRates };
  CNY: { recent_rates: RecentRates };
  last_updated: string;
}

export interface TargetRate {
  accountNo: string;
  currencyCode: string;
  transactionBalance: number;
  targetRate: number;
}