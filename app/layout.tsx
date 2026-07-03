import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrbitAvanya Tech — Powering Intelligent Growth",
  description:
    "OrbitAvanya Tech is an ISO-certified, government-registered technology partner delivering AI platforms, cloud engineering, and digital transformation for Education, Government, Healthcare and Enterprise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
