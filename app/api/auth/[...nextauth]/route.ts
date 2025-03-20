import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { getUser } from "@/app/lib/actions";
import bcrypt from "bcrypt";

const handler = NextAuth({
  // custom pages
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt({ token, user, account }){
      // This if branch must have
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user;

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      type: "credentials",
      name: "credentials",
      async authorize(credentials) {
        const { username, password } = credentials;
        const error = new Error("E-mail address or password is incorrect.");

        const { password: hashedPassword, ...user } = await getUser(username);
        if (!user) throw error;

        const same = await bcrypt.compare(password, hashedPassword);
        if (same) return { id: user.id, ...user, password };

        throw error;
      }
    })
  ],
});

export { handler as GET, handler as POST };
