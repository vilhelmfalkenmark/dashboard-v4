import gql from 'graphql-tag';

export const SEARCH_STATION_BY_NAME = gql`
  query searchStationByName($name: String!) {
    stations: searchStationByName(params: { name: $name }) {
      name: Name
      siteId: SiteId
    }
  }
`;

export const SEARCH_STATIONS_BY_COORDINATES = gql`
  query searchStationsByCoordinates($lon: Float!, $lat: Float!) {
    stations: searchStationsByCoordinates(params: { lon: $lon, lat: $lat }) {
      name
      siteId
      dist
    }
  }
`;

export const MY_FAVORITE_STATIONS = gql`
  query myFavoriteStations {
    myFavoriteStations {
      name
      siteId
    }
  }
`;

export const GET_DEPARTURES_BY_STATION_ID = gql`
  query getDeparturesByStationId($siteId: String!) {
    departures: getDeparturesByStationId(params: { siteId: $siteId }) {
      metros: Metros {
        displayTime: DisplayTime
        lineNumber: LineNumber
        destination: Destination
      }
      buses: Buses {
        displayTime: DisplayTime
        lineNumber: LineNumber
        destination: Destination
      }
      trains: Trains {
        displayTime: DisplayTime
        lineNumber: LineNumber
        destination: Destination
      }
    }
  }
`;

export const SAVE_STATION_AS_FAVORITE = gql`
  mutation saveStationAsFavorite($name: String!, $siteId: String!) {
    newFavoriteStation: saveStationAsFavorite(
      params: { name: $name, siteId: $siteId }
    ) {
      name: Name
      siteId: SiteId
    }
  }
`;

export const REMOVE_STATION_FROM_FAVORITES = gql`
  mutation removeStationFromFavorites($name: String!, $siteId: String!) {
    removedStation: removeStationFromFavorites(
      params: { name: $name, siteId: $siteId }
    ) {
      name: Name
      siteId: SiteId
    }
  }
`;
