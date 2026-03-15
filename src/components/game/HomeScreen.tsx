import { Button } from "@/components/ui/Button";

type HomeScreenProps = {
  disabled?: boolean;
  onStart: () => void;
};

export function HomeScreen({ disabled = false, onStart }: HomeScreenProps) {
  return (
    <section className="flex w-full flex-col items-center rounded-[32px] bg-white/72 px-6 py-9 text-center shadow-card backdrop-blur-sm">
      <div className="inline-flex rounded-full bg-rose/70 px-4 py-1 text-sm font-semibold text-berry">
        Daily Meme Game
      </div>
      <h1 className="mt-5 font-display text-[2.5rem] font-black tracking-[-0.04em] text-ink">
        일간남친
      </h1>
      <p className="mt-6 text-lg font-semibold leading-8 text-ink">
        START를 눌러
        <br />
        오늘의 남자친구를 만나보세요
      </p>
      <div className="mt-8 w-full">
        <Button aria-label="게임 시작" disabled={disabled} onClick={onStart}>
          START
        </Button>
      </div>
    </section>
  );
}
