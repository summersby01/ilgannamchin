import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Idol } from "@/types/idol";

type RollingScreenProps = {
  currentIdol: Idol;
  onStop: () => void;
};

export function RollingScreen({ currentIdol, onStop }: RollingScreenProps) {
  return (
    <section className="flex w-full flex-col items-center rounded-[32px] bg-white/76 px-5 py-5 text-center shadow-card backdrop-blur-sm">
      <div className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-white to-rose/40 p-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-white">
          <Image
            priority
            src={currentIdol.image}
            alt={`${currentIdol.name} 이미지`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 90vw, 420px"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
        </div>
      </div>
      <div className="mt-6 w-full">
        <Button aria-label="현재 아이돌로 결과 확정" onClick={onStop}>
          STOP
        </Button>
      </div>
      <p className="mt-5 text-base font-semibold leading-7 text-ink">
        STOP을 눌러
        <br />
        오늘의 남자친구를 결정하세요
      </p>
    </section>
  );
}
