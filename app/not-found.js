"use client";

import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react"
import { WarningTwoIcon } from "@chakra-ui/icons"

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-dvh w-dvw gap-6">
      <h2><WarningTwoIcon boxSize={6} ml={2} mr={3}></WarningTwoIcon>Not Found</h2>
      <p>Could not finde requested resource</p>
      <Button colorScheme="blue" variant="outline" onClick={() => router.push("/")}>Return to Home</Button>
    </div>
  );
}
