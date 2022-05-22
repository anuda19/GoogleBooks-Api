import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { InputGroup, FormGroup, Input, Spinner } from 'reactstrap';
import Axios from 'axios';
import './App.css'
import BookCard from './BookCard';
import { ToastContainer } from 'react-toastify';




const App = () => {
  const [maxResults, setMaxResults] = useState(10)
  const [startIndex, setStartIndex] = useState(1)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])

  const handleSubmit = () => {
    setLoading(true)
    if (maxResults > 40 || maxResults < 1) {
      alert('Max Results must be between 1 to 40')
    } else {
      Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query} & maxResults=${maxResults} & startIndex=${startIndex}`
      ).then(res => {
        if (startIndex >= res.data.totalItems || startIndex < 1) {
          alert(`Max Results must be between 1 and ${res.data.totalItems}`)
        } else if (res.data.items.length > 0) {
          setCards(res.data.items)
          setLoading(false)
        }
        console.log(res.data)
      })
        .catch(err => {
          setLoading(true)
          alert(`${err.response.data.error.message}`)
        })
    }
  }

  const header = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"> <h1 className='display-1 text-center text-light mb-3' style={{ zindex: 2 }}>Google Books</h1></div>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup className='' >
            <Input placeholder='Book Search' value={query} onChange={e => setQuery(e.target.value)} />
            <button className="btn btn-secondary mx-1" onClick={handleSubmit}><FaSearch /></button>
          </InputGroup>
          <div className="container d-flex m-2">
            <FormGroup className='ml-5'>
              <label htmlFor="maxResults" className='text-light mx-2'>Max Results</label>
              <input type="number" id='maxResults' placeholder='Max Results ' value={maxResults} onChange={e => setMaxResults(e.target.value)} />
            </FormGroup>
            <FormGroup className='ml-5'>
              <label htmlFor="startIndex" className='text-light mx-2'>Start Index</label>
              <input type="number" id='startIndex' placeholder='Start Index' value={startIndex} onChange={e => setStartIndex(e.target.value)} />
            </FormGroup>
          </div>
        </div>
      </div>

    )
  }

  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      )
    } else {
      const items = cards.map((item) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks.thumbnail) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail
        }
        return (
          <div className='col-lg-4 mb-3' key={item.id}>
            <BookCard thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            />
          </div>
        )
      })
      return (
        <div className='container my-5'>
          <div className="row">{items}</div>
        </div>
      )
    }
  }

  return (
    <div className='w-100 h-100'>
      {header()}
      {handleCards()}
      <ToastContainer />
    </div>

  );

}

export default App;
