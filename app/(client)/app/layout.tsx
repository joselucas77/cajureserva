import NavbarClient from "@/components/layout/ClientSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarClient />
      {children}
    </div>
  );
}
