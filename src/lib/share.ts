declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

type BaseSharePayload = {
  title: string;
  text: string;
  url: string;
};

type KakaoShareResult = "shared" | "missing_key" | "sdk_unavailable";

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

function getKakaoKey() {
  return process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
}

function buildTwitterShareUrl(payload: BaseSharePayload) {
  const params = new URLSearchParams({
    text: `${payload.text}`,
    url: payload.url,
  });

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function openTwitterShare(payload: BaseSharePayload) {
  const shareUrl = buildTwitterShareUrl(payload);
  window.open(shareUrl, "_blank", "noopener,noreferrer,width=540,height=720");
}

export async function copyShareLink(payload: BaseSharePayload): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload.url);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = payload.url;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

async function loadKakaoSdk(): Promise<typeof window.Kakao | undefined> {
  if (window.Kakao) {
    return window.Kakao;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${KAKAO_SDK_URL}"]`,
  );

  if (existingScript) {
    return new Promise((resolve) => {
      existingScript.addEventListener("load", () => resolve(window.Kakao), { once: true });
      existingScript.addEventListener("error", () => resolve(undefined), { once: true });
    });
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = () => resolve(window.Kakao);
    script.onerror = () => resolve(undefined);
    document.head.appendChild(script);
  });
}

export async function shareViaKakao(payload: BaseSharePayload): Promise<KakaoShareResult> {
  const kakaoKey = getKakaoKey();

  if (!kakaoKey) {
    return "missing_key";
  }

  const kakao = await loadKakaoSdk();

  if (!kakao) {
    return "sdk_unavailable";
  }

  if (!kakao.isInitialized()) {
    kakao.init(kakaoKey);
  }

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: payload.title,
      description: payload.text,
      imageUrl: `${payload.url}/idols/cha-eunwoo.svg`,
      link: {
        mobileWebUrl: payload.url,
        webUrl: payload.url,
      },
    },
    buttons: [
      {
        title: "결과 보기",
        link: {
          mobileWebUrl: payload.url,
          webUrl: payload.url,
        },
      },
    ],
  });

  return "shared";
}
