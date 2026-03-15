export type Idol = {
  id: string;
  name: string;
  group: string | null;
  image: string;
};

export type GamePhase = "home" | "rolling" | "result";
