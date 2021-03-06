import React from 'react';
import ReactDom from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { fetchClubs } from './store';
import Nav from './Nav';
import Create from './Create';
import { HashRouter, Route, Link } from 'react-router-dom';
import SingleClub from './SingleClub';
import AllClub from './AllClub';

class _App extends React.Component {
    
    componentDidMount() {
        this.props.init(); // Remember init always put into componentDidMount! put in render, it will loop forever.
    }

    render() {
        const { clubs } = this.props;
        return (
            <HashRouter>
                <div>
                    <h1>European Soccer Clubs</h1>
                    <Nav />
                    <Route exact path='/clubs' component={ AllClub } />
                    <Route path='/clubs/:id' component={ SingleClub }/>
                    <Create />
                </div>
            </HashRouter>
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