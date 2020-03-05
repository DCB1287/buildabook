import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'


function Book() {
    const match = useRouteMatch()

    useEffect(() => {
        fetchBook();
    })
    
    const [book, setBook] = useState({})
    


    //Get Book data
    const fetchBook = async() => {
        const response = await axios.get(`${process.env.BASE_URL}/api/book?=${match.params._id}`)
        setBook(response.data)
    }

    return (
    <h1>This is {book.title}'s Book Page</h1>
    )

}

export default Book