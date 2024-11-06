import GoogleProvider from "next-auth/providers/google";

const authOptions: any = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    pages: {
      signIn: "/", // Redirects to a custom login page if you have one
    },
    secret: process.env.NEXTAUTH_SECRET,
  };

  export {authOptions};