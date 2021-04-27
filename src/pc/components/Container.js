import React from 'react'
import {withRouter} from 'react-router-dom'
const Container = (props) => {
    return (
        props.children
    )
}
export default withRouter(Container)
