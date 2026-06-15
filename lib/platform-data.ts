import type {
  HostingPackage,
  HostingService,
  Invoice,
  Order,
  TemplateProduct,
  User,
} from "@/lib/platform-types";

export const siteUrl = "https://solusivendor.com";

export function formatRupiah(value: number) {
  if (value === 0) return "Gratis";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const templateCategories = [
  "Wedding Vendor",
  "Sound System",
  "Live Streaming",
  "Event Organizer",
  "Photography",
  "Church / Community",
  "Corporate",
];

export const templates: TemplateProduct[] = [
  {
    id: "tpl-sound-pro",
    slug: "sound-system-pro",
    name: "Sound System Pro",
    category: "Sound System",
    description:
      "Template gelap premium untuk vendor sound system, lighting, stage, dan rental event.",
    price: 99000,
    demoUrl: "https://solusivendor.com/templates/sound-system-pro",
    features: [
      "Hero dengan CTA WhatsApp",
      "Pricelist paket sound",
      "Portfolio event",
      "FAQ teknis rental",
      "Section equipment unggulan",
    ],
    status: "active",
  },
  {
    id: "tpl-wedding-elegant",
    slug: "wedding-elegant",
    name: "Wedding Elegant",
    category: "Wedding Vendor",
    description:
      "Landing page halus dan rapi untuk wedding organizer, dekorasi, MUA, dan venue partner.",
    price: 149000,
    demoUrl: "https://solusivendor.com/templates/wedding-elegant",
    features: [
      "Gallery dekorasi",
      "Paket wedding",
      "Testimoni client",
      "Alur konsultasi",
      "CTA booking tanggal",
    ],
    status: "active",
  },
  {
    id: "tpl-live-stream",
    slug: "live-streaming-event",
    name: "Live Streaming Event",
    category: "Live Streaming",
    description:
      "Template untuk vendor live streaming multi-camera, Zoom, YouTube, TikTok, dan dokumentasi.",
    price: 99000,
    features: [
      "Showcase kamera dan crew",
      "Paket live streaming",
      "Workflow event",
      "Embed video portfolio",
      "CTA konsultasi teknis",
    ],
    status: "active",
  },
  {
    id: "tpl-eo-command",
    slug: "event-organizer-command",
    name: "Event Organizer Command",
    category: "Event Organizer",
    description:
      "Template corporate-vendor untuk EO yang butuh halaman layanan, portfolio, dan proposal cepat.",
    price: 199000,
    features: [
      "Service matrix",
      "Timeline produksi",
      "Client logo strip",
      "Case study event",
      "Lead form ringkas",
    ],
    status: "active",
  },
  {
    id: "tpl-photo-studio",
    slug: "photo-studio-clean",
    name: "Photo Studio Clean",
    category: "Photography",
    description:
      "Tampilan clean untuk dokumentasi wedding, event, graduation, produk, dan studio lokal.",
    price: 0,
    features: [
      "Grid portfolio",
      "Paket foto",
      "Profile fotografer",
      "Download brief client",
      "CTA booking",
    ],
    status: "active",
  },
  {
    id: "tpl-community-light",
    slug: "community-light",
    name: "Community Light",
    category: "Church / Community",
    description:
      "Template gratis untuk komunitas, gereja, pelayanan, dan event sosial yang butuh informasi rapi.",
    price: 0,
    features: [
      "Jadwal kegiatan",
      "Profil komunitas",
      "Gallery dokumentasi",
      "Kontak pengurus",
      "CTA pendaftaran",
    ],
    status: "active",
  },
];

export const hostingPackages: HostingPackage[] = [
  {
    id: "host-starter",
    slug: "starter-website-hosting",
    name: "Starter Website Hosting",
    description:
      "Untuk landing page vendor sederhana yang ingin online tanpa ribet teknis.",
    monthlyPrice: 49000,
    panelType: "managed",
    terminalAccess: false,
    features: [
      "SSL/HTTPS",
      "Bantuan koneksi domain",
      "Website hosting",
      "Basic maintenance",
      "Tanpa akses terminal",
    ],
  },
  {
    id: "host-business",
    slug: "business-cloud-hosting",
    name: "Business Cloud Hosting",
    description:
      "Untuk website dengan dashboard, CMS, database, dan kebutuhan update berkala.",
    monthlyPrice: 149000,
    panelType: "managed panel",
    terminalAccess: false,
    recommended: true,
    features: [
      "Resource lebih besar",
      "Database support",
      "Deployment support",
      "Monitoring",
      "Backup berkala",
      "Panel access",
    ],
  },
  {
    id: "host-enterprise",
    slug: "enterprise-dedicated",
    name: "Enterprise Dedicated",
    description:
      "Untuk client besar yang butuh opsi VM/server dedicated, custom panel, dan dukungan managed.",
    monthlyPrice: 499000,
    panelType: "custom",
    terminalAccess: true,
    features: [
      "Opsi VM/server dedicated",
      "Custom storage",
      "Custom panel",
      "SSH/terminal opsional",
      "CloudPanel / cPanel / Coolify opsional",
      "Managed support",
    ],
  },
];

export const demoUsers: User[] = [
  {
    id: "user-001",
    name: "Arista Production",
    email: "owner@aristaproduction.com",
    role: "user",
    status: "active",
    createdAt: "2026-05-18",
  },
  {
    id: "user-002",
    name: "Colorize Visual",
    email: "team@colorizevisual.com",
    role: "user",
    status: "active",
    createdAt: "2026-05-24",
  },
  {
    id: "admin-001",
    name: "SolusiVendor Admin",
    email: "admin@solusivendor.com",
    role: "admin",
    status: "active",
    createdAt: "2026-05-01",
  },
];

export const demoOrders: Order[] = [
  {
    id: "ORD-SV-1001",
    userId: "user-001",
    userName: "Arista Production",
    customerEmail: "owner@aristaproduction.com",
    productType: "hosting",
    productId: "host-business",
    productName: "Business Cloud Hosting",
    amount: 149000,
    status: "paid",
    createdAt: "2026-06-01",
  },
  {
    id: "ORD-SV-1002",
    userId: "user-002",
    userName: "Colorize Visual",
    customerEmail: "team@colorizevisual.com",
    productType: "template",
    productId: "tpl-live-stream",
    productName: "Live Streaming Event",
    amount: 99000,
    status: "pending",
    createdAt: "2026-06-08",
  },
  {
    id: "ORD-SV-1003",
    userName: "Grace Community",
    customerEmail: "hello@gracecommunity.id",
    productType: "template",
    productId: "tpl-community-light",
    productName: "Community Light",
    amount: 0,
    status: "active",
    createdAt: "2026-06-10",
  },
];

export const demoInvoices: Invoice[] = [
  {
    id: "INV-SV-1001",
    orderId: "ORD-SV-1001",
    amount: 149000,
    status: "paid",
    dueDate: "2026-06-01",
  },
  {
    id: "INV-SV-1002",
    orderId: "ORD-SV-1002",
    amount: 99000,
    status: "unpaid",
    dueDate: "2026-06-15",
  },
];

export const demoServices: HostingService[] = [
  {
    id: "SVC-SV-1001",
    userId: "user-001",
    packageId: "host-business",
    domain: "aristaproduction.com",
    status: "active",
    panelType: "cloudpanel",
    hasTerminalAccess: false,
    nextBillingDate: "2026-07-01",
  },
  {
    id: "SVC-SV-1002",
    userId: "user-002",
    packageId: "host-starter",
    domain: "colorizevisual.com",
    status: "provisioning",
    panelType: "managed",
    hasTerminalAccess: false,
    nextBillingDate: "2026-07-08",
  },
];

export function getTemplateBySlug(slug: string) {
  return templates.find((template) => template.slug === slug);
}

export function getTemplateById(id: string) {
  return templates.find((template) => template.id === id);
}

export function getHostingPackageById(id: string) {
  return hostingPackages.find((plan) => plan.id === id);
}
