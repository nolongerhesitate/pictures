import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from '@/app/lib/actions';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
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
    jwt({ token, user, account }) {
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
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log("#authoption_credentials:", credentials);
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await getUser(credentials.username);
        console.log("#user:", user);
        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        return passwordsMatch ? user : null;
      },
    }),
  ],
};
