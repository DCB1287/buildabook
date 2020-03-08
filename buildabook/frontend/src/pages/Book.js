import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import Chapter from '../components/chapter'

import bookData from '../placeholder data/book'
import chapterData from '../placeholder data/chapter'
import { Icon, Image, Card, Header, Table, Tab } from 'semantic-ui-react'


function Book() {
    const match = useRouteMatch()

    const [book, setBook] = useState({})
    const [chapters, setChapters] = useState([])
    const [chapterPane, setChapterPane] = useState([])

    useEffect(() => {
        
        //Get Book data
        const fetchBook = async () => {
        //const response = await axios.get(`${process.env.BASE_URL}/api/book?=${match.params._id}`)
        //setBook(response.data)
        setBook(bookData[0])
        setChapters(chapterData)
        function getChapterPane () {
            const pane = _.map(chapters, (chapter, i) => (
    
                {menuItem: `Chapter ${i+1}`, render: () => <Tab.Pane key={chapter._id}><Chapter chapter={chapter}/></Tab.Pane>}
            ))
            return pane
        }
        setChapterPane(getChapterPane)    
        }
        fetchBook();
    },[book])

        
    
    
    return (
        <>
        <h1>This is {book.title}'s Book Page</h1>
        
            <Card>
                <Card.Content>
                    <Image src={book.image} />
                    <Card.Header>
                        {book.title}
                    </Card.Header>
                    <Icon name='users' />
                        Authors: {_.map(book.authorArray, (author) => (
                                <p key={author} style={{display: "inline"}}>
                                    <a href={`/user/${author}`}>{author + " "}</a>
                                </p>
                            ))}  
                </Card.Content>
                <Card.Description>
                    {book.writingPrompt}
                </Card.Description>
            </Card>

            <Tab panes={chapterPane} />
        </>
    )   

}

export default Book