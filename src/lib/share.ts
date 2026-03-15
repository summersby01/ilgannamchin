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
  imageUrl?: string;
};

type KakaoShareResult = "shared" | "missing_key" | "sdk_unavailable";

function getKakaoKey() {
  return process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
}

function buildTwitterShareUrl(payload: BaseSharePayload) {
  const params = new URLSearchParams({
    text: `${payload.text}`,
    url: payload.url,
  });

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function isMobileBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function openTwitterShare(payload: BaseSharePayload): "opened" | "redirected" {
  const shareUrl = buildTwitterShareUrl(payload);

  if (isMobileBrowser()) {
    window.location.href = shareUrl;
    return "redirected";
  }

  window.open(shareUrl, "_blank", "noopener,noreferrer,width=540,height=720");
  return "opened";
}

export async function shareWithSystem(payload: BaseSharePayload): Promise<"shared" | "copied"> {
  if (navigator.share) {
    await navigator.share(payload);
    return "shared";
  }

  await copyShareLink(payload);
  return "copied";
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

export async function shareViaKakao(payload: BaseSharePayload): Promise<KakaoShareResult> {
  const kakaoKey = getKakaoKey();

  if (!kakaoKey) {
    return "missing_key";
  }

  const kakao = window.Kakao;

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
      imageUrl: payload.imageUrl ?? `${payload.url}/youngk.jpg`,
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
