import React from 'react'
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

    maxOrderItem = null;
    maxOrder = -1;

    componentDidMount() {
        if (!this.props.path) throw new Error('you must supply the path to config file to start work with app')

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

            //determining tab with the highest order to show it by default
            if (this.maxOrder < item.order) {
                this.maxOrder = item.order;
                this.maxOrderItem = i;
            }

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
            <Redirect to={"/" + this.state.config[this.maxOrderItem].path}/>
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