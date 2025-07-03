// === ✅ FILE: src/App.jsx ===
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('/api/preview?url=' + encodeURIComponent(url));
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">URL Downloader</h1>
      <input
        className="w-full max-w-md p-2 border rounded mb-4"
        placeholder="Masukkan URL TikTok"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleFetch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Memuat..." : "Ambil Preview"}
      </button>

      {data && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-md w-full">
          <img src={data.thumbnail} alt="thumbnail" className="w-full rounded" />
          <h2 className="text-xl font-semibold mt-2">{data.title}</h2>
          <p className="text-sm text-gray-600">By: {data.author}</p>
          <a
            href={data.play}
            target="_blank"
            className="text-blue-600 underline block mt-2"
          >
            Tonton Video
          </a>
        </div>
      )}
    </div>
  );
}

export default App;