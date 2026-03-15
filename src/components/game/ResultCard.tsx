import Image from "next/image";
import type { Idol } from "@/types/idol";

type ResultCardProps = {
  idol: Idol;
};

export function ResultCard({ idol }: ResultCardProps) {
  return (
    <div className="overflow-hidden rounded-[30px] bg-white p-4 shadow-glow">
      <div className="rounded-[24px] bg-gradient-to-b from-[#fff4f7] to-[#ffe0ea] p-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-white">
          <Image
            src={idol.image}
            alt={`${idol.name} 결과 이미지`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 88vw, 400px"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#261520]/70 to-transparent px-4 pb-4 pt-16 text-left text-white">
            <div className="text-xs font-medium tracking-[0.24em] text-white/80">TODAY&apos;S PICK</div>
            <div className="mt-2 text-3xl font-black tracking-[-0.03em]">{idol.name}</div>
            {idol.group ? (
              <div className="mt-1 text-sm font-medium text-white/88">{idol.group}</div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-[24px] bg-cream px-5 py-6 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-berry/80">
          오늘의 남자친구
        </div>
        <div className="mt-3 text-[1.65rem] font-black tracking-[-0.04em] text-ink">
          {idol.name} 입니다 💘
        </div>
      </div>
    </div>
  );
}
