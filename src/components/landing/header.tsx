import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { HOTLINE, HOTLINE_DISPLAY, NAV } from "./data";
import { useLead } from "./lead";

export function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#top" className="flex flex-col leading-none">
      <span
        className={cn(
          "font-display text-2xl font-semibold tracking-wide",
          light ? "text-ivory" : "text-foreground",
        )}
      >
        King <span className="italic text-gold">Park</span>
      </span>
      <span className={cn("eyebrow mt-1 text-[9px]", light ? "text-ivory/60" : "text-muted-foreground")}>
        Vinhomes · Bắc Ninh
      </span>
    </a>
  );
}

export function SiteHeader() {
  const { open } = useLead();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/95 py-3 backdrop-blur" : "py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo light={!scrolled} />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm transition-colors hover:text-gold",
                scrolled ? "text-foreground" : "text-ivory/85",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${HOTLINE}`}
            className={cn(
              "hidden items-center gap-2 text-sm font-medium xl:flex",
              scrolled ? "text-foreground" : "text-ivory",
            )}
          >
            <Phone className="h-4 w-4 text-gold" /> {HOTLINE_DISPLAY}
          </a>
          <Button variant="gold" className="hidden h-10 px-5 sm:inline-flex" onClick={() => open(undefined, "header")}>
            Nhận bảng giá
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Mở menu"
                className={cn("p-2 lg:hidden", scrolled ? "text-foreground" : "text-ivory")}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-ink text-ivory">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-10 flex flex-col gap-6">
                <Logo light />
                {NAV.map((n) => (
                  <a key={n.href} href={n.href} className="font-display text-2xl hover:text-gold">
                    {n.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
