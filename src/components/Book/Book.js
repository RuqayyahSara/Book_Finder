import React, { useEffect} from 'react'
import BookForSale from "./BookForSale";
import BookNotForSale from "./BookNotForSale";
import Spinner from "../Layouts/Spinner";

const Book = ({ loading, book, bookSaleInfo, bookPrice, bookRead, bookImg, bookAccess, bookAccess1, getBook, match }) => {
    useEffect(() => {
        getBook(match.params.id);
        // eslint-disable-next-line
    }, []);

   
    if (loading) {
        return <Spinner />;
    }

    if (bookSaleInfo.saleability !== "NOT_FOR_SALE") {
       return <BookForSale book={book} bookSaleInfo={bookSaleInfo} bookPrice={bookPrice} bookRead={bookRead} bookImg={bookImg} bookAccess={bookAccess} bookAccess1={bookAccess1} />
    }
    
    return (
       <BookNotForSale book={book} bookSaleInfo={bookSaleInfo} bookRead={bookRead} bookImg={bookImg} bookAccess={bookAccess} bookAccess1={bookAccess1} />
    )
}



export default Book
