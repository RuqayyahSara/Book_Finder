import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark">
				<h2 className="main animated bounceInRight">
					<a href="/" >
						<x-sign>
							<small> BOOK FINDER </small> &nbsp; &nbsp;<i className="fa fa-book" ></i>  <br />
						</x-sign>
					</a>
				</h2>
				<ul>
					<li>
						<Link to="/">Home </Link>
					</li>
					<li>
						<Link to="/about">About<br /></Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default Header;
