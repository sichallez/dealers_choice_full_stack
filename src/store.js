import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const LOAD = 'LOAD';

const clubReducer = (clubs = [], action) => {
    switch (action.type) {
        case LOAD:
            return action.clubs;
        default:
            return clubs;
    }
};

const reducer = combineReducers({clubs: clubReducer});

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

// Action Creators
// Implementation with only Redux (without react-redux), should work, but didn't figure it out
// const fetchClubs = async() => {
//     const clubs = (await axios.get('/api/clubs')).data;
//     return { type: LOAD, clubs };
// };
const fetchClubs = () => {
    return async(dispatch) => {
        const clubs = (await axios.get('/api/clubs')).data;
        dispatch({ type: LOAD, clubs });
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { fetchClubs }