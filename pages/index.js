
import { useState } from 'react';

export default function Home() {
  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    if (!nickname) return;

    const params = new URLSearchParams({
      merchant: "495742",
      secret: "kpdj7DaJ7v6SHSsazlFc0g2NHzL4T4WZ",
      price: "10000",
      label: nickname,
      curr: "CZK",
      method: "ALL",
      redirect: "https://hamocreator.github.io/THANK_YOU/",
      prepareOnly: "false"
    });

    const comgateUrl = `https://payments.comgate.cz/v1.0/create?${params.toString()}`;
    window.location.href = comgateUrl;
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Zadej svou přezdívku</h1>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="např. Pepa123"
        style={{ padding: 10, fontSize: 18, width: '100%', marginBottom: 20 }}
      />
      <button
        onClick={handleSubmit}
        style={{ padding: 10, fontSize: 18, backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
      >
        Zaplatit
      </button>
    </div>
  );
}
