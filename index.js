
import { useState } from 'react';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nickname) return;
    setLoading(true);

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname })
      });

      const data = await response.json();

      if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        alert("Chyba: " + (data.error || "neznámá") + "\nDetail: " + JSON.stringify(data.detail));
        setLoading(false);
      }
    } catch (err) {
      alert("Chyba spojení se serverem.");
      setLoading(false);
    }
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
        disabled={loading}
        style={{ padding: 10, fontSize: 18, backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
      >
        {loading ? 'Načítání...' : 'Zaplatit'}
      </button>
    </div>
  );
}
