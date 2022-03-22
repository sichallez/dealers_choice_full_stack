import React from 'react';
import ReactDom from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { fetchClubs } from './store';
import Nav from './Nav';

class _App extends React.Component {
    // constructor() {
    //     super();
    //     // this.state = store.getState(); // when commenting this out, then there is no this.state in this component, only this.props mapped by connect from the store
    //     // console.log(this.state);
    // };

    componentDidMount() {
        // this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        // const { clubs } = this.props;
        // console.log(this.state, clubs);
        // store.dispatch(fetchClubs()); // with ONLY redux, this doesn't work, has to introuduce react-redux with connect and mapDispatch to handle axios function calls in store
        this.props.init(); // Remember init always put into componentDidMount! put in render, it will loop forever.
        // console.log('new state:', this.state, this.props.clubs);
    }
      
    // componentWillUnmount() {
    //     this.unsubscribe()
    // }

    render() {
        const { clubs } = this.props;
        console.log(clubs);
        return (
            <div>
                <h1>European Soccer Clubs</h1>
                <Nav />
            </div>
            
        );
    };

};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(fetchClubs());
        }
    }
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

ReactDom.render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
// This line is used to test if our app is working right after setting up the frontEnd with React and bundled to backend using webpack 
// render(<hr />, document.querySelector('#root'));