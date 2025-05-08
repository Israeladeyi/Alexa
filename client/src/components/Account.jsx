import React, { useEffect, useState } from "react";
import { updateProfile, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { auth, db } from "../firebase";

const Account = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      const userDocRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: currentUser.email || "",
        });
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { firstName, lastName, email } = formData;

      // 1. Update Firebase Auth
      if (currentUser.email !== email) {
        await updateEmail(currentUser, email);
      }

      // 2. Update Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        firstName,
        lastName,
      });

      // 3. Optionally update displayName
      await updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Account Information</h2>

      {!isEditing ? (
        <>
          <p><strong>Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "#3182CE",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              width: "100%",
            }}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              backgroundColor: "#3182CE",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              width: "100%",
            }}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </>
      )}

      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
};

export default Account;