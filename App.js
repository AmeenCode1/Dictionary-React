import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchMeaning = async (word) => {
    setLoading(true);
    setError(null);
    setMeaning(null);

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = response.data;

      if (data && data[0] && data[0].meanings) {
        setMeaning(data[0].meanings[0].definitions[0].definition);
      } else {
        setError('No meaning found for this word.');
      }
    } catch (err) {
      setError('Error fetching word meaning.');
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && word) {
      fetchMeaning(word);
    }
  };

  return (
    <div className="App"> 
      <h1>Dictionary App</h1>


      <input
        type="text"
        placeholder="Enter a word "
        value={word}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />


      {loading && <p>Loading...</p>}


      {error && <p style={{ color: 'red' }}>{error}</p>}


      {meaning && (
        <div>
          <h2>Meaning:</h2>
          <p>{meaning}</p>
        </div>
      )}
    </div>
  );
};

export default App;
 