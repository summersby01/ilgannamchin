"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorNotice } from "@/components/ui/ErrorNotice";
import { Button } from "@/components/ui/Button";
import { HomeScreen } from "@/components/game/HomeScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { RollingScreen } from "@/components/game/RollingScreen";
import { idols } from "@/lib/idols";
import { saveElementAsPng } from "@/lib/save-image";
import { openTwitterShare, shareViaKakao, shareWithSystem } from "@/lib/share";
import type { GamePhase } from "@/types/idol";

const ROLL_INTERVAL_MS = 110;

export function GameShell() {
  const [phase, setPhase] = useState<GamePhase>("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdolId, setSelectedIdolId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idols.length === 0) {
      return;
    }

    idols.forEach((idol) => {
      const image = new window.Image();
      image.src = idol.image;
    });
  }, []);

  useEffect(() => {
    return () => {
      stopRollingTimer();
    };
  }, []);

  function stopRollingTimer() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function handleStart() {
    if (idols.length === 0) {
      return;
    }

    stopRollingTimer();
    setFeedback(null);
    setSelectedIdolId(null);
    setPhase("rolling");

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % idols.length);
    }, ROLL_INTERVAL_MS);
  }

  function handleStop() {
    stopRollingTimer();
    const chosen = idols[currentIndex];
    setSelectedIdolId(chosen.id);
    setPhase("result");
    setFeedback(null);
  }

  async function handleSave() {
    if (!resultCardRef.current || !selectedIdol) {
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      await saveElementAsPng(resultCardRef.current, `daily-boyfriend-${selectedIdol.id}.png`);
      setFeedback("결과 카드가 PNG로 저장됐어요.");
    } catch {
      setFeedback("이미지 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  function getSharePayload() {
    if (!selectedIdol) {
      return null;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");

    return {
      title: "일간남친",
      text: `내 오늘의 남자친구 결과 나옴\n${selectedIdol.name}이 나왔어\n너도 해봐`,
      url: baseUrl,
      imageUrl: `${baseUrl}${selectedIdol.image}`,
    };
  }

  async function handleTwitterShare() {
    if (!selectedIdol) {
      return;
    }

    setIsSharing(true);
    setFeedback(null);

    try {
      const sharePayload = getSharePayload();

      if (!sharePayload) {
        return;
      }

      openTwitterShare(sharePayload);
      setFeedback("트위터 공유 창을 열었어요.");
    } catch {
      setFeedback("공유에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSharing(false);
    }
  }

  async function handleKakaoShare() {
    if (!selectedIdol) {
      return;
    }

    setIsSharing(true);
    setFeedback(null);

    try {
      const sharePayload = getSharePayload();

      if (!sharePayload) {
        return;
      }

      const result = await shareViaKakao(sharePayload);

      if (result === "missing_key") {
        setFeedback("카카오 공유를 사용하려면 Kakao JavaScript SDK 키를 설정해야 합니다.");
        return;
      }

      if (result === "sdk_unavailable") {
        setFeedback("카카오 SDK를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      setFeedback("카카오톡 공유 창을 열었어요.");
    } catch {
      setFeedback("카카오톡 공유에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSharing(false);
    }
  }

  async function handleCopyLink() {
    if (!selectedIdol) {
      return;
    }

    setIsSharing(true);
    setFeedback(null);

    try {
      const sharePayload = getSharePayload();

      if (!sharePayload) {
        return;
      }

      const result = await shareWithSystem(sharePayload);
      setFeedback(result === "shared" ? "공유 창을 열었어요." : "공유가 지원되지 않아 링크를 복사했어요.");
    } catch {
      setFeedback("공유에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSharing(false);
    }
  }

  function handleRestart() {
    stopRollingTimer();
    setPhase("home");
    setSelectedIdolId(null);
    setCurrentIndex(0);
    setFeedback(null);
  }

  if (idols.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-[430px]">
          <ErrorNotice
            message="표시할 아이돌 데이터가 없습니다."
            action={
              <Button
                aria-label="다시 시도"
                fullWidth={false}
                onClick={() => window.location.reload()}
              >
                다시 시도
              </Button>
            }
          />
        </div>
      </main>
    );
  }

  const currentIdol = idols[currentIndex % idols.length];
  const selectedIdol = selectedIdolId
    ? idols.find((idol) => idol.id === selectedIdolId) ?? null
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-[430px]">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-full bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-berry shadow-sm ring-1 ring-white/60">
            Mobile First MVP
          </div>
        </div>

        {phase === "home" ? <HomeScreen disabled={idols.length === 0} onStart={handleStart} /> : null}
        {phase === "rolling" && currentIdol ? (
          <RollingScreen currentIdol={currentIdol} onStop={handleStop} />
        ) : null}
        {phase === "result" && selectedIdol ? (
          <ResultScreen
            ref={resultCardRef}
            feedback={feedback}
            idol={selectedIdol}
            isSaving={isSaving}
            isShareBusy={isSharing}
            onRestart={handleRestart}
            onSave={handleSave}
            onTwitterShare={handleTwitterShare}
            onKakaoShare={handleKakaoShare}
            onCopyLink={handleCopyLink}
          />
        ) : null}
      </div>
    </main>
  );
}
