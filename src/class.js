import React from 'react';
import { useState } from 'react';
// import {FaSearch} from 'react-icons'
import Axios from 'axios';
import BookCard from './BookCard';
import './App.css'
 


const Class = () => {
  const [query, setQuery] = useState('')
  const handleSubmit = ()=>{
    const data = Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(res => console.log(res))
    console.log(data);
    const detail = data.data.items[0]
    console.log(detail);
  }
 
  return (
    <div>
    
      <input type="text" 
      value={query}
      onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSubmit}>Search</button>
      <div>
      <BookCard />
      </div>
      
    </div>
    
  );
}


export default Class;
