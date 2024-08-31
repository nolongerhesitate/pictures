import Image from "next/image";
import logoPic from "@/public/logo.jpg"

export default function Logo() {
  return (
    <div>
      <Image
        src={logoPic}
        width={400}
        height={200}
        alt="website logo"></Image>
    </div>
  );
}
