import type { Metadata } from "next";
import { KakaoSdkScript } from "@/components/KakaoSdkScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "일간남친",
  description: "START를 눌러 오늘의 남자친구를 만나보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <KakaoSdkScript />
      </body>
    </html>
  );
}
