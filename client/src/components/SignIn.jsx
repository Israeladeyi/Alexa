import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await signin(email, password);
      console.log("Signed in user:", user);
      navigate("/homepage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginTop: "1rem", fontSize: "24px", fontWeight: "bold" }}>
          Sign in to your account
        </h2>
      </div>

      <form onSubmit={handleSignin} style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="password">Password</label>
            <a href="#" style={{ fontSize: "12px" }}>Forgot password?</a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Sign in
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "14px", color: "#555" }}>
        <Link to="/signup" style={{ color: "#4F46E5", fontWeight: "bold" }}>
          Create Account
        </Link>
      </p>
    </div>
  );
}

export default SignIn;