import React from 'react'

function Spinner() {
    return (
        <div className="ui icon message" style={spinner}>
            <i className="notched circle loading icon"></i>
            <div className="header">
                <h1> Loading</h1>
            </div>
        </div>
    )
}

const spinner = {  
height: '100px',
backgroundColor: '#3f945b',
color: 'white'
}

export default Spinner;
