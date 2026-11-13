import { Phone } from "lucide-react";

import { HOTLINE, ZALO_URL } from "./data";
import { useLead } from "./lead";

export function FloatingContact() {
  const { open } = useLead();
  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 md:flex">
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat Zalo"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-zalo text-sm font-bold text-zalo-foreground shadow-elegant transition-transform hover:scale-105"
        >
          Zalo
        </a>
        <a
          href={`tel:${HOTLINE}`}
          aria-label="Gọi hotline"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-call text-call-foreground shadow-elegant transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-call" aria-hidden />
          <Phone className="relative h-6 w-6" />
        </a>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold/30 bg-ink text-ivory md:hidden">
        <a href={`tel:${HOTLINE}`} className="flex flex-col items-center gap-1 py-2.5 text-[11px]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-call text-call-foreground">
            <Phone className="h-4 w-4" />
          </span>
          Gọi ngay
        </a>
        <button
          type="button"
          onClick={() => open(undefined, "mobile-bar")}
          className="bg-gold-gradient flex flex-col items-center justify-center text-[11px] font-semibold uppercase tracking-wider text-primary-foreground"
        >
          Nhận bảng giá
        </button>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zalo text-[9px] font-bold text-zalo-foreground">
            Zalo
          </span>
          Chat Zalo
        </a>
      </div>
    </>
  );
}
