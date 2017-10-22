import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Bundle extends Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    static propTypes = {
        path: PropTypes.string.isRequired
    };

    componentWillMount() {
        this.load()
    }

    load() {
        this.setState({
            mod: null
        });
        import(`${this.props.path}`).then((mod)=>{
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        }).catch((e)=>{
            throw new Error('an error occurred while loading the element - ' + this.props.path, e)
        })

    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}

export default Bundle