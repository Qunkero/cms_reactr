import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Bundle from '../Bundle'


export default class CMS extends React.Component {

    state = {
        config: null
    };

    maxOrder = {

    };

    componenDidMount() {
        fetch(this.props.path)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then((response)=>{
                this.setState({
                    config: response
                })
            })
            .catch(error => {
                throw new Error('An error occurred while loading the config')
            })
    }

    createListRoute() {
        return this.state.config.map((item, i)=>{
            const Element = (props) => (
                <Bundle path={`./${item.path}`}>
                    {(Element) => <Element {...props}/>}
                </Bundle>
            );
            return <Route path={item.path} component={Element}/>
        })
    }

    get markup() {

        return (
            <Router>
                {this.createListRoute()}
            </Router>
        )

    }

    render() {

        return (
            this.state.config ? this.markup : null
        )

    }

}