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

    componentDidMount() {
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
                throw new Error('An error occurred while loading the config - '  + error)
            })
    }

    createListRoute() {
        return this.state.config.map((item, i)=>{

            const Element = (props) => (
                <Bundle path={"./" + item.path}>
                    {(Element) => <Element {...props}/>}
                </Bundle>
            );

            return <Route key={item.id} path={'/' + item.path} component={Element}/>
        })
    }

    get markup() {
        return (
            <Router>
                <div>
                    {this.createListRoute()}
                </div>
            </Router>
        )
    }

    get pleaseWait() {
        return <h3>please wait for loading file</h3>
    }

    render() {

        return (
            this.state.config ? this.markup : this.pleaseWait
        )

    }

}