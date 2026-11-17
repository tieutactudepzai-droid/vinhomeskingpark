import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { calculateLoan, formatShortVnd, formatVnd, type LoanMethod } from "@/lib/loan";
import { cn } from "@/lib/utils";

import { EditableText } from "./edit";
import { useLead } from "./lead";

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  hint?: string;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-baseline gap-1.5 border-b border-gold/60 pb-0.5">
          <input
            type="number"
            inputMode="decimal"
            aria-label={label}
            value={Number.isFinite(value) ? value : ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Number(e.target.value.replace(",", "."));
              if (Number.isFinite(v)) onChange(v);
            }}
            onBlur={() => onChange(clamp(value))}
            className="w-20 bg-transparent text-right font-display text-2xl font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
      <Slider
        className="mt-4"
        value={[clamp(value)]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v ?? min)}
        aria-label={label}
      />
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const METHODS: { id: LoanMethod; label: string; note: string }[] = [
  { id: "declining", label: "Dư nợ giảm dần", note: "Gốc chia đều, lãi giảm dần theo dư nợ" },
  { id: "annuity", label: "Trả đều hàng tháng", note: "Gốc + lãi mỗi tháng bằng nhau" },
];

export function LoanCalculator() {
  const { open } = useLead();
  const [price, setPrice] = useState(8); // tỷ đồng
  const [ratio, setRatio] = useState(70); // % vay
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(9); // %/năm
  const [method, setMethod] = useState<LoanMethod>("declining");
  const [showSchedule, setShowSchedule] = useState(false);

  const principal = Math.max(0, price) * 1e9 * (Math.min(100, Math.max(0, ratio)) / 100);
  const ownCapital = Math.max(0, price) * 1e9 - principal;
  const result = useMemo(
    () => calculateLoan({ principal, annualRatePct: rate, years: Math.max(1, years), method }),
    [principal, rate, years, method],
  );

  return (
    <section id="vay-von" className="scroll-mt-20 bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <EditableText id="loan.eyebrow" defaultValue="Hỗ trợ tài chính" as="p" className="eyebrow text-gold" />
          <h2 className="mt-4 text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
            <EditableText id="loan.title1" defaultValue="Tính lãi vay" />{" "}
            <EditableText id="loan.title2" defaultValue="ngân hàng" className="italic text-gold" />
          </h2>
          <EditableText
            id="loan.lead"
            defaultValue="Ước tính số tiền trả góp mỗi tháng khi mua nhà tại Vinhomes King Park. Kéo thanh trượt hoặc gõ số để thay đổi."
            as="p"
            multiline
            className="mt-5 text-base leading-relaxed text-muted-foreground"
          />
        </div>

        <div className="mt-14 grid gap-0 overflow-hidden border border-border bg-card shadow-elegant md:grid-cols-2">
          <div className="min-w-0 space-y-9 p-7 lg:p-10">
            <Field label="Giá trị căn nhà" value={price} onChange={setPrice} min={1} max={60} step={0.1} unit="tỷ" />
            <Field
              label="Tỷ lệ vay"
              value={ratio}
              onChange={setRatio}
              min={0}
              max={80}
              step={5}
              unit="%"
              hint={`Số tiền vay: ${formatShortVnd(principal)} · Vốn tự có: ${formatShortVnd(ownCapital)}`}
            />
            <Field label="Thời hạn vay" value={years} onChange={setYears} min={1} max={35} step={1} unit="năm" />
            <Field label="Lãi suất" value={rate} onChange={setRate} min={0} max={20} step={0.1} unit="%/năm" />

            <div>
              <p className="text-sm font-medium text-foreground">Cách trả nợ</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    aria-pressed={method === m.id}
                    className={cn(
                      "rounded-sm border px-4 py-3 text-left transition-colors",
                      method === m.id
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/60",
                    )}
                  >
                    <span className="block text-sm font-semibold text-foreground">{m.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{m.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-ink-gradient flex min-w-0 flex-col p-7 text-ivory lg:p-10">
            <p className="eyebrow text-gold">
              {method === "declining" ? "Trả tháng đầu tiên" : "Trả mỗi tháng"}
            </p>
            <p className="mt-3 break-words font-display text-4xl font-medium leading-none lg:text-5xl xl:text-6xl" aria-live="polite">
              {formatVnd(result.firstPayment)}
            </p>
            {method === "declining" ? (
              <p className="mt-3 text-sm text-ivory/60">
                Giảm dần còn {formatVnd(result.lastPayment)} ở tháng cuối
              </p>
            ) : null}

            <dl className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10 text-sm">
              {[
                ["Số tiền vay", formatVnd(principal)],
                ["Vốn tự có cần chuẩn bị", formatVnd(ownCapital)],
                ["Tổng tiền lãi", formatVnd(result.totalInterest)],
                ["Tổng gốc + lãi phải trả", formatVnd(result.totalPaid)],
                ["Số kỳ trả", `${result.months} tháng`],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3.5">
                  <dt className="text-ivory/60">{k}</dt>
                  <dd className="font-medium tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            <Button
              variant="gold"
              size="lg"
              className="mt-8 w-full"
              onClick={() => open(undefined, "loan-calculator")}
            >
              Nhận tư vấn gói vay ưu đãi
            </Button>
            <EditableText
              id="loan.disclaimer"
              defaultValue="Kết quả chỉ mang tính tham khảo. Lãi suất thực tế tùy ngân hàng và chính sách hỗ trợ của chủ đầu tư tại thời điểm vay."
              as="p"
              multiline
              className="mt-4 text-xs leading-relaxed text-ivory/50"
            />
          </div>
        </div>

        <div className="mt-6 border border-border bg-card">
          <button
            type="button"
            onClick={() => setShowSchedule((s) => !s)}
            aria-expanded={showSchedule}
            className="flex w-full items-center justify-between px-7 py-4 text-sm font-medium text-foreground md:px-10"
          >
            Xem lịch trả nợ theo từng năm
            <ChevronDown className={cn("h-4 w-4 text-gold transition-transform", showSchedule && "rotate-180")} />
          </button>
          {showSchedule ? (
            <div className="max-h-96 overflow-auto border-t border-border">
              <table className="w-full text-sm tabular-nums">
                <thead className="sticky top-0 bg-card text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-7 py-3 font-medium md:px-10">Năm</th>
                    <th className="px-3 py-3 text-right font-medium">Gốc trả</th>
                    <th className="px-3 py-3 text-right font-medium">Lãi trả</th>
                    <th className="px-7 py-3 text-right font-medium md:px-10">Dư nợ cuối năm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {result.schedule.map((row) => (
                    <tr key={row.year}>
                      <td className="px-7 py-2.5 md:px-10">{row.year}</td>
                      <td className="px-3 py-2.5 text-right">{formatShortVnd(row.principal)}</td>
                      <td className="px-3 py-2.5 text-right">{formatShortVnd(row.interest)}</td>
                      <td className="px-7 py-2.5 text-right md:px-10">{formatShortVnd(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
