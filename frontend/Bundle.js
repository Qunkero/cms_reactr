import React, { Component } from 'react'

class Bundle extends Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    }

    componentWillMount() {
        this.load()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load() {
        this.setState({
            mod: null
        })
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