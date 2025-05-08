import React from "react";

function Pricing() {
  const plans = [
    { name: "Basic", price: "$9/month", features: ["1 Assistant", "Basic Commands", "Email Support"] },
    { name: "Pro", price: "$29/month", features: ["3 Assistants", "Advanced Commands", "Priority Support"] },
    { name: "Enterprise", price: "$99/month", features: ["Unlimited Assistants", "Custom Commands", "Dedicated Support"] },
  ];

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Choose a Plan</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
        {plans.map((plan, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px", borderRadius: "8px" }}>
            <h3>{plan.name}</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{plan.price}</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#3182CE", color: "white", border: "none", borderRadius: "4px" }}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;