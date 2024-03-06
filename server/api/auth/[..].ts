import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
    pages: { signIn: '/login' },
    secret: useRuntimeConfig().AUTH_SECRET,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
            },
            async authorize(credentials: {
                username: string,
                password: string
            },) {
                // todo
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token = {
                    ...token,
                    ...user
                }
            }

            return token;
        }
    },
    async session({ session, token }) {
        session.user = {
            ...token,
            ...session.user
        }

        return session;
    }
});