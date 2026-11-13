import { createFileRoute } from "@tanstack/react-router";

import { EditProvider } from "@/components/landing/edit";
import { FloatingContact } from "@/components/landing/floating-contact";
import { SiteHeader } from "@/components/landing/header";
import { LeadProvider } from "@/components/landing/lead";
import {
  Amenities,
  Hero,
  Highlights,
  Investment,
  LeadSection,
  Location,
  Overview,
  Products,
  SiteFooter,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vinhomes King Park Bắc Ninh – Đại đô thị ven sông Cầu" },
      {
        name: "description",
        content:
          "Vinhomes King Park 268,8 ha ven sông Cầu, Bắc Ninh: shophouse, biệt thự, chung cư. Nhận bảng giá quỹ căn độc quyền đợt 1.",
      },
      { property: "og:title", content: "Vinhomes King Park Bắc Ninh – Đại đô thị ven sông Cầu" },
      {
        property: "og:description",
        content: "Đại đô thị sinh thái 268,8 ha ven sông Cầu. Nhận bảng giá quỹ căn độc quyền đợt 1.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <EditProvider>
      <LeadProvider>
        <SiteHeader />
        <main>
          <Hero />
          <Overview />
          <Location />
          <Highlights />
          <Products />
          <Amenities />
          <Investment />
          <LeadSection />
        </main>
        <SiteFooter />
        <FloatingContact />
      </LeadProvider>
    </EditProvider>
  );
}
