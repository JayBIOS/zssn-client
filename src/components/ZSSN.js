/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 5/22/17.
 */

import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic.min';
import 'leaflet/dist/leaflet.css';

import '../styles/ZSSN.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

const ZSSN = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default ZSSN;
