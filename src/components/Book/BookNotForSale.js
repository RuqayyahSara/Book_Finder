import React from 'react'
import { Link } from 'react-router-dom';

function BookNotForSale({ book, bookSaleInfo, bookRead, bookImg, bookAccess, bookAccess1 }) {
    const {
        title,
        authors,
        publisher,
        publishedDate,
        pageCount,
        averageRating,
        language,
        previewLink, } = book;

    const { country, isEbook } = bookSaleInfo;
    return (
        <div>
            <Link to="/" className="btn btn-light">Back to Search</Link>
            <table className="ui definition table" style={definition1}>

                <div style={{ display: "flex" }}>
                    <div className="all-center" >
                        <img src={bookImg.thumbnail} alt="Book Cover" style={{ width: '120px' }} />
                    </div>

                    <span style={{ flex: "1", paddingTop: "20px", paddingLeft: "50px" }}>
                        <h3 >

                            {isEbook ? <div><span className="tag is-success is-light">E-Book</span> &emsp; <i className="fas fa-check text-success" /></div> : <div> <span className="tag is-danger is-light">E-Book</span> &emsp; <i className="fas fa-times-circle text-danger" /></div>}
                            {bookAccess.isAvailable ? <div><span className="tag is-success is-light">ePUB</span> &emsp; <i className="fas fa-check text-success" /></div> : <div> <span className="tag is-danger is-light">ePUB</span> &emsp; <i className="fas fa-times-circle text-danger" /></div>}
                            {bookAccess1.isAvailable ? <div><span className="tag is-success is-light">PDF</span>&emsp;<i className="fas fa-check text-success" /></div> : <div> <span className="tag is-danger is-light">PDF</span>&emsp;&nbsp;&nbsp;<i className="fas fa-times-circle text-danger" /></div>}
                        </h3>
                        <div style={{ display: "flex" }}>
                            <div className="description" >
                                <a href={previewLink} target="_blank" rel='noopener noreferrer'><button className="button is-success is-outlined">Preview&emsp; <i className="fa fa-arrow-right"></i> </button></a>
                            </div>
                            <div className="description" style={{ marginLeft: "30px" }}>
                                <a href={bookRead.webReaderLink} target="_blank" rel='noopener noreferrer'><button className="button is-info is-outlined">Start Reading&emsp; <i className="fa fa-arrow-right"></i> </button></a>
                            </div>
                        </div>
                    </span>
                </div>

                <tbody>
                    <tr>
                        <td >Title</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td><p>{authors ? authors : 'Not Available'}</p></td>
                    </tr>
                    <tr>
                        <td>Publisher</td>
                        <td><p>{publisher ? publisher : 'Not Available'}</p></td>
                    </tr>
                    <tr>
                        <td>Published Date</td>
                        <td><p>{publishedDate ? publishedDate : 'Not Available'}</p></td>
                    </tr>
                    <tr>
                        <td>Language</td>
                        <td><p>{language ? language : 'Not Available'}</p></td>
                    </tr>
                    <tr>
                        <td>Page Count</td>
                        <td><p>{pageCount ? pageCount : 'Not Available'}</p></td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td><p>{country ? country : 'Not Available'}</p></td>
                    </tr>
                    <tr>
                        <td>Average Rating</td>
                        <td><p className="ui yellow circular label" >{averageRating ? averageRating : 'Nil'} </p></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
const definition1 = {
    width: '60rem',
    marginLeft: "265px",
    marginTop: "0px",
    marginBottom: "30px",
    borderTop: "5px solid #3f945b",
}
export default BookNotForSale
