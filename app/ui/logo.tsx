import Image from "next/image";
import logoPic from "@/public/logo.png"

export default function Logo({
  width = 400,
  height = 200
}: {
  width: number,
  height: number
}) {
  return (
    <Image
      src={logoPic}
      width={width}
      height={height}
      alt="website logo" />
  );
}
