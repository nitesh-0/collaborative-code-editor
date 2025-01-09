import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userSchema";
import "dotenv/config";

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/google/callback",
    },async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });

        if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails ? profile.emails[0].value : "",
              googleId: profile.id,
            });
            await user.save();
        }
        
        return done(null, user);

      }catch (error) {
        
        console.error("Error in GoogleStrategy:", error);
        return done(error);
      
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user); // Store user object in session
});

passport.deserializeUser((user: any, done) => {
  done(null, user); // Retrieve user from session
});

export default passport;
