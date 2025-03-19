
export function delay(delayMillisecond: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, delayMillisecond));
}

export function getRemToPx(rem: number = 1): number | null {
  if (typeof window === "undefined") return null;

  const rootFontSize = parseFloat(getComputedStyle(window.document.documentElement).fontSize);
  return rem * rootFontSize;
}
