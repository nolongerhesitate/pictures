
export function delay(delayMillisecond) {
  return new Promise(resolve => setTimeout(resolve, delayMillisecond));
}
