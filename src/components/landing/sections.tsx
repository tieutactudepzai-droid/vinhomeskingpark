import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";

import heroAerial from "@/assets/hero-aerial.jpg";
import riversidePark from "@/assets/riverside-park.jpg";
import resortPool from "@/assets/resort-pool.jpg";
import villaSemi from "@/assets/villa-semi.jpg";
import { Button } from "@/components/ui/button";

import {
  CONNECTIONS,
  HIGHLIGHTS,
  HOTLINE,
  HOTLINE_DISPLAY,
  INVEST_NUMBERS,
  INVEST_REASONS,
  MILESTONES,
  PRODUCTS,
  QUICK_FACTS,
  SPECS,
  STATS,
  ZALO_URL,
} from "./data";
import { EditableText } from "./edit";
import { Logo } from "./header";
import { LeadForm, useLead } from "./lead";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function SectionHead({
  idPrefix,
  eyebrow,
  title,
  lead,
  light,
  center,
}: {
  idPrefix: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <EditableText id={`${idPrefix}.eyebrow`} defaultValue={eyebrow} as="p" className="eyebrow text-gold" />
      <h2
        className={`mt-4 text-4xl font-medium leading-[1.05] md:text-6xl ${light ? "text-ivory" : "text-foreground"}`}
      >
        {title}
      </h2>
      {lead && (
        <EditableText
          id={`${idPrefix}.lead`}
          defaultValue={lead}
          as="p"
          multiline
          className={`mt-5 text-base leading-relaxed ${light ? "text-ivory/70" : "text-muted-foreground"}`}
        />
      )}
    </div>
  );
}

