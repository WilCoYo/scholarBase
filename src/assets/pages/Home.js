import React, {useState} from 'react'
import './Home.css'



function Home() {

const [searchTerm, setSearchTerm ] = useState('')
const [searchResults, setSearchResults] = useState([]);
const [isLoading, setIsLoading] = useState(false);
// eslint-disable-next-line
const [error, setError] = useState(null);



const handleSearch = async () => {
    if(!searchTerm.trim()) return

    setIsLoading(true);
    setError(null);


try {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    const response = await fetch(`${apiBaseUrl}/api/search?term=${encodeURIComponent(searchTerm)}`);
    
    if(!response.ok) {
        const errorText = await response.text();
        throw new Error(`Search failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json();
    setSearchResults(data)
} catch (err) {
    setError("An error occurred while searching. Please try again")
    console.error('Search error:', err);
} finally {
    setIsLoading(false);
}

}

   // Helper function to render researchers (assuming researchers is an array of objects)
   const renderResearchers = (researchers) => {
    return researchers.map((researcher, index) => (
      <div key={index}>
        <strong>{researcher.name}</strong>: <em>{researcher.university}</em>
      </div>
    ));
  };

  return (
    <div className='home-page'>
        <h1>scholar<strong>Base</strong></h1>
        <div className='search-container'>
            <input 
                 type='text'
                 placeholder='Search database'
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className='searchBtn' disabled={isLoading}>
                { isLoading ? 'Searching...' : 'Search' }
            </button>
        </div>
        <div className='results-container'>
            {searchResults.length > 0 ? (
            <div>
                <h2>Search Results ({searchResults.length})</h2>
                <ul className='results-list'>
                    {searchResults.map((result, index) => (
                        <li key={result._id || index} className='result-item'>
                            <h3>{result.articleTitle}</h3>
                            <p>{result.journal} <i>({result.publicationYear})</i></p>
                            <div>
                                <h4>Researchers:</h4>
                                {renderResearchers(result.researchers)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            ) : (
                searchTerm && !isLoading && <p>No results found for: "{searchTerm}"</p>
            )}
        </div>
    </div>
  )
}

export default Home