import React from 'react'
import ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Bundle from './Bundle'

import loadAbout from 'bundle-loader?lazy!./About'
import loadDashboard from 'bundle-loader?lazy!./Home'
import loadList from 'bundle-loader?lazy!./List'

const About = (props) => (
    <Bundle load={loadAbout}>
        {(About) => <About {...props}/>}
    </Bundle>
)

const List = (props) => (
    <Bundle load={loadList}>
        {(List) => <List {...props}/>}
    </Bundle>
)

const Dashboard = (props) => (
    <Bundle load={loadDashboard}>
        {(Dashboard) => <Dashboard {...props}/>}
    </Bundle>
)

class App extends React.Component {


    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/list">List</Link></li>
                    </ul>

                    <hr/>

                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/about" component={About}/>
                    <Route path="/list" component={List}/>
                </div>
            </Router>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('container')
);