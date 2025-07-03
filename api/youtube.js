const API_KEY = 'AIzaSyD9cRG8XVcVlHtQEDjaXKng4EyrpxaJi2U';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const videoId = extractYouTubeVideoID(url);
  if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.items || result.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const video = result.items[0].snippet;
    return res.status(200).json({
      title: video.title,
      thumbnail: video.thumbnails.high.url,
      author: video.channelTitle,
      videoId,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
}

// ✅ Tambahkan dukungan URL Shorts
function extractYouTubeVideoID(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|live\/|shorts\/))([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
