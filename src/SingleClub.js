import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleClub = ({ clubs, match }) => {
    console.log(clubs, match);
    return (
        <div> 
            { clubs.filter(club => club.id === +match.params.id ).map( club => {
                return (
                    <div key={ club.id }>
                        <p> Name: {club.name}</p>
                        <p> Manager: {club.manager}</p>
                        <p> Stadium: {club.stadium}</p>
                        <p> Squad: {club.squad}</p>
                        <Link to='/clubs'> Go Back </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(state => state)(SingleClub); 