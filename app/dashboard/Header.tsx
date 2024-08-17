"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "../actions/auth";

export function Header() {
  return (
    <div className="flex items-center w-full border-b py-3 px-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Button
        onClick={() => signOut()}
        className="ml-auto"
        variant="destructive"
      >
        <LogOut size="14" strokeWidth={3} className="mr-2" /> Logout
      </Button>
    </div>
  );
}
