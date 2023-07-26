import passport from "passport";
import { Strategy } from "passport-github2";
import { GithubUser } from "../types";

const CALLBACK_URL = "/auth/login/callback";

function setupPassportStrategy() {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: CALLBACK_URL,
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: GithubUser,
        done: Function
      ) {
        return done(null, profile);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    return done(null, user);
  });
  passport.deserializeUser(function (user: GithubUser, done) {
    return done(null, user);
  });
}

export { setupPassportStrategy };
