"use client";

import "./globals.css";
import Menu from "../components/Menu";
import { usePathname } from "next/navigation";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  const hideMenuRoutes = ["/register", "/login", "/client/servicios", "/client/citas", "/client/Explorar",
    "/admin/dashboard", "/admin/service", "/admin/NuevoServicio", "/admin/EditService",
    "/admin/ListClient", "/admin/NewClient", "/admin/EditClient", "/admin/ListCitas",
    "/client/SelectService", "/client/date"
  ]

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body>
        {!hideMenuRoutes.includes(pathname) && <Menu />}

        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
