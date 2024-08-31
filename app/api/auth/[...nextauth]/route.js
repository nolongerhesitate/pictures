import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "@/app/lib/actions";
import bcrypt from "bcrypt";


export const authOptions = {
  // custom pages
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  providers: [
    Credentials.default({
      type: "credentials",
      name: "credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const user = await getUser(username);
        if (!user) return null;

        const same = await bcrypt.compare(password, user.password);
        if (same) return user;

        // throw new Error("Invalid Credentials");
        return null;
      }
    })
  ],
};

const handler = NextAuth.default(authOptions);

export { handler as GET, handler as POST };
