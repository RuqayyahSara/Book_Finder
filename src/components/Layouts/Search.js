import React, { useState } from 'react'

function Search({ searchBook, setSort }) {
    const [text, setText] = useState("");

    const changeHandler = (e) => {
        setText(e.target.value);
    }

    const submitHandler = (e) => {
        searchBook(text);
        e.preventDefault();
    }

    const sortHandler = (e) => {
        setSort(e.target.value);
    }


    return (
        <div>
            <br /> <br />
            <form onSubmit={submitHandler}>
                <center>
                    <input
                        type="text"
                        placeholder="Find a book"
                        value={text}
                        onChange={changeHandler}
                        required></input>
                    <i className="fa fa-search" id="search"></i>
                </center>
            </form>
            <center>
                <select defaultValue="sort" onChange={sortHandler} className="ui dropdown">
                    <option disabled value="sort">Sort</option>
                    <option value="oldest">Oldest</option>
                    <option value="latest">Latest</option>
                </select>
            </center>
        </div>
    )
}

export default Search;


