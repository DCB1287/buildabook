import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'


function User () {

    const match = useRouteMatch()


    return (
        <>
            <Header as='h1'>
                This is {match.params._id}'s User Page
            </Header>
        </>
    )
}

export default User