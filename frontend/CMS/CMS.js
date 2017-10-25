import React from 'react'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    Link
} from 'react-router-dom'

import Bundle from '../Bundle'


export default class CMS extends React.Component {

    state = {
        config: null
    };

    static propTypes = {
        path: PropTypes.string.isRequired
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
                this.sortConfig(response)
            })
            .catch(error => {
                throw new Error('An error occurred while loading the config - '  + error)
            })
    }


    sortConfig(response) {
        if (!Array.isArray(response)) {
            throw new Error('the config file must be array')
        }

        this.setState({
            config: response.sort((a, b)=> a.order - b.order)
        })
    }

    createListRoute() {

        return this.state.config.map((item)=>{

            const Element = (props) => (
                <Bundle path={`./${item.path}`}>
                    {(Element) => <Element {...props}/>}
                </Bundle>
            );

            return <Route exact key={item.id} path={`/${item.path}`} component={Element}/>
        })
    }

    createRouteWithRedirect() {
        return <Route render={()=>(
            <Redirect to={`/${this.state.config[0].path}`}/>
        )}/>
    }

    createLinks() {
        return this.state.config.map((item)=>{
            return (
                <li key={item.id}>
                    <Link to={`/${item.path}`}>{item.title}</Link>
                </li>
            )
        })
    }


    get markup() {
        return (
            <Router>
                <div>
                    <ul>
                        {this.createLinks()}
                    </ul>
                    <hr/>
                    <Switch>
                        {this.createListRoute()}
                        {this.createRouteWithRedirect()}
                    </Switch>
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