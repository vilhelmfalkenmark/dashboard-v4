import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from 'components/Navigation/Navigation';
import SearchJourney from 'pages/SearchJourney/SearchJourney';
import SearchStations from 'pages/SearchStations/SearchStations';
import FavoriteStations from 'pages/FavoriteStations/FavoriteStations';
import CloseStations from 'pages/CloseStations/CloseStations';

const NAV = [
  {
    heading: 'SL',
    id: 3892,
    routes: [
      {
        id: 8370,
        title: 'Sök resa',
        path: '/'
      },
      {
        id: 8371,
        title: 'Sök station',
        path: '/sok-station'
      },
      {
        id: 8372,
        title: 'Favorit stationer',
        path: '/favoriter'
      },
      {
        id: 8373,
        title: 'Närliggande stationer',
        path: '/nara-stationer'
      }
    ]
  }
];

const ROUTES = [
  {
    path: '/',
    component: SearchJourney
  },
  {
    path: '/sok-station',
    component: SearchStations
  },
  {
    path: '/favoriter',
    component: FavoriteStations
  },
  {
    path: '/nara-stationer',
    component: CloseStations
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
