"use client";

import { useColorModeValue } from "@chakra-ui/react";

interface StylesColorMode {
  fontColor: string;
  _hoverBgColor: string;
  bgColor: string;
  pictureBorderColor: string;
}

export default function useStylesColorMode(light?: string, dark?: string): StylesColorMode {
  if (light && dark) {
    const value = useColorModeValue(light, dark);
    return {
      fontColor: value,
      _hoverBgColor: value,
      bgColor: value,
      pictureBorderColor: value
    };
  }

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
