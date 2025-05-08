import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await signup(trimmedEmail, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${trimmedFirstName} ${trimmedLastName}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully!");
      navigate("/homepage");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginTop: "1rem", fontSize: "24px", fontWeight: "bold" }}>
          Sign up for an account
        </h2>
      </div>

      <form onSubmit={handleSignup} style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="Fname">First Name</label>
          <input
            id="Fname"
            name="Fname"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="Lname">Last Name</label>
          <input
            id="Lname"
            name="Lname"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "14px", color: "#555" }}>
        Already have an account?{" "}
        <Link to="/signin" style={{ color: "#4F46E5", fontWeight: "bold" }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;