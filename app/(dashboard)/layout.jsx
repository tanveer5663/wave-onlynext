import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/auth.action";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({ children }) {
  const isAuthenticated = !!(await getCurrentUser());

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {children}
    </>
  );
}
