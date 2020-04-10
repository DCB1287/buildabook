import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import BooksTable from '../components/booksTable'
import CreateNewBook from '../components/createNewBook'
import axios from 'axios'

import booksData from '../placeholder data/book'
import bookData from '../placeholder data/book';


function Books() {
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const [done, setDone] = React.useState(true)

    
    // Get all the books from database
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/book/getAll`)
            setBooks(response.data)
            setLoading(false)
        }
        fetchBooks()
    },[])
    

    return (
        <>
        <p>This is the Books page.</p>
        <Segment raised loading={loading}>
            <CreateNewBook />
            <BooksTable books = {books}/>
        </Segment>
        </>
    )
}

export default Books