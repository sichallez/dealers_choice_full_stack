import React from "react";
import { connect } from 'react-redux';
import { createClub } from './store'

class Create extends React.Component {
    constructor() {
        super()
        this.state = {
            newClub: ''
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(ev) {
        ev.preventDefault();
        this.props.create(this.state.newClub);
    };
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        const { newClub } = this.state;
        // console.log(newClub);
        const { handleChange, handleSubmit } = this;
        return (
            <form onSubmit={ handleSubmit }>
                <input name='newClub' value={ newClub } onChange={ handleChange } />
                <button> Create New Club </button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        create: (newClub) => dispatch(createClub(newClub))
    }
}

export default connect(null, mapDispatchToProps)(Create);