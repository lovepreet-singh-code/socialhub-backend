import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/api/auth/google/callback",

        },

        async (_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        googleId: profile.id,
                        authProvider: "GOOGLE",
                    });
                }

                done(null, user);
            } catch (err) {
                done(err as Error, false);
            }
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: "/api/auth/github/callback",
            scope: ["user:email"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                // 🔴 GitHub email kabhi-kabhi null hoti hai
                let email =
                    profile.emails?.find((e) => e.primary)?.value ||
                    profile.emails?.[0]?.value ||
                    undefined;

                let user = await User.findOne({
                    $or: [{ githubId: profile.id }, email ? { email } : {}],
                });

                if (!user) {
                    user = await User.create({
                        name: profile.username || profile.displayName,
                        email, // undefined allowed
                        githubId: profile.id,
                        authProvider: "GITHUB",
                    });
                }

                done(null, user);
            } catch (err) {
                done(err as Error, false);
            }
        }
    )
);


export default passport;
