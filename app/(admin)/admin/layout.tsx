import NavbarAdmin from "@/components/layout/AdminSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarAdmin />
      {children}
    </div>
  );
}
