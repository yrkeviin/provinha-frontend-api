import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Provinha Front End Departamentos e Funcionários",
    icons: {
    icon: "/icons/favicon.ico",
  },
    description: "Projeto pra mostrar tudo que eu sei sobre front end",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
