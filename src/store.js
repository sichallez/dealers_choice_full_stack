import { createStore } from 'redux';
import axios from 'axios';

const LOAD = 'LOAD';

// Action Creators
// Implementation with only Redux (without react-redux)
const fetchClubs = async() => {
    const clubs = (await axios.get('/api/clubs')).data;
    return { type: LOAD, clubs };
};
// const fetchClubs = () => {
//     return async(dispatch) => {
//         const clubs = (await axios.get('/api/clubs')).data;
//         dispatch({ type: LOAD, clubs });
//     }
// };

const reducer = (state = { clubs: [] }, action) => {
    switch (action.type) {
        case LOAD:
            const clubs = [...state.clubs, action.clubs];
            console.log(clubs);
            return {...state, clubs };
        default:
            return state;
    }
}



const store = createStore(reducer);

export default store;
export { fetchClubs }