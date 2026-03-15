import type { Idol } from "@/types/idol";

const MOCK_IDOLS: Idol[] = [
  {
    id: "chaeunwoo",
    name: "차은우",
    groupName: "ASTRO",
    imageUrl: "/mock-idols/chaeunwoo.svg",
  },
  {
    id: "mingyu",
    name: "민규",
    groupName: "SEVENTEEN",
    imageUrl: "/mock-idols/mingyu.svg",
  },
  {
    id: "yeonjun",
    name: "연준",
    groupName: "TOMORROW X TOGETHER",
    imageUrl: "/mock-idols/yeonjun.svg",
  },
];

export async function fetchMockIdols(): Promise<Idol[]> {
  return Promise.resolve(MOCK_IDOLS);
}
