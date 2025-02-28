import React, {useState, useEffect} from 'react'
import './Home.css'



function Home() {

const [searchTerm, setSearchTerm ] = useState('')

const [searchResults, setSearchResults] = useState('');




const handleSearch = () => {
    setSearchTerm(searchTerm)
}

useEffect(() => {
    const results = db.collection('articles').find({searchTerm})
    setSearchResults(results)
}, [searchTerm])

  return (
    <div className='home-page'>
        <h1>scholar<strong>Base</strong></h1>
        <input 
            type='text'
            placeholder='Search database'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
            onClick={handleSearch}
            className='searchBtn'
        >
            Search
        </button>
        <p>{searchResults}</p>
    </div>
  )
}

export default Home