import { User as CustomUser } from "@/app/lib/types";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: CustomUser;
    accessToken?: string;
  }

  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: CustomUser;
    accessToken?: string;
  }
}
