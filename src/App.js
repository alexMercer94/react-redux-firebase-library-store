import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import Subscribers from './components/subscribers/subscribers';
import NewSubscriber from './components/subscribers/newSubscriber';
import EditSubscriber from './components/subscribers/editSubscriber';
import ShowSubscriber from './components/subscribers/showSubscriber';
import Navbar from './components/layout/Navbar';
import Books from './components/books/Books';
import ShowBook from './components/books/ShowBook';
import NewBook from './components/books/NewBook';
import EditBook from './components/books/EditBook';
import LoanBook from './components/books/LoanBook';
import Login from './components/auth/Login';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={UserIsAuthenticated(Books)}></Route>
                        <Route exact path="/books/show/:id" component={UserIsAuthenticated(ShowBook)}></Route>
                        <Route exact path="/books/new" component={UserIsAuthenticated(NewBook)}></Route>
                        <Route exact path="/books/edit/:id" component={UserIsAuthenticated(EditBook)}></Route>
                        <Route exact path="/books/loan/:id" component={UserIsAuthenticated(LoanBook)}></Route>

                        <Route exact path="/subscribers" component={UserIsAuthenticated(Subscribers)}></Route>
                        <Route exact path="/subscribers/new" component={UserIsAuthenticated(NewSubscriber)}></Route>
                        <Route
                            exact
                            path="/subscribers/show/:id"
                            component={UserIsAuthenticated(ShowSubscriber)}
                        ></Route>
                        <Route
                            exact
                            path="/subscribers/edit/:id"
                            component={UserIsAuthenticated(EditSubscriber)}
                        ></Route>

                        <Route exact path="/login" component={UserIsNotAuthenticated(Login)}></Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
