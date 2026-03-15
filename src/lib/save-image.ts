import { toPng } from "html-to-image";

export async function saveElementAsPng(
  element: HTMLElement,
  fileName: string,
): Promise<void> {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
