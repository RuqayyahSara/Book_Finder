import React, { Fragment } from "react";

const About = () => {
    return (
        <Fragment>
            <h1 className="about">About this App</h1>
            <h3> <strong>Book Finder is a website that allows users to search freely its database of books and magazines.
            It makes book content more discoverable on the Web. <br /><br />The main aim of the website is to allow users to
            perform full-text searches and retrieve book information, its viewability, and its availability.<br /><br />
            Book Finder uses Google Books API on its website to enable Google Books feature.
            </strong></h3>
            <div> <a href="https://twitter.com/RuqayyahMushtaq?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">
                Follow @RuqayyahMushtaq</a></div>
        </Fragment>
    )
}

export default About;
