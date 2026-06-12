"use client";

import dynamic from "next/dynamic";

const AdminMapClient = dynamic(() => import("@/components/AdminMapClient"), { ssr: false });

export default function AdminMapPage() {
  return <AdminMapClient />;
}
