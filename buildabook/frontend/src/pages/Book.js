import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import Chapter from '../components/chapter'
import CreateNewChapter from '../components/createNewChapter'

import bookData from '../placeholder data/book'
import chapterData from '../placeholder data/chapter'
import { Divider, Icon, Image, Card, Label, Tab, Header, Modal, Button, Segment } from 'semantic-ui-react'


function Book() {
    const match = useRouteMatch()

    const [book, setBook] = useState({})
    const [chapters, setChapters] = useState([])
    const [chapterPane, setChapterPane] = useState([])
    const [contenders, setContenders] = useState([])
    const [contendersPane, setContendersPane] = useState([])
    const [contendersArrayLength, setContendersArrayLength] = useState(0)
    const [pastContenders, setPastContenders] = useState([])
    

    useEffect(() => {
        
        //Get Book data
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/book/getById?books=${match.params._id}`)     
                setBook(response.data[0])
                //setBook(bookData[0])
            } catch (e) {
                console.log(e)
            }
            //On first load, React renders undefined objects.
            //This sets the length of the chapter array to show
            //console.log(book)

            
            if (Object.keys(book).length) {
                setContendersArrayLength(chapterData[0].length)
            }
        }
        fetchBook();
    },[])

    React.useEffect(() => {
        const getChapters = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chapter/getById`, {
                    params: {
                        chapters: book.chaptersArray
                    }
                })
                setChapters(response.data)
            } catch (e) {
                console.log(e)
            }
            
        }
        getChapters()
    },[book])

    //Using the chapters data, get the contender chapters.
    React.useEffect(()  => {
        const getContenders = async () => {
            let i = 0;
            let pastChapters = []
            while (chapters.length > i) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chapters/getById`, {
                        params: {
                            chapters: chapters[i].contenders
                        }
                    })
                    pastChapters.push(response.data)
                } catch (e) {
                    console.log(e)
                } finally {
                    i++
                }
            }
            //Placeholder data. Will need to call API.
            setContenders(pastChapters[pastContenders.length - 1])
            //Build the tabs for each chapter in the chapter list
            function getChapterPane () {
                const pane = _.map(chapters, (chapter, i) => (
                    {
                        menuItem: `Chapter ${i+1}`,
                        render: () => <Tab.Pane key={chapter._id}><Chapter chapter={chapter}/></Tab.Pane>
                    }
                ))
                return pane
            }
            setChapterPane(getChapterPane)    

            //Build the tabs for the contenders of the latest chapter
            function getContendersPane () {
                const pane = _.map(contenders, (contender, i) => (
                    {
                        menuItem: ` ${contender.author}`, 
                        render: () => <Tab.Pane key={contender._id}><Chapter chapter={contender}/></Tab.Pane>
                    }
                ))
                    return pane
            }
            setContendersPane(getContendersPane)

            //Build past contenders for past chapters
        }
        getContenders()
    },[chapters])
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
                                <Label key={author} as='a' href={`/user/${author}`} >
                                    <Image avatar spaced='right' src={author.profilePic} />
                                    {author}
                                </Label>
                            ))}  
                </Card.Content>
                <Card.Description>
                    {book.writingPrompt}
                </Card.Description>
            </Card>
            <Divider horizontal>
                <Header as='h3'>
                    <Icon name='book' />
                    The Story So Far
                </Header>
            </Divider>
            {chapters ?
                <Tab menu={{fluid: true, vertical: true }} panes={chapterPane} />
                :
                <Segment text textAlign='center' placeholder>
                    <Header as='h2' content="No winners yet!  Check Back Soon!"/>
                </Segment>
            }
            <Divider horizontal>
                <Header as='h3'>
                    <Icon name='pencil' />
                    Contenders for Chapter {chapters.length}
                </Header>
            </Divider>
            {contenders ?
                <>
                <Header as='h3' content='Conte'>Contenders </Header>
                <Tab menu={{fluid: true, vertical: true }} panes={contendersPane} />
                <br />
                </>
                :
                <Segment text textAlign='center' placeholder>
                    <Header as='h2' content="No submissions yet! Click Add Chapter to be the first!"/>
                </Segment>
            }
            <CreateNewChapter />

            {Boolean(chapters.length > 1) ?
                <Divider horizontal>
                    <Header as='h3'>
                        <Icon name='pencil' />
                        Past Contenders
                    </Header>
                </Divider>
                :
                <p></p>
            }
        </>
    )   

}

export default Book