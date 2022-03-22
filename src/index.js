import React from 'react';
import ReactDom from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { fetchClubs } from './store';

class App extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
        // console.log(this.state);
    };

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
      
    // componentWillUnmount() {
    //     this.unsubscribe()
    // }

    render() {
        console.log(this.state);
        store.dispatch(fetchClubs());
        console.log('new state:', this.state);
        return (
            <div>
                <h1>European Soccer Clubs</h1>
                <ul>

                </ul>
            </div>
            
        );
    };

};

ReactDom.render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
// This line is used to test if our app is working right after setting up the frontEnd with React and bundled to backend using webpack 
// render(<hr />, document.querySelector('#root'));