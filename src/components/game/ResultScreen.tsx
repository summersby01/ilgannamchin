import { forwardRef } from "react";
import { Button } from "@/components/ui/Button";
import { ResultCard } from "@/components/game/ResultCard";
import { ShareActions } from "@/components/game/ShareActions";
import type { Idol } from "@/types/idol";

type ResultScreenProps = {
  idol: Idol;
  feedback: string | null;
  isSaving: boolean;
  onSave: () => void;
  onTwitterShare: () => void;
  onKakaoShare: () => void;
  onCopyLink: () => void;
  isShareBusy: boolean;
  onRestart: () => void;
};

export const ResultScreen = forwardRef<HTMLDivElement, ResultScreenProps>(
  function ResultScreen(
    {
      idol,
      feedback,
      isSaving,
      onSave,
      onTwitterShare,
      onKakaoShare,
      onCopyLink,
      isShareBusy,
      onRestart,
    },
    ref,
  ) {
    return (
      <section className="flex w-full flex-col rounded-[32px] bg-white/76 px-5 py-5 shadow-card backdrop-blur-sm">
        <div className="mb-5 text-center">
          <h2 className="font-display text-[2rem] font-black tracking-[-0.04em] text-ink">
            오늘의 남자친구
          </h2>
        </div>
        <div ref={ref}>
          <ResultCard idol={idol} />
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <Button aria-label="결과 카드 저장" disabled={isSaving} onClick={onSave}>
            {isSaving ? "저장 중..." : "사진 저장"}
          </Button>
          <ShareActions
            isBusy={isShareBusy}
            onCopyLink={onCopyLink}
            onKakaoShare={onKakaoShare}
            onTwitterShare={onTwitterShare}
          />
          <Button aria-label="다시 시작" onClick={onRestart} tone="ghost">
            다시하기
          </Button>
        </div>
        {feedback ? (
          <p className="mt-4 text-center text-sm font-medium leading-6 text-berry">{feedback}</p>
        ) : null}
      </section>
    );
  },
);
