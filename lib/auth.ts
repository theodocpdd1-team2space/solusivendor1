import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").trim().toLowerCase();
        const password = String(credentials?.password || "");

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            businessName: true,
            email: true,
            passwordHash: true,
            role: true,
            status: true,
          },
        });

        if (!user || user.status !== "ACTIVE") return null;

        const passwordIsValid = await compare(password, user.passwordHash);

        if (!passwordIsValid) return null;

        return {
          id: user.id,
          name: user.name || user.businessName || user.email,
          email: user.email,
          role: user.role,
          status: user.status,
          businessName: user.businessName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.businessName = user.businessName;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || "");
        session.user.role = token.role === "ADMIN" ? "ADMIN" : "USER";
        session.user.status =
          token.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE";
        session.user.businessName =
          typeof token.businessName === "string" ? token.businessName : null;
      }

      return session;
    },
  },
};
