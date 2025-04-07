export default async function handler(req, res) {
  const { budget, goal } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Kamu adalah asisten belanja pintar. Berikan saran resep dan daftar bahan makanan berdasarkan anggaran dan kebutuhan pengguna.',
        },
        {
          role: 'user',
          content: `Saya punya uang Rp${budget} dan ingin makanan yang ${goal}.`,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  res.status(200).json({ message: data.choices[0].message.content });
}
