export type Idol = {
  id: string;
  name: string;
  groupName: string | null;
  imageUrl: string;
};

export type GamePhase = "home" | "rolling" | "result";
