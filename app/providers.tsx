import StoreProvider from "@/app/lib/providers/store-provider";
import SessionProvider from "./lib/providers/session-provider";
import { DialogProvider } from "@/app/lib/contexts/dialogContext";
import ChakraProviderWrapper from "@/app/lib/providers/chakra-provider-wrapper";

import { getServerSession } from "next-auth/next";

export default async function Providers({ children }) {
  const session = await getServerSession();

  return (
    <ChakraProviderWrapper>
      <StoreProvider>
        <SessionProvider session={session}>
          <DialogProvider>
            {children}
          </DialogProvider>
        </SessionProvider>
      </StoreProvider>
    </ChakraProviderWrapper>
  );
}
