import React from 'react'

function Result({ palindromic }) {
    return (
        <ul className="list-group">
            <li className="list-group-item list-group-item-success text-center">{palindromic}</li>
        </ul>
    )
}

export default Result
