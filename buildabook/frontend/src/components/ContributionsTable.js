import React from 'react'
import _ from 'lodash'
import { Table, Image, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function BooksTable(props) {
    const [direction, setDirection] = React.useState(null)
    const [column, setColumn] = React.useState("")
    const [data, setData] = React.useState(props.books)
    const [booksPerPage, setBooksPerPage] = React.useState(3)
    const [paginationPages, setPaginationPages] = React.useState(Math.ceil(data.length / booksPerPage))
    const [activePage, setActivePage] = React.useState(1)

    const now = new Date()


    function handleSort(clickedColumn) {
        if (column !== clickedColumn) {
            setData(_.orderBy((data), [clickedColumn]))
            setColumn(clickedColumn)
            setDirection('ascending')
            setActivePage(1)
            return
        } 
        setData(data.reverse())
        setDirection(direction === 'ascending' ? 'descending' : 'ascending')
    }

    function handlePageChange(e, { activePage }) {
        setActivePage(activePage)
    }
    
    function handleTimeLeft(date) {
        const now = new Date();
        const distance = date - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days > 0) {
            return  (
                <Statistic.Group size='mini'>
                    <Statistic>
                        <Statistic.Value>{days}</Statistic.Value>
                        <Statistic.Label>Days</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            )
        } else if (hours > 0) {
            return ( 
                <Statistic.Group size='mini'>
                    <Statistic>
                        <Statistic.Value>{hours}</Statistic.Value>
                        <Statistic.Label>Hours</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            )
        } else if (minutes > 0) {
            return (
                <Statistic.Group size='mini'>
                    <Statistic>
                            <Statistic.Value>{minutes}</Statistic.Value>
                            <Statistic.Label>Minutes</Statistic.Label>
                        </Statistic>
                </Statistic.Group>
            )
        } else if (seconds > 0) {
            return (
                <Statistic.Group size='mini'>
                    <Statistic>
                        <Statistic.Value>{seconds}</Statistic.Value>
                        <Statistic.Label>Seconds</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            )
        }
    }

    //Get indexes to render pagination
    const indexOfLastBook = activePage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage

    return (
        <>
        <Table sortable fixed celled padded striped selectable stacking='true'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>
                        Cover
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'title' ? direction : null}
                        onClick={() => handleSort('title')}
                        width={2}
                    >
                        Title
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Genre' ? direction : null}
                        onClick={() => handleSort('Genre')}
                        width={5}
                    >
                        Genre
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'writingPrompt' ? direction : null}
                        onClick={() => handleSort('writingPrompt')}
                        width={7}
                    >
                        Writing Prompt
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'inProgress' ? direction : null}
                        onClick={() => handleSort('inProgress')}
                        textAlign='right'
                        width={1}
                    >
                        In Progress?
                    </Table.HeaderCell>
                   
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {_.map(data.slice(indexOfFirstBook, indexOfLastBook), ({ _id, image, title, Genre, writingPrompt, inProgress, experationDate }) => (
                    <Table.Row key={_id}>
                        <Table.Cell>
                            <Image src={image} size='tiny' centered />
                        </Table.Cell>
                        <Table.Cell>
                            <Link to={`/books/${_id}`}>{title}</Link>
                        </Table.Cell>
                        <Table.Cell>{Genre}</Table.Cell>
                     
                        <Table.Cell>{writingPrompt}</Table.Cell>
                        <Table.Cell textAlign='right'>{inProgress ? 'Yes' : 'No'}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            {((experationDate - now) < 0) ? '-' :  handleTimeLeft(experationDate)}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        </>
    )
}

export default BooksTable
