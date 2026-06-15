"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase text-white/70 transition hover:bg-white hover:text-black"
    >
      Logout
    </button>
  );
}
