import React from 'react'
import BookItem from "./BookItem"
import Spinner from "./Layouts/Spinner";

const Books = ({ loading, books }) => {
    if (loading)
        return (
            <Spinner />
        )
    else {
        return <div style={bookStyle}>{books.map((book) =><BookItem key={book.id} book={book} />)}</div>;
    }

}

const bookStyle = {
    display : 'grid',
    gridTemplateColumns :'repeat(4,1fr)',
    marginLeft: '110px',
    gridGap: '1.5rem'
}

export default Books


