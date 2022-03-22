import React from 'react';
import { connect } from 'react-redux';
import { destroyClub } from './store';
import { Link } from 'react-router-dom';

const Nav = ({ clubs, view, destroy }) => {
    return (
        <div>
            <h2>Welcome! Please click on the Show All Clubs tab to view all soccer clubs on file</h2>
            <nav>
                <Link to='/clubs'>Show All Clubs ({ clubs.length })</Link>
            </nav>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        destroy: (club) => dispatch(destroyClub(club))
    }
};

export default connect(state => state, mapDispatchToProps)(Nav);