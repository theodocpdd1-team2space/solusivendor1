import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
const name = process.env.ADMIN_NAME?.trim() || "SolusiVendor Admin";

if (!email || !password) {
  console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  process.exit(1);
}

if (password.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const passwordHash = await hash(password, 12);

const admin = await prisma.user.upsert({
  where: { email },
  update: {
    name,
    businessName: name,
    passwordHash,
    role: "ADMIN",
    status: "ACTIVE",
  },
  create: {
    name,
    businessName: name,
    email,
    passwordHash,
    role: "ADMIN",
    status: "ACTIVE",
  },
  select: {
    id: true,
    email: true,
    name: true,
    role: true,
    status: true,
  },
});

console.log(`Admin ready: ${admin.email} (${admin.role}, ${admin.status})`);

await prisma.$disconnect();
