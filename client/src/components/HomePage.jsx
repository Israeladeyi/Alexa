import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase";

function HomePage() {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchFirstName = async () => {
      if (!currentUser) return;

      const userDocRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName || "");
      }
    };

    fetchFirstName();
  }, [currentUser]);

  const handleStart = () => {
    alert("Starting...");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome{firstName ? `, ${firstName}` : ""}</h1>
      {currentUser && <p>Logged in as: {currentUser.email}</p>}

      <button
        onClick={handleStart}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          backgroundColor: "#3182CE",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          borderRadius: "5px"
        }}
      >
        Start
      </button>
    </div>
  );
}

export default HomePage;