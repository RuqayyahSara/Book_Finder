import React, { useState, Fragment } from 'react';
import axios from "axios";

import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Search from "./Layouts/Search";
import About from "./About";
import Books from "./Books";
import Book from "./Book/Book";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  // managing states
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);
  const [bookSaleInfo, setBookSaleInfo] = useState([]);
  const [bookPrice, setBookPrice] = useState([]);
  const [bookImg, setBookImg] = useState([]);
  const [bookAccess, setBookAccess] = useState([]);
  const [bookAccess1, setBookAccess1] = useState([]);
  const [bookRead, setBookRead] = useState([]);
  const [sort, setSort] = useState('');

  // search query method

  const searchBook = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}&printType=all&key=${process.env.REACT_APP_API_KEY}&maxResults=40`);
    cleanedData(res);
    setLoading(false);
    setBooks(res.data.items);
  };

  // Getting book metadata method

  const getBook = async (id) => {
    setLoading(true);
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    setBook(res.data.volumeInfo);
    setBookRead(res.data.accessInfo);
    setBookSaleInfo(res.data.saleInfo);
    setBookPrice(res.data.saleInfo.listPrice);
    setBookAccess(res.data.accessInfo.epub);
    setBookAccess1(res.data.accessInfo.pdf);
    setBookImg(res.data.volumeInfo.imageLinks);
    setLoading(false);
  }

  // Filtering Books method

  const sortedBooks =
    books.sort((a, b) => {
      if (sort === 'latest')
        return parseInt(b.volumeInfo.publishedDate.substring(0, 6)) - parseInt(a.volumeInfo.publishedDate.substring(0, 6));
      else if (sort === 'oldest')
        return parseInt(a.volumeInfo.publishedDate.substring(0, 6)) - parseInt(b.volumeInfo.publishedDate.substring(0, 6));
      else
        return "";
    })

  // Adding thumbnails and published dates 

  const cleanedData = async (res) => {
    const cleanData = await res.data.items.map((book) => {
      if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
        book.volumeInfo.publishedDate = '0000';
      }
      else if (book.volumeInfo.hasOwnProperty('imageLinks') === false)
        book.volumeInfo.imageLinks = { thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAY1BMVEXZ2dnY2Nje3t5hYWFkZGTc3NxgYGBcXFzg4ODQ0NBoaGiRkZGNjY13d3fCwsLJycmYmJijo6N5eXmurq6BgYG2trbExMRsbGyIiIjNzc2WlpakpKRycnK0tLSqqqq8vLxSUlJLK9mLAAAIwElEQVR4nO2diXbiOBBFrV1e2IyDIZjA/3/llBavMXQyQEJ11z0ng7Fl+Ul+KqmU9JkkIQiCIAiCIAiCIAiCIJKEMTb5SbqfV4Z1QodtCKdfGTbs4CCYIdDNwg9rDwdm+WVlBEH8tfRREtX01NNHTYqWT4eNOhpDh1/z92/r+i64BLPREUuw6J/4+7flfIF5f+MJ32gZ9PDLB5Quh/ttId8E3WKE+BWu+APFuExeXOPfynDHBYNPKA4S3wFTnkb+/j2w9vl0x/yX5dyEkjKETHYVByZjw+PbJZOfj2rD0cA+CZyemtw0XRU9R/vk4a/J6HeI09/fMvzz1cwCeNKm4enx1998g5NofyX4Xyk1GJf/OoNF1/W/UUDcUZ+dO10HT2w/8ffLr5p/jmlHzZx7SUbenr105b6+zNcs8Ivz/BXnzkz9V+I3/pnsbiY+YWx47oV759u6r4e0mQn9y+5/DpOA84f1CcXvG4zm+WS0CsLg76Gfr/6RCpt8Tqua//oC/k4+/4xLXMsvyd8eNvHJX7iOvTJ7j8ZxcssnSUJewcpNb+Pah5iNWoMG/DkqD5qLptXETcZmZt3xp+Xt6/NZJJsNwTcaMzMaiGugWAUNZ2Tk8XuWb61PBiXZ8HTy6m/x+XSmYAmqOMhm3vL4RQ8KEQRBEARBEATxz5H2R2k8VpzBIR8VgzMexuM3lowOEg43McVHhf0NXZVsUuVd8H2lorJaLnzF/Lxvsqxcp6rPcNRSZ57mHRrH18Is/fmVEetw06mqs7r8YFCbOpusRZauer4soMrF+vAw5XZvKt7qbqx7Rm6E0ELq7Kx63WctpXDoDPptrc1SDXQrVhl/1TQrBYUvWkN5KeBjoVw7dahSnOzDdEsdhEfdfK+lKde5hI/lSHe1BhZCb7jv76HupITS+3UB2rKDSlbvULKU0n0c4Rlr46p8r6HQm5rX8T90Z9pbxenm8L6NzFaWc7vWMuseArr1Bs5y1YjKTnXzjZYNs9zavRauMiho34VO3Q3gMSPl2VX5AS8hvSrl27qhx5PW36qUZsfDFWFOrfBe9yLq3nHHwetmmRTO2IlSC2lW/iYOug/hEZXUb6HKtdDHx1gcdMu9dsKDT1Ihy+BBtdOiaB/ifLLfAnuh1wp06437tj1q0K12RryHkuqk9THozlvdSsgmVpMaWT1Mt2E5COfBJ7s2QMBDsrYJXje8FgDGXuriSebGHJA53SB2G9/Mqm1C398pNDnWY6VcPES2153ywvW484ka6RYj3do4KrCB020CQbe5rVs8SXcCwkXVOH+nUHP0yVKLfOATsT4cVofE+rgm9NvBcfbNhMbm8aatFseJbv4sn8AQtwVED6fYjctlePB+ELXCuGxv8uPSj8MQT8BiOg3jsunGZedvGOD6FMYlnPt4qG4nPPPx5A0asFTWMoiD9TgOdk/8FAePRjYrCIOs0nofbur7G16HFG9QZQLhMnvQLmOrO1HQ426e57mGuJgXjZZi90XdSVJB6SrfZ0JkUexAt90YqUtXZWbOD5t3RNANwo13Nn83AqZ0mOeX/SsFs+v1dd2K7WFugdtMc4jCep/A8SZWqc+PWqDYylziFMb3tXcw3xXSmObIBl0DS47LUPflEnVfTB4XY5Uwptyq9iZeXC6r7oZVDgGo2bDHrQhh+u0Po0jrGD9CuRl78M223dqWg1PAoAwf1TC9+jrQtj5BEM/keTGm30hw+xCqO2ynuvHZNPx3+pek/Zluu8IOb5lcHJ38f/APkbX5DWTIu3D2IENq7+Z3kck4f7BG1pbZXMrVuI5CyjiXqqMM2w/13kuD9XbZl8tluzmR35vWw7I1MzGdemtX0ZDmtstNXohuNcsakVm/Fl2NJj4GS5M6dLhLkN1CRMLqxlVgRdg/aeuKWZIp7tQNqXaWiXcbdUntH69qSHNDgdQty8vuetAtRrr5UWdZzKD5BoRWVVWCcJcBjXTbQoh1YHvnOsV1Z9auiV03b8N2U5vo8A+nWxxu6m4klAlpDOg2O7cSWUmfrk11G+Z3Afi9CxUGa+4PreN2A9i65H7fIK5Sma2lPOmYcc7rhhWuLN5FMJvXzZXioDuf6uZet1Lq7uWVAs2bRLc5HwgWK+/XRavJQErbRPfO64Ze1OdlbBvo1pvT6bRdzPgEdOsPt3lx954VdKc4QMYThbikZs0Ho9Jlhmd7hCRYXdWdZrLmSSNF1O3Sfrc56Nfyn8alH5XlvaMS8vA9d50aw5h1gQEak8X4CjZqIJeJSfisbhgBYmNhbPqo43SHkCH9ntFzdPtX7E3chzHj3nkMU+oImhSDxF6vrul2G2spY25o2OCT4xsARnGp5Cd/L1fAIbmPFOaBGujCmNvfKKAxy5iSQ6SofQGfW3a6dT/v+EDqi7ihwdy4XLqhxw8+Hx3oZmFcPmBYwivOZCSOTL6H6dFtt3lN5/56nQz7+2DbTA6y31jGt63VDTmqz/+d7lAWcjSv287kgN8EXrEsF0BZS3OIIxO6bzhXNu11cG+nWxa5o/hQbgRkoQ4/ZzqfnJwVlmXrkzoPhXeuPhG/bO/ocxd4K+vemz2ZbpMBArZp50qYkfx1voORaQe6RfjdQsF9IA115ALa5ub5MC6FgTuc7rbwWfl5Pny5Z33CC93uwrh9stjHm25U8qNpt3pUKS5puz4pdPSOzrmtRZxM3Y5b5XUHmk2MgxHXqMGdd+hmiUq67b9+YyrpfuvFBtcT9YelNEtG403ZP91AEARBEARBEARBEARB/IOg/beer/4/CSReA6w+waobKVh7G69NsOrGCVqboPUJ3h7HCN7exiocb49jBOs8j1U33nGJE8Q+wSqc+EHI38RXwOoTrLppnv9Z0NoErU/w9jhG0PY21gCOVTdS0PY2+eRHwdrZaG2CVjjxo2D1CVbdSMHa23htglU3TtDaBK1P8PY4RigO/jRoOxwlaP2NVTfxo6D1NxmcIAiCIAiCIAiCIAjiFv8BoiNeh4LKAvoAAAAASUVORK5CYII=' }
      return book;
    })
    return cleanData;
  }

  //  Rendering App
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' render={() => (
          <Fragment>
            <Search searchBook={searchBook} setSort={setSort} /> <br /> <br />
            <Books loading={loading} books={sortedBooks} />
          </Fragment>
        )} />

        <Route exact path='/about' component={About} />

        <Route exact path='/book/:id' render={(props) => (
          <Book {...props} getBook={getBook} loading={loading} book={book} bookRead={bookRead} bookSaleInfo={bookSaleInfo} bookPrice={bookPrice} bookImg={bookImg} bookAccess={bookAccess} bookAccess1={bookAccess1} />
        )} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
