import React, {useState, useEffect} from 'react'
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
        const apiBaseUrl = `https://${process.env.REACT_APP_API_BASE_URL}`;
        const searchUrl = `${apiBaseUrl}/api/search?term=${encodeURIComponent(searchTerm)}`;
        
        console.log('Fetching URL:', searchUrl);

        const response = await fetch(searchUrl);
        
        // Log more details about the response
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers]));
        
        const responseText = await response.text();
        console.log('Response first 100 chars:', responseText.substring(0, 100));

        // Only try to parse if it looks like JSON
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
            const data = JSON.parse(responseText);
            setSearchResults(data);
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (err) {
        setError(`An error occurred while searching: ${err.message}`);
        console.error('Search error:', err);
    } finally {
        setIsLoading(false);
    }


}

useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
}, [searchTerm])

   // Helper function to render researchers (assuming researchers is an array of objects)
   const renderResearchers = (researchers) => {
    return researchers.map((researcher, index) => (
      <div key={index}>
        <strong>{researcher.name}</strong>: <em>{researcher.university}</em>
      </div>
    ));
  };



  const handleClick = () => {
    setSearchTerm('');
    setSearchResults([]);
};
 
  return (
    <div className='home-page'>
        <h1 
            className='title'
            onClick={handleClick}>
                scholar<strong>Base</strong>
        </h1>
        <div className='search-container'>
            <input 
                 type='text'
                 placeholder='Search scholarly articles, journals, and researchers'
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
                className='searchBtn' 
                disabled={isLoading}
                onClick={handleSearch}>
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
                            <p><i>{result.journal} ({result.publicationYear})</i></p>
                            <h4>Abstract:</h4>
                            <p>{result.abstract}</p>
                            <div className='researchers'>
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