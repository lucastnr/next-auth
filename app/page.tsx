import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase";
import { useState } from "react";
import { AuthForm } from "./components/AuthForm";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main>
      <div className="flex justify-center items-center w-screen h-screen">
        <AuthForm />
      </div>
    </main>
  );
}
