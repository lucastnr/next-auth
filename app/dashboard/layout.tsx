import { ReactNode } from "react";
import { Header } from "./Header";
import { createClient } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
