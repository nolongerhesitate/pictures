import { withAuth } from "next-auth/middleware"

export default withAuth({
  // custom pages
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ token, req: { nextUrl } }) {
      const isLoggedIn = !!token;
      const isOnAuths = nextUrl.pathname.startsWith('/signin');
      if (isOnAuths && isLoggedIn)
        return Response.redirect(new URL('/', nextUrl));
      return isLoggedIn;
    },
  },
  providers: [],
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

