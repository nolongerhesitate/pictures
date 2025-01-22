
export function delay(delayMillisecond) {
  return new Promise(resolve => setTimeout(resolve, delayMillisecond));
}

export function getRemToPx(rem = 1) {
  if (typeof window === "undefined") return null;

  const rootFontSize = parseFloat(getComputedStyle(window.document.documentElement).fontSize);
  return rem * rootFontSize;
}
