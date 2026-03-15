"use client";

import Script from "next/script";

const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

export function KakaoSdkScript() {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  if (!kakaoKey) {
    return null;
  }

  return (
    <Script
      id="kakao-javascript-sdk"
      src={KAKAO_SDK_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        const kakao = window.Kakao;

        if (!kakao || kakao.isInitialized()) {
          return;
        }

        // Kakao developers console must include localhost and production domains.
        kakao.init(kakaoKey);
      }}
    />
  );
}
