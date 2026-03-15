import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

export const metadata: Metadata = {
  title: "일간남친",
  description: "START를 눌러 오늘의 남자친구를 만나보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  return (
    <html lang="ko">
      <body>
        {children}
        {kakaoKey ? (
          <>
            <Script id="kakao-javascript-sdk" src={KAKAO_SDK_SRC} strategy="afterInteractive" />
            <Script
              id="kakao-javascript-sdk-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  if (window.Kakao && !window.Kakao.isInitialized()) {
                    window.Kakao.init(${JSON.stringify(kakaoKey)});
                  }
                `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
