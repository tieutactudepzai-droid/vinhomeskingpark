import { describe, expect, it } from "vitest";

import { calculateLoan } from "./loan";

const base = { principal: 1_000_000_000, annualRatePct: 12, years: 1 };

describe("calculateLoan", () => {
  it("dư nợ giảm dần: gốc đều, tháng đầu = gốc + lãi trên toàn bộ khoản vay", () => {
    const res = calculateLoan({ ...base, method: "declining" });
    expect(res.months).toBe(12);
    // 1 tỷ / 12 + 1 tỷ × 1%
    expect(res.firstPayment).toBeCloseTo(83_333_333.33 + 10_000_000, 0);
    // Tổng lãi = P × r × (n + 1) / 2 = 65 triệu
    expect(res.totalInterest).toBeCloseTo(65_000_000, 0);
    expect(res.lastPayment).toBeLessThan(res.firstPayment);
  });

  it("trả đều: mỗi tháng trả cùng một số tiền", () => {
    const res = calculateLoan({ ...base, method: "annuity" });
    expect(res.firstPayment).toBeCloseTo(88_848_788.69, 0);
    expect(res.lastPayment).toBeCloseTo(res.firstPayment, 2);
    expect(res.totalPaid).toBeCloseTo(88_848_788.69 * 12, -1);
  });

  it("trả hết nợ vào cuối kỳ", () => {
    const res = calculateLoan({ principal: 5_600_000_000, annualRatePct: 9, years: 20, method: "annuity" });
    expect(res.schedule).toHaveLength(20);
    expect(res.schedule.at(-1)?.balance).toBeCloseTo(0, 0);
  });

  it("lãi suất 0% thì không phát sinh lãi", () => {
    const res = calculateLoan({ ...base, annualRatePct: 0, method: "annuity" });
    expect(res.totalInterest).toBe(0);
    expect(res.firstPayment).toBeCloseTo(1_000_000_000 / 12, 0);
  });
});
