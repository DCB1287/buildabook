import React from 'react'
import _ from 'lodash'
import Chapter from '../components/chapter'
import { Divider, Tab } from 'semantic-ui-react'

function PastContenderTabs(props) {
    return (
        <>
            {_.map(props.pastContendersPanes, (contenderPane, i) => {
                return (
                <>
                    <Divider horizontal>Past Contenders from Chapter {i+1}</Divider>
                    <Tab menu={{fluid: true, vertical: true }} panes={contenderPane} />
                </>
                )})
            
            }
        </>
    )
}

export default PastContenderTabs