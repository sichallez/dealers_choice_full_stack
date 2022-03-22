import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const LOAD = 'LOAD';
const DESTORY_CLUB = 'DESTORY_CLUB';
const CREATE_CLUB = 'CREATE_CLUB';
const SET_VIEW = 'SET_VIEW';

const clubReducer = (clubs = [], action) => {
    switch (action.type) {
        case LOAD:
            return action.clubs;
        case DESTORY_CLUB:
            return clubs.filter(club => club.id !== action.club.id);
        case CREATE_CLUB:
            return [...clubs, action.club];
        default:
            return clubs;
    }
};

const viewReducer = (view = '', action) => {
    switch (action.type) {
        case SET_VIEW:
            return action.view;
        default:
            return view;
    }
};

const reducer = combineReducers({
    clubs: clubReducer,
    view: viewReducer
});

// This code with single reducer didn't work out, something must be wrong, check it later!
// const reducer = (state = { clubs: [] }, action) => {
//     switch (action.type) {
//         case LOAD:
//             const clubs = [...state.clubs, action.clubs];
//             // console.log(clubs);
//             console.log(state);
//             let state1 = {...state, clubs };
//             console.log(state1);
//             return state1;
//         default:
//             return state;
//     }
// }

const fetchClubs = () => {
    return async(dispatch) => {
        const clubs = (await axios.get('/api/clubs')).data;
        dispatch({ type: LOAD, clubs });
    }
};

const destroyClub = (club) => {
    return async(dispatch) => {
        await axios.delete(`/api/clubs/${club.id}`);
        dispatch({ type: DESTORY_CLUB, club });
    };
};

const createClub = newClub => {
    return async(dispatch) => {
        const club = (await axios.post('/api/clubs', {newClub})).data
        console.log(club);
        dispatch({type: CREATE_CLUB, club});
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { fetchClubs, destroyClub, createClub }