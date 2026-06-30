import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState(null);

  const handleSearch = async () => {
    const url = `https://www.omdbapi.com/?t=${searchTerm}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json(); 
      setMovieData(data); 
    } catch (error) {
      console.error("Oops, something went wrong:", error);
    }
  };

  return (
    <div>
      <h1>🎬 Movie Explorer</h1>
      
      <div style={{ margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Search for a movie..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '250px' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '10px 15px', fontSize: '16px', marginLeft: '10px' }}
        >
          Search
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', borderTop: '1px solid #444' }}>
        {movieData && movieData.Response === "True" ? (
          <div>
            <h2>{movieData.Title} ({movieData.Year})</h2>
            <img 
              src={movieData.Poster} 
              alt={`${movieData.Title} Poster`} 
              style={{ width: '200px', borderRadius: '8px', marginTop: '10px' }} 
            />
            <p style={{ maxWidth: '400px', margin: '20px auto' }}>{movieData.Plot}</p>
          </div>
        ) : movieData && movieData.Response === "False" ? (
          <p style={{ color: '#ff6b6b' }}>{movieData.Error} Please try another search.</p>
        ) : (
          <p>Movie results will appear here...</p>
        )}
      </div>
    </div>
  )
}

export default App