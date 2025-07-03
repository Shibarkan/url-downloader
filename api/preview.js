// === ✅ FILE: api/preview.js ===
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.code !== 0) {
      return res.status(400).json({ error: data.msg || 'Failed to fetch data' });
    }

    return res.status(200).json({
      title: data.data.title,
      thumbnail: data.data.cover,
      play: data.data.play,
      music: data.data.music,
      author: data.data.author.nickname,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
