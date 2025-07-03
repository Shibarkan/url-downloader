import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setData(null);

    try {
      const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
      const endpoint = isYouTube ? "/api/youtube" : "/api/preview";

      const res = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`);
      const result = await res.json();

      if (result.error) throw new Error(result.error);
      setData(result);
    } catch (err) {
      alert("Gagal ambil data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 URL Downloader</h1>

      <input
        className="w-full max-w-md p-3 border rounded shadow mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Masukkan URL TikTok atau YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleFetch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition-all disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Memuat...' : 'Ambil Preview'}
      </button>

      {data && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-md w-full text-center">
          <img
            src={data.thumbnail}
            alt="Thumbnail"
            className="w-full rounded mb-3"
          />
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <p className="text-sm text-gray-600 mt-1">By: {data.author}</p>

          {data.videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${data.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-red-600 underline mt-3"
            >
              Tonton di YouTube
            </a>
          )}

          {data.play && (
            <a
              href={data.play}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 underline mt-3"
            >
              Tonton Video TikTok
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
