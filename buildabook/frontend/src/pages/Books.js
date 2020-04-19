import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import BooksTable from '../components/booksTable'
import CreateNewBook from '../components/createNewBook'
import axios from 'axios'


function Books() {
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true)

    
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
        
        <Segment raised padded loading={loading}>
            
            <BooksTable books = {books}/>
        </Segment>
        <CreateNewBook />
        </>
    )
}

export default Books