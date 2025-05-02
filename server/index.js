import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Init Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(fs.readFileSync(process.env.SERVICE_ACCOUNT_KEY_PATH, "utf8"))
  ),
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI);

// Define a User schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: String,
  name: String,
});
const User = mongoose.model("User", userSchema);

const app = express();
app.use(cors(), express.json());

// server/index.js (continued)

app.post("/api/auth/login", async (req, res) => {
  const { idToken } = req.body;
  try {
    // 1. Verify with Firebase
    const decoded = await admin.auth().verifyIdToken(idToken);
    // decoded.uid, decoded.email, etc

    // 2. Upsert user into Mongo
    const user = await User.findOneAndUpdate(
      { uid: decoded.uid },
      { email: decoded.email, name: decoded.name || "" },
      { upsert: true, new: true }
    );

    // 3. Create your own JWT
    const jwtToken = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ jwt: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Firebase ID token" });
  }
});
// server/index.js (continued)

// JWT-verify middleware
function requireJwt(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s/, "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "Invalid JWT" });
  }
}

// Example protected route
app.get("/api/profile", requireJwt, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ uid: user.uid, email: user.email, name: user.name });
});

// Start server
app.listen(4000, () => {
  console.log("🔒 Auth server running on http://localhost:4000");
});
