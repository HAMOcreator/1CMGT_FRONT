import { useState } from "react";

export default function Punch() {
  const [nickname, setNickname] = useState("");

  const handlePay = async () => {
    if (!nickname) return alert("Zadej přezdívku");

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname,
        price: 13000,
        label: "Punch Bowl 🍹"
      })
    });

    const data = await res.json();
    if (data.redirect) {
      window.location.href = data.redirect;
    } else {
      alert("Chyba: " + JSON.stringify(data.detail));
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1>🍹 Punch Bowl – 130 Kč</h1>
      <input
        type="text"
        placeholder="Tvoje přezdívka"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 20 }}
      />
      <button onClick={handlePay} style={{ padding: 10, fontSize: 18 }}>
        Zaplatit
      </button>
    </div>
  );
}