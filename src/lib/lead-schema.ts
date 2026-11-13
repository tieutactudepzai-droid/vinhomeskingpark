import { z } from "zod";

export const PRODUCT_TYPES = [
  "Shophouse – Liền kề",
  "Biệt thự song lập",
  "Biệt thự đơn lập",
  "Chung cư cao tầng",
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Vui lòng nhập họ tên" })
    .max(100, { message: "Họ tên tối đa 100 ký tự" }),
  phone: z
    .string()
    .transform((v) => v.replace(/[\s.\-()]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^(0|\+84)(3|5|7|8|9)\d{8}$/, { message: "Số điện thoại chưa đúng định dạng" }),
    ),
  productType: z.enum(PRODUCT_TYPES, { message: "Vui lòng chọn loại hình" }),
  note: z.string().trim().max(500, { message: "Ghi chú tối đa 500 ký tự" }).optional(),
  source: z.string().trim().max(60).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
