import React from 'react'
import { Link } from 'react-router-dom';


const BookItem = ({ book, book: { volumeInfo } }) => {
  return (
    <div className="ui link cards">
      <div className="card" style={{ width: "220px" }} data-tooltip="See full description" data-inverted="" data-position="top right">
        <div className="image" >
          {volumeInfo.imageLinks === undefined ? "" : <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} style={{ height: '200px' }} />}
        </div>
        <div className="content" style={{ backgroundColor: '#f2eef2' }}>
          <div className="header">{volumeInfo.title}</div>
          <div className="meta">
            <p>{volumeInfo.authors}</p>
          </div>
          <div className="description">
            <Link to={`/book/${book.id}`}><button className="button is-success is-outlined">Description <br /> <i className="fa fa-angle-double-right"></i> </button></Link>
          </div>
        </div>
        <div className="extra content" style={{ backgroundColor: '#07051a', color: "white" }}>
          <span>
            publishedDate : &nbsp;
          {volumeInfo.publishedDate !== '0000' ? volumeInfo.publishedDate : 'Not Available'}
          </span>
        </div>
      </div>
    </div>

  )
}

export default BookItem




