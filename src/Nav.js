import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ clubs }) => {
    return (
        <div>
            <ul>
                { clubs.map(club => {
                    return <li key={ club.id }>{ club.name }</li>
                }) }
            </ul>
        </div>
    )
};

export default connect(state => state)(Nav);