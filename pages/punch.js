
import { useState } from 'react';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nickname) return;
    setLoading(true);
    try {
      const res = await fetch('https://twocmgt-server.onrender.com/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });
      const data = await res.json();
      if (data?.redirect) {
        window.location.href = data.redirect;
      } else {
        alert('Chyba: ' + JSON.stringify(data));
      }
    } catch (err) {
      alert('Chyba spojení se serverem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Zadej svou přezdívku</h1>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ padding: 10, fontSize: 16, marginRight: 10 }}
      />
      <button onClick={handleSubmit} style={{ padding: 10, fontSize: 16 }}>
        {loading ? 'Načítání…' : 'Zaplatit'}
      </button>
    </div>
  );
}
