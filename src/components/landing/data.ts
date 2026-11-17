import shophouse from "@/assets/shophouse.jpg";
import villaSemi from "@/assets/villa-semi.jpg";
import villaDetached from "@/assets/villa-detached.jpg";
import apartment from "@/assets/apartment.jpg";
import type { ProductType } from "@/lib/lead-schema";

export const HOTLINE = "0978591194";
export const HOTLINE_DISPLAY = "0978 591 194";
export const ZALO_URL = `https://zalo.me/${HOTLINE}`;

export const NAV = [
  { href: "#tong-quan", label: "Tổng quan" },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#san-pham", label: "Sản phẩm" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#dau-tu", label: "Đầu tư" },
  { href: "#vay-von", label: "Tính lãi vay" },
];

export const QUICK_FACTS = [
  { label: "Chủ đầu tư", value: "Tập đoàn Vingroup" },
  { label: "Vị trí", value: "Phường Kinh Bắc, Bắc Ninh" },
  { label: "Quy mô", value: "268,8 ha · ~31.000 cư dân" },
  { label: "Bàn giao", value: "Năm 2032" },
  { label: "Sở hữu", value: "Lâu dài" },
];

export const STATS = [
  { value: "~268,8", unit: "ha", label: "Mật độ xây dựng chỉ 20%" },
  { value: "100+", unit: "", label: "Tiện ích chuẩn quốc tế" },
  { value: "70", unit: "ha+", label: "Quần thể thể thao" },
  { value: "10", unit: "phút", label: "Đến trung tâm TP Bắc Ninh" },
];

export const SPECS = [
  { label: "Tên dự án", value: "Vinhomes King Park" },
  { label: "Chủ đầu tư", value: "Vinhomes® – Tập đoàn Vingroup" },
  { label: "Kiến trúc sư", value: "EDSA, AECOM, WATG (Mỹ)" },
  { label: "Quy mô", value: "268,81 ha" },
  { label: "Loại hình", value: "Biệt thự, liền kề, shophouse, cao tầng" },
  { label: "Sở hữu", value: "Lâu dài (NVN) · 50 năm (NNN)" },
];

export const MILESTONES = [
  { when: "09 / 2026", what: "Khởi công" },
  { when: "....", what: "Bàn giao thấp tầng" },
  { when: "....", what: "Bàn giao chung cư" },
  { when: "....", what: "Hoàn thiện toàn khu" },
];

export const CONNECTIONS = [
  { place: "Trung tâm TP. Bắc Ninh (Thành cổ, Vincom Plaza)", minutes: 10 },
  { place: "Trung tâm Hành chính tỉnh Bắc Ninh", minutes: 20 },
  { place: "KCN Yên Phong · KCN Quế Võ", minutes: 20 },
  { place: "Cao tốc Hà Nội – Bắc Giang", minutes: 20 },
  { place: "KCN VSIP Bắc Ninh", minutes: 30 },
  { place: "Sân bay Nội Bài · Sân bay Gia Bình", minutes: 30 },
];

export const HIGHLIGHTS = [
  {
    title: "Vị thế độc bản ven sông Cầu",
    body: "Bán đảo sinh thái Hòa Long, hai mặt giáp sông Cầu — không gian thuần khiết cùng thế đất phong thủy hiếm có.",
  },
  {
    title: "Mật độ xây dựng 20%",
    body: "Gần 270 ha nhưng dành hơn 120 ha cho cây xanh, mặt nước, công viên chuyên đề và thể thao.",
  },
  {
    title: "Thấp tầng đồng bộ, sang trọng",
    body: "Hơn 4.200 căn biệt thự, liền kề và shophouse — tối ưu an cư, tầm nhìn và dòng tiền kinh doanh.",
  },
  {
    title: "Tiện ích all‑in‑one",
    body: "TTTM, trường liên cấp, phòng khám quốc tế và tổ hợp thể thao hiện đại chỉ trong vài bước chân.",
  },
  {
    title: "Cửa ngõ thủ phủ công nghiệp",
    body: "Khoảng 20 phút tới KCN Yên Phong, Quế Võ; 30 phút tới VSIP, sân bay Nội Bài và Gia Bình.",
  },
  {
    title: "Bảo chứng từ Vingroup",
    body: "Vận hành chuẩn 5 sao, an ninh đa lớp và tiềm năng tăng giá bền vững cho nhà đầu tư.",
  },
];

export const PRODUCTS: {
  type: ProductType;
  name: string;
  image: string;
  area: string;
  floors: string;
  status: string;
}[] = [
  {
    type: "Shophouse – Liền kề",
    name: "Shophouse liền kề",
    image: shophouse,
    area: "60 – 149,4 m²",
    floors: "5 tầng",
    status: "Độc quyền",
  },
  {
    type: "Biệt thự song lập",
    name: "Biệt thự song lập",
    image: villaSemi,
    area: "184 – 304 m²",
    floors: "4 tầng",
    status: "Độc quyền",
  },
  {
    type: "Biệt thự đơn lập",
    name: "Biệt thự đơn lập",
    image: villaDetached,
    area: "345,5 m²",
    floors: "4 tầng",
    status: "Độc quyền",
  },
  {
    type: "Chung cư cao tầng",
    name: "Chung cư cao tầng",
    image: apartment,
    area: "....",
    floors: "8 tòa",
    status: "Đang cập nhật",
  },
];

export const INVEST_NUMBERS = [
  {
    value: "268,8 ha",
    title: "Đại đô thị sinh thái Hòa Long",
    body: "Quy hoạch bài bản ven sông Cầu, nền tảng giá trị cho toàn khu Tây Bắc Bắc Ninh.",
  },
  {
    value: "20 phút",
    title: "Tới cao tốc & khu công nghiệp",
    body: "Cao tốc Hà Nội – Bắc Giang, KCN Yên Phong và Quế Võ trong khoảng 20 phút — hành lang giao thương thúc đẩy giá trị toàn khu.",
  },
  {
    value: "2028",
    title: "Bàn giao & khai thác sớm",
    body: "Trùng chu kỳ hoàn thiện hạ tầng khu vực — đón đầu dòng tiền cho thuê và kinh doanh.",
  },
];

export const INVEST_REASONS = [
  {
    title: "Đón đầu hạ tầng trọng điểm",
    body: "Vành đai 4, các cầu vượt sông Cầu và QL18, QL1A nâng cấp kết nối siêu tốc tới Hà Nội.",
  },
  {
    title: "Khan hiếm quỹ đất ven sông",
    body: "Quỹ đất bán đảo ôm trọn triền sông ngày càng cạn — biên độ tăng giá dài hạn vững chắc.",
  },
  {
    title: "Nhu cầu thuê chuyên gia lớn",
    body: "Kề các KCN Yên Phong, Quế Võ, VSIP — chuyên gia, kỹ sư cấp cao thuê ở ổn định.",
  },
  {
    title: "Thương hiệu số 1 Việt Nam",
    body: "Pháp lý minh bạch, tiện ích đồng bộ và cam kết tiến độ xây dựng chuẩn xác.",
  },
];
