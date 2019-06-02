import { view, lensPath } from 'ramda';

export default ({ connector, endpoints, dbConnection }) => {
  /**
  |--------------------------------------------------
  |  @function searchStationByName
  |--------------------------------------------------
  */
  const searchStationByName = ({ name }) =>
    connector
      .getRequest({ path: endpoints.searchStationByName(name) })
      .then(response => {
        return view(lensPath(['ResponseData']), response);
      });

  /**
  |--------------------------------------------------
  |  @function searchStationsByCoordinates
  |--------------------------------------------------
  */
  const searchStationsByCoordinates = ({ lon, lat }) =>
    connector
      .getRequest({
        path: endpoints.searchStationsByCoordinates({ lon, lat })
      })
      .then(response => {
        const stations = view(
          lensPath(['LocationList', 'StopLocation']),
          response
        );

        return stations.map(station =>
          Object.assign({}, station, {
            siteId: station.id.slice(5)
          })
        );
      });

  /**
  |--------------------------------------------------
  |  @function getDeparturesByStationId
  |--------------------------------------------------
  */
  const getDeparturesByStationId = ({ siteId, timeWindow }) =>
    connector
      .getRequest({
        path: endpoints.getDeparturesByStationId(siteId, timeWindow)
      })
      .then(response => view(lensPath(['ResponseData']), response));

  /**
  |--------------------------------------------------
  |  @function myFavoriteStations
  |--------------------------------------------------
  */
  const myFavoriteStations = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query(`SELECT * FROM stations`, (err, rows) => {
        try {
          return resolve(rows);
        } catch (error) {
          return reject({ error: error });
        }
      });
    });
  };

  /**
  |--------------------------------------------------
  |  @function saveStationAsFavorite
  |--------------------------------------------------
  */
  const saveStationAsFavorite = ({ siteId, name }) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO stations (siteId, name) VALUES ("${siteId}", "${name}")`,
        (err, rows) => {
          try {
            return resolve({ SiteId: siteId, Name: name });
          } catch (error) {
            return reject({ error: error });
          }
        }
      );
    });
  };

  /**
  |--------------------------------------------------
  |  @function removeStationFromFavorites
  |--------------------------------------------------
  */
  const removeStationFromFavorites = ({ siteId, name }) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `DELETE FROM stations WHERE siteId=${siteId}`,
        (err, rows) => {
          try {
            return resolve({ SiteId: siteId, Name: name });
          } catch (error) {
            return reject({ error: error });
          }
        }
      );
    });
  };

  return {
    searchStationByName,
    searchStationsByCoordinates,
    getDeparturesByStationId,
    myFavoriteStations,
    saveStationAsFavorite,
    removeStationFromFavorites
  };
};
