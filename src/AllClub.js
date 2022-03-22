import React from 'react';
import { connect } from 'react-redux';
import { destroyClub } from './store';
import { Link } from 'react-router-dom';

const AllClub = ({ clubs, destroy, show }) => {
    return (
        <div>
            <ul>
                { clubs.map(club => {
                    return (
                        <li key={ club.id }>
                            <Link to={`/clubs/${club.id}`}>{ club.name }</Link>
                            <button onClick={ () => destroy(club) }>Delete</button>
                        </li>)
                }) }
            </ul>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        destroy: (club) => dispatch(destroyClub(club)),
    }
};

export default connect(state => state, mapDispatchToProps)(AllClub);