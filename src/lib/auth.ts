import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import PrismaClient from "./prisma";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(PrismaClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],

 callbacks: {
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
      };
      return session;
    }
  }
};