export function Hero() {
  const { open } = useLead();
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
      <img
        src={heroAerial}
        alt="Phối cảnh toàn khu Vinhomes King Park ven sông Cầu"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="bg-hero-fade absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-36 pt-32 lg:px-8 lg:pb-40">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-float-up">
            <EditableText
              id="hero.eyebrow"
              defaultValue="Vinhomes King Park · Bán đảo Hòa Long"
              as="p"
              className="eyebrow text-gold-soft"
            />
            <h1 className="mt-5 text-6xl font-medium leading-[0.92] md:text-8xl lg:text-[8.5rem]">
              <EditableText id="hero.title1" defaultValue="Đại đô thị" />
              <br />
              <EditableText id="hero.title2" defaultValue="ven sông" className="italic text-gold" />
            </h1>
            <EditableText
              id="hero.lead"
              defaultValue="Biểu tượng sống mới của Bắc Ninh — 268,8 ha sinh thái, nghỉ dưỡng và thể thao, ôm trọn hai mặt sông Cầu."
              as="p"
              multiline
              className="mt-6 max-w-lg text-lg text-ivory/80"
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Button variant="gold" size="xl" onClick={() => open(undefined, "hero")}>
                Nhận bảng giá đợt 1 <ArrowRight />
              </Button>
              <Button variant="ghostLight" size="xl" asChild>
                <a href="#tong-quan">Khám phá dự án</a>
              </Button>
            </div>
          </div>

          <div className="animate-float-up border border-ivory/15 bg-ink/55 p-7 backdrop-blur-md [animation-delay:200ms]">
            <EditableText id="hero.facts-title" defaultValue="Thông tin nhanh" as="p" className="eyebrow text-gold" />
            <dl className="mt-5 divide-y divide-ivory/10">
              {QUICK_FACTS.map((f, i) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-3 text-sm">
                  <EditableText id={`fact.${i}.label`} defaultValue={f.label} as="dt" className="text-ivory/55" />
                  <EditableText id={`fact.${i}.value`} defaultValue={f.value} as="dd" className="text-right font-medium" />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-ivory/10 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 lg:px-8">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-5 md:py-6 ${i > 0 ? "md:border-l md:border-ivory/10 md:pl-8" : ""}`}
            >
              <p className="font-display text-3xl text-gold md:text-4xl">
                <EditableText id={`stat.${i}.value`} defaultValue={s.value} />
                <EditableText id={`stat.${i}.unit`} defaultValue={s.unit} className="ml-1 text-lg text-gold-soft" />
              </p>
              <EditableText id={`stat.${i}.label`} defaultValue={s.label} as="p" className="mt-1 text-xs text-ivory/65" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Overview() {
  return (
    <section id="tong-quan" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHead
            idPrefix="overview"
            eyebrow="Tổng quan dự án"
            title={
              <>
                <EditableText id="overview.title1" defaultValue="Đô thị mới" />
                <br />
                <EditableText id="overview.title2" defaultValue="thành phố Bắc Ninh" className="italic text-gold" />
              </>
            }
            lead="Tọa lạc phía Tây Bắc thành phố Bắc Ninh, ôm trọn bán đảo sinh thái Hòa Long, Vinhomes King Park là đại đô thị quy mô 268,8 ha với tổng vốn đầu tư 41.000 tỷ đồng. Hơn 120 ha dành cho cây xanh, mặt nước, thể thao và công viên chủ đề."
          />
          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {SPECS.map((s, i) => (
              <div key={s.label} className="border-t border-border py-4">
                <EditableText id={`spec.${i}.label`} defaultValue={s.label} as="dt" className="eyebrow text-muted-foreground" />
                <EditableText id={`spec.${i}.value`} defaultValue={s.value} as="dd" className="mt-1.5 text-[15px] font-medium" />
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -right-4 -top-4 hidden h-full w-full border border-gold/50 lg:block" />
          <img
            src={villaSemi}
            alt="Biệt thự ven sông tại Vinhomes King Park"
            width={1024}
            height={1280}
            loading="lazy"
            className="relative aspect-[4/5] w-full object-cover shadow-elegant"
          />
          <div className="absolute -bottom-8 left-6 right-6 bg-ink p-6 text-ivory shadow-elegant md:left-auto md:right-10 md:w-80">
            <EditableText id="milestone.title" defaultValue="Tiến độ dự án" as="p" className="eyebrow text-gold" />
            <ol className="mt-4 space-y-3">
              {MILESTONES.map((m, i) => (
                <li key={m.what} className="flex items-baseline justify-between gap-4 text-sm">
                  <EditableText id={`milestone.${i}.what`} defaultValue={m.what} className="text-ivory/70" />
                  <EditableText id={`milestone.${i}.when`} defaultValue={m.when} className="font-display text-lg text-gold-soft" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="vi-tri" className="bg-ink-gradient scroll-mt-20 py-24 text-ivory md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <SectionHead
          light
          idPrefix="location"
          eyebrow="Vị trí · Kết nối"
          title={
            <>
              <EditableText id="location.title1" defaultValue="Tâm điểm phía Tây Bắc" />
              <br />
              <EditableText id="location.title2" defaultValue="thủ phủ Kinh Bắc" className="italic text-gold" />
            </>
          }
          lead="Tọa độ vàng tại bán đảo Hòa Long kết nối đa hướng — cư dân dễ dàng tiếp cận trung tâm hành chính, khu công nghiệp và các tỉnh thành lân cận."
        />
        <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
          {CONNECTIONS.map((c, i) => (
            <li key={c.place} className="group flex items-center justify-between py-5">
              <EditableText
                id={`conn.${i}.place`}
                defaultValue={c.place}
                className="text-lg text-ivory/85 transition-colors group-hover:text-ivory"
              />
              <span className="flex items-baseline gap-2">
                <EditableText id={`conn.${i}.minutes`} defaultValue={String(c.minutes)} className="font-display text-5xl text-gold" />
                <span className="text-xs uppercase tracking-widest text-ivory/50">phút</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Highlights() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          center
          idPrefix="highlights"
          eyebrow="Giá trị cốt lõi"
          title={
            <>
              <EditableText id="highlights.title1" defaultValue="Sáu lý do định hình" />{" "}
              <EditableText id="highlights.title2" defaultValue="King Park" className="italic text-gold" />
            </>
          }
        />
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <article key={h.title} className="group bg-background p-9 transition-colors hover:bg-card">
              <span className="font-display text-5xl italic text-gold/70 transition-colors group-hover:text-gold">
                {ROMAN[i]}.
              </span>
              <EditableText id={`hl.${i}.title`} defaultValue={h.title} as="h3" className="mt-6 text-2xl font-medium" />
              <EditableText
                id={`hl.${i}.body`}
                defaultValue={h.body}
                as="p"
                multiline
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  const { open } = useLead();
  return (
    <section id="san-pham" className="scroll-mt-20 bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            idPrefix="products"
            eyebrow="Kiến trúc · Sản phẩm"
            title={
              <>
                <EditableText id="products.title1" defaultValue="Neo‑Classic &" />{" "}
                <EditableText id="products.title2" defaultValue="Riverside" className="italic text-gold" />
              </>
            }
            lead="Bốn dòng sản phẩm cho an cư, nghỉ dưỡng và kinh doanh — quỹ căn độc quyền mở bán sớm đợt 1."
          />
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <article key={p.name} className="group flex flex-col bg-card shadow-elegant">
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <EditableText
                  id={`prod.${i}.status`}
                  defaultValue={p.status}
                  className="eyebrow absolute left-4 top-4 bg-ink/80 px-3 py-1.5 text-[10px] text-gold-soft backdrop-blur"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <EditableText id={`prod.${i}.name`} defaultValue={p.name} as="h3" className="text-2xl font-medium" />
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Diện tích</dt>
                    <EditableText id={`prod.${i}.area`} defaultValue={p.area} as="dd" className="font-medium" />
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Quy mô</dt>
                    <EditableText id={`prod.${i}.floors`} defaultValue={p.floors} as="dd" className="font-medium" />
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => open(p.type, "product-card")}
                  className="eyebrow mt-6 flex items-center justify-between border-t border-border pt-4 text-[11px] text-foreground transition-colors hover:text-gold"
                >
                  Xem giá chi tiết <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Amenities() {
  return (
    <section id="tien-ich" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          idPrefix="amenities"
          eyebrow="Tiện ích · Phong cách sống"
          title={
            <>
              <EditableText id="amenities.title1" defaultValue="Mọi tiện ích trong" />
              <br />
              <EditableText id="amenities.title2" defaultValue="cùng một không gian" className="italic text-gold" />
            </>
          }
          lead="Hệ sinh thái 2.000+ tiện ích quốc tế, nơi vận động, thư giãn và kết nối cộng đồng diễn ra liền mạch."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <figure className="group relative overflow-hidden lg:col-span-2 lg:row-span-2">
            <img
              src={riversidePark}
              alt="Công viên ven sông Cầu"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full min-h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="bg-hero-fade absolute inset-0 flex flex-col justify-end p-8 text-ivory">
              <EditableText id="amen.park.value" defaultValue="57 ha" as="p" className="font-display text-6xl text-gold" />
              <EditableText id="amen.park.title" defaultValue="Công viên & quảng trường ven sông" as="h3" className="mt-2 text-3xl" />
              <EditableText
                id="amen.park.body"
                defaultValue="Đường dạo bộ rợp bóng, đài vọng cảnh và bến thuyền ngắm hoàng hôn trải dài sát mép nước."
                as="p"
                multiline
                className="mt-2 max-w-md text-sm text-ivory/75"
              />
            </figcaption>
          </figure>
          <figure className="group relative overflow-hidden">
            <img
              src={resortPool}
              alt="Bể bơi bốn mùa chuẩn resort"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="bg-hero-fade absolute inset-0 flex flex-col justify-end p-6 text-ivory">
              <EditableText id="amen.pool.title" defaultValue="Bể bơi bốn mùa & Jacuzzi" as="h3" className="text-2xl" />
            </figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-ink p-6 text-ivory">
              <EditableText id="amen.sport.value" defaultValue="70ha" as="p" className="font-display text-5xl text-gold" />
              <EditableText
                id="amen.sport.body"
                defaultValue="Tổ hợp thể thao: tennis, pickleball, chạy bộ"
                as="p"
                multiline
                className="mt-2 text-sm text-ivory/70"
              />
            </div>
            <div className="bg-gold-gradient p-6 text-primary-foreground">
              <EditableText id="amen.vin.value" defaultValue="Vincom · Vinmec" as="p" className="font-display text-3xl" />
              <EditableText
                id="amen.vin.body"
                defaultValue="Thương mại, y tế & giáo dục chuẩn quốc tế"
                as="p"
                multiline
                className="mt-2 text-sm opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Investment() {
  return (
    <section id="dau-tu" className="scroll-mt-20 border-t border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          center
          idPrefix="invest"
          eyebrow="Giá trị đầu tư"
          title={
            <>
              <EditableText id="invest.title1" defaultValue="Tăng trưởng vượt trội tại" />
              <br />
              <EditableText id="invest.title2" defaultValue="thủ phủ công nghiệp" className="italic text-gold" />
            </>
          }
          lead="Đón đầu hạ tầng Vành đai 4 và đô thị hóa Kinh Bắc — thương hiệu Vinhomes bảo chứng thanh khoản và giá trị gia tăng."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {INVEST_NUMBERS.map((n, i) => (
            <div key={n.title} className="border-t-2 border-gold pt-6">
              <EditableText id={`inv.${i}.value`} defaultValue={n.value} as="p" className="font-display text-6xl text-foreground" />
              <EditableText id={`inv.${i}.title`} defaultValue={n.title} as="h3" className="eyebrow mt-4 text-[11px] text-gold" />
              <EditableText
                id={`inv.${i}.body`}
                defaultValue={n.body}
                as="p"
                multiline
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              />
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INVEST_REASONS.map((r, i) => (
            <div key={r.title} className="bg-secondary p-6">
              <EditableText id={`reason.${i}.title`} defaultValue={r.title} as="h4" className="font-display text-xl font-medium" />
              <EditableText
                id={`reason.${i}.body`}
                defaultValue={r.body}
                as="p"
                multiline
                className="mt-2 text-sm text-muted-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadSection() {
  return (
    <section id="bang-gia" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-ivory md:py-32">
      <img
        src={heroAerial}
        alt=""
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="bg-ink-gradient absolute inset-0 opacity-80" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <EditableText id="lead.eyebrow" defaultValue="Cập nhật bảng giá" as="p" className="eyebrow text-gold" />
          <h2 className="mt-4 text-5xl font-medium leading-[1.02] md:text-7xl">
            <EditableText id="lead.title1" defaultValue="Quỹ căn độc quyền" />
            <br />
            <EditableText id="lead.title2" defaultValue="mở bán sớm đợt 1" className="italic text-gold" />
          </h2>
          <EditableText
            id="lead.body"
            defaultValue="Để lại thông tin để nhận bảng giá, mặt bằng mới nhất và chính sách ưu đãi qua Zalo & email."
            as="p"
            multiline
            className="mt-6 max-w-md text-ivory/70"
          />
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <a href={`tel:${HOTLINE}`} className="flex items-center gap-3 hover:text-gold">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50">
                <Phone className="h-4 w-4 text-gold" />
              </span>
              <span>
                <span className="block text-ivory/50">Hotline</span>
                <span className="font-display text-2xl">{HOTLINE_DISPLAY}</span>
              </span>
            </a>
            <a href={ZALO_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zalo text-[10px] font-bold text-zalo-foreground">
                Zalo
              </span>
              <span>
                <span className="block text-ivory/50">Chat Zalo</span>
                <EditableText id="lead.zalo" defaultValue="Tư vấn 24/7" className="block font-display text-2xl" />
              </span>
            </a>
          </div>
        </div>
        <div className="border border-ivory/15 bg-ink/70 p-8 backdrop-blur-md md:p-10">
          <LeadForm source="section" tone="dark" />
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-ivory/70 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
        <div>
          <Logo light />
          <EditableText
            id="footer.about"
            defaultValue="Vinhomes — thương hiệu bất động sản thuộc Tập đoàn Vingroup, tiên phong kiến tạo đại đô thị thông minh, sinh thái chuẩn quốc tế."
            as="p"
            multiline
            className="mt-5 max-w-xs text-sm"
          />
        </div>
        <div className="text-sm">
          <p className="eyebrow text-gold">Liên hệ</p>
          <p className="mt-4">
            Hotline:{" "}
            <a href={`tel:${HOTLINE}`} className="text-ivory hover:text-gold">
              {HOTLINE_DISPLAY}
            </a>
          </p>
          <EditableText
            id="footer.address"
            defaultValue="Dự án: Phường Kinh Bắc, tỉnh Bắc Ninh"
            as="p"
            className="mt-2"
          />
        </div>
        <EditableText
          id="footer.disclaimer"
          defaultValue="Thông tin, hình ảnh mang tính chất tham khảo và có thể thay đổi theo chính sách của chủ đầu tư tại từng thời điểm."
          as="p"
          multiline
          className="text-xs leading-relaxed text-ivory/45"
        />
      </div>
    </footer>
  );
}
