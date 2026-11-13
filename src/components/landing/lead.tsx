import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PRODUCT_TYPES, leadSchema, type ProductType } from "@/lib/lead-schema";
import { submitPriceRequest } from "@/lib/price-requests.functions";
import { cn } from "@/lib/utils";

type LeadCtx = { open: (type?: ProductType, source?: string) => void };
const LeadContext = createContext<LeadCtx>({ open: () => {} });
export const useLead = () => useContext(LeadContext);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; type?: ProductType; source?: string }>({
    open: false,
  });
  const open = useCallback(
    (type?: ProductType, source?: string) => setState({ open: true, type, source }),
    [],
  );

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      <Dialog open={state.open} onOpenChange={(o) => setState((s) => ({ ...s, open: o }))}>
        <DialogContent className="max-w-md border-gold/40 bg-card p-0 sm:rounded-sm">
          <div className="bg-ink-gradient px-7 pb-6 pt-8 text-ivory">
            <p className="eyebrow text-gold">Quỹ căn độc quyền · Đợt 1</p>
            <DialogHeader className="mt-2 text-left">
              <DialogTitle className="font-display text-3xl font-medium text-ivory">
                Nhận bảng giá chi tiết
              </DialogTitle>
              <DialogDescription className="text-ivory/70">
                Chuyên viên sẽ gửi bảng giá & chính sách mới nhất qua Zalo trong ít phút.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="px-7 pb-7 pt-5">
            <LeadForm
              key={`${state.type ?? "none"}-${state.open}`}
              defaultType={state.type}
              source={state.source ?? "popup"}
            />
          </div>
        </DialogContent>
      </Dialog>
    </LeadContext.Provider>
  );
}

export function LeadForm({
  defaultType,
  source,
  tone = "light",
}: {
  defaultType?: ProductType;
  source: string;
  tone?: "light" | "dark";
}) {
  const submit = useServerFn(submitPriceRequest);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [productType, setProductType] = useState<ProductType | undefined>(defaultType);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = leadSchema.safeParse({ fullName, phone, productType, source });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await submit({ data: { fullName, phone, productType, source } });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" strokeWidth={1.25} />
        <p className={cn("mt-4 font-display text-2xl", dark ? "text-ivory" : "text-foreground")}>
          Cảm ơn anh/chị {fullName.trim().split(" ").slice(-1)[0]}!
        </p>
        <p className={cn("mt-2 text-sm", dark ? "text-ivory/70" : "text-muted-foreground")}>
          Chúng tôi đã nhận thông tin và sẽ liên hệ qua số {phone} sớm nhất.
        </p>
      </div>
    );
  }

  const fieldCls = cn(
    "h-12 w-full border-b bg-transparent px-0 text-[15px] outline-none transition-colors placeholder:text-current/40",
    dark
      ? "border-ivory/25 text-ivory placeholder:text-ivory/40 focus:border-gold"
      : "border-input text-foreground placeholder:text-muted-foreground focus:border-gold",
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <input
          className={fieldCls}
          placeholder="Họ và tên *"
          value={fullName}
          maxLength={100}
          autoComplete="name"
          onChange={(e) => setFullName(e.target.value)}
          aria-label="Họ và tên"
        />
        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
      </div>
      <div>
        <input
          className={fieldCls}
          placeholder="Số điện thoại / Zalo *"
          value={phone}
          inputMode="tel"
          maxLength={16}
          autoComplete="tel"
          onChange={(e) => setPhone(e.target.value)}
          aria-label="Số điện thoại"
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>
      <div>
        <p className={cn("eyebrow mb-3", dark ? "text-ivory/60" : "text-muted-foreground")}>
          Anh/chị quan tâm
        </p>
        <div className="grid grid-cols-2 gap-2">
          {PRODUCT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setProductType(t)}
              aria-pressed={productType === t}
              className={cn(
                "rounded-sm border px-3 py-2.5 text-left text-[13px] transition-all",
                productType === t
                  ? "border-gold bg-gold/15 text-gold-soft"
                  : dark
                    ? "border-ivory/20 text-ivory/80 hover:border-gold/60"
                    : "border-input text-foreground hover:border-gold",
                productType === t && !dark && "text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.productType && (
          <p className="mt-1 text-xs text-destructive">{errors.productType}</p>
        )}
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">
          Chưa gửi được, vui lòng thử lại hoặc gọi hotline.
        </p>
      )}
      <Button type="submit" variant="gold" size="xl" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? <Loader2 className="animate-spin" /> : null}
        Nhận bảng giá ngay
      </Button>
      <p className={cn("text-center text-[11px]", dark ? "text-ivory/50" : "text-muted-foreground")}>
        Thông tin của anh/chị được bảo mật tuyệt đối.
      </p>
    </form>
  );
}
