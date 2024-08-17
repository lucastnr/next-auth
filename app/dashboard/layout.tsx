import { ReactNode } from "react";
import { Header } from "./Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}