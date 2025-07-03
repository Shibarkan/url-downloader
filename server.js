// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/preview', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.code !== 0) {
      return res.status(400).json({ error: data.msg || 'Failed to fetch data' });
    }

    return res.json({
      title: data.data.title,
      thumbnail: data.data.cover,
      play: data.data.play,
      music: data.data.music,
      author: data.data.author.nickname,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});
