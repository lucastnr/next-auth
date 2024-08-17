"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "../actions/auth";
import { type User } from "@supabase/supabase-js";
import { useHydrateAtoms } from "jotai/utils";
import { userAtom } from "@/utils/stores";

export function Header({ user }: { user: User }) {
  useHydrateAtoms([[userAtom, user]]);
  return (
    <div className="flex justify-between items-center w-full border-b py-3 px-4">
      <p>
        Welcome back, <span className="font-bold">{user.email}</span>
      </p>
      <Button onClick={() => signOut()} variant="destructive">
        <LogOut size="14" strokeWidth={3} className="mr-2" /> Logout
      </Button>
    </div>
  );
}
