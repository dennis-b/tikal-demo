import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.css';
import { client } from "../Apollo";
import { HomeContainer } from "../Containers/Home/HomeContainer";

export function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                        <Route
                            path="/home"
                            component={HomeContainer}
                        />
                    </Switch>
                </Router>
            </div>
        </ApolloProvider>
    );
}

