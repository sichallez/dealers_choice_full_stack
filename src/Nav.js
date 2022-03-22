import React from 'react';
import { connect } from 'react-redux';
import { destroyClub } from './store';

const Nav = ({ clubs, destroy }) => {
    return (
        <div>
            <ul>
                { clubs.map(club => {
                    return (
                        <li key={ club.id }>
                            { club.name }
                            <button onClick={ () => destroy(club) }>Delete</button>
                        </li>)
                }) }
            </ul>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        destroy: (club) => dispatch(destroyClub(club))
    }
};

export default connect(state => state, mapDispatchToProps)(Nav);