export type LoanMethod = "declining" | "annuity";

export type LoanInput = {
  /** Số tiền vay (VND) */
  principal: number;
  /** Lãi suất %/năm, ví dụ 9 = 9%/năm */
  annualRatePct: number;
  /** Thời hạn vay (năm) */
  years: number;
  method: LoanMethod;
};

export type LoanYearRow = { year: number; principal: number; interest: number; balance: number };

export type LoanResult = {
  months: number;
  firstPayment: number;
  lastPayment: number;
  totalInterest: number;
  totalPaid: number;
  schedule: LoanYearRow[];
};

/**
 * Tính lịch trả nợ theo tháng.
 * - "declining" (dư nợ giảm dần): gốc chia đều mỗi tháng, lãi tính trên dư nợ còn lại.
 * - "annuity" (trả đều): tổng gốc + lãi mỗi tháng bằng nhau.
 */
export function calculateLoan({ principal, annualRatePct, years, method }: LoanInput): LoanResult {
  const months = Math.max(1, Math.round(years * 12));
  const r = Math.max(0, annualRatePct) / 100 / 12;
  const P = Math.max(0, principal);

  const annuityPayment = r === 0 ? P / months : (P * r) / (1 - Math.pow(1 + r, -months));

  let balance = P;
  let totalInterest = 0;
  let firstPayment = 0;
  let lastPayment = 0;
  const schedule: LoanYearRow[] = [];
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPart = method === "declining" ? P / months : annuityPayment - interest;
    const payment = principalPart + interest;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interest;
    yearPrincipal += principalPart;
    yearInterest += interest;
    if (m === 1) firstPayment = payment;
    if (m === months) lastPayment = payment;
    if (m % 12 === 0 || m === months) {
      schedule.push({
        year: Math.ceil(m / 12),
        principal: yearPrincipal,
        interest: yearInterest,
        balance,
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return { months, firstPayment, lastPayment, totalInterest, totalPaid: P + totalInterest, schedule };
}

export function formatVnd(value: number): string {
  return `${Math.round(value).toLocaleString("vi-VN")} đ`;
}

/** Rút gọn số tiền lớn: 1,25 tỷ · 41,7 triệu */
export function formatShortVnd(value: number): string {
  const fmt = (n: number, d: number) =>
    n.toLocaleString("vi-VN", { maximumFractionDigits: d, minimumFractionDigits: 0 });
  if (value >= 1e9) return `${fmt(value / 1e9, 2)} tỷ`;
  if (value >= 1e6) return `${fmt(value / 1e6, 1)} triệu`;
  return formatVnd(value);
}
