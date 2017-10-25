import React from 'react'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
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
                this.setState({
                    config: response
                })
            })
            .catch(error => {
                throw new Error('An error occurred while loading the config - '  + error)
            })
    }

    checkConfigFile() {
        if (!Array.isArray(this.state.config)) {
            throw new Error('the config file must be array')
        }
    }

    createListRoute() {
        this.checkConfigFile();

        return this.state.config.map((item, i)=>{

            const Element = (props) => (
                <Bundle path={"./" + item.path}>
                    {(Element) => <Element {...props}/>}
                </Bundle>
            );

            return <Route exact key={item.id} path={'/' + item.path} component={Element}/>
        })
    }

    createRouteWithRedirect() {
        return <Route render={()=>(
            <Redirect to={"/" + this.state.config[0].path}/>
        )}/>
    }


    get markup() {
        return (
            <Router>
                <div>
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