import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./_lib/data-service";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [Google],
  callbacks: {
    async authorized({ auth, request }) {
      if (auth?.user) return true;
      else return false;
    },
    async signIn({ user, account, profile }) {
      try {
        const guestExists = await getGuest(user.email);
        if (!guestExists) {
          await createGuest({ fullName: user.name, email: user.email });
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
