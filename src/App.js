import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from 'components/Navigation/Navigation';
import SearchStations from 'pages/SearchStations/SearchStations';
import FavoriteStations from 'pages/FavoriteStations/FavoriteStations';

const NAV = [
  {
    heading: 'SL',
    id: 3892,
    routes: [
      {
        id: 8371,
        title: 'Sök station',
        path: '/'
      },
      {
        id: 2730,
        title: 'Favorit stationer',
        path: '/favoriter'
      }
    ]
  }
];

const ROUTES = [
  {
    path: '/',
    component: SearchStations
  },
  {
    path: '/favoriter',
    component: FavoriteStations
  }
];

export const App = () => (
  <Router>
    <Navigation navigation={NAV} />
    {ROUTES.map((route, index) => (
      <Route key={index} exact path={route.path} component={route.component} />
    ))}
  </Router>
);

export default App;
