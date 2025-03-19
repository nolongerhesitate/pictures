"use client";

import { useColorModeValue } from "@chakra-ui/react";

export default function useStylesColorMode(light, dark) {
  if (light && dark) return useColorModeValue(light, dark);

  const fontColor = useColorModeValue("gray.700", "white");
  const _hoverBgColor = useColorModeValue("#edf2f7", "#f7fafc");
  const bgColor = useColorModeValue("#feebc8", "#4a4a4a");
  const pictureBorderColor = useColorModeValue("#ccc", "#4a4a4a");

  return ({
    fontColor,
    _hoverBgColor,
    bgColor,
    pictureBorderColor,
  });
};


