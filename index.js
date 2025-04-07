import React, { useState } from 'react';

export default function HomePage() {
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAIAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget, goal }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Gagal mengambil saran AI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>Smart Belanja</h1>
      <input
        placeholder='Contoh: 500000'
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <input
        placeholder='Contoh: makanan tinggi protein'
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleAIAdvice} disabled={loading}>
        {loading ? 'Memproses...' : 'Dapatkan Saran AI'}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Hasil dari AI:</h2>
          <pre>{result.message}</pre>
        </div>
      )}
    </main>
  );
}
