import { view, lensPath } from 'ramda';

const DB_STATION_MODEL = {
  siteId: '',
  name: '',
  _id: null
};

const FAVORITE_STATIONS_COLLECTION = 'favorite_stations';

// const lowerCaseObjectKeys = object => {
//   return Object.keys(object).reduce((accum, key) => {
//     accum[`${key.charAt(0).toLowerCase()}${key.slice(1)}`] = object[key];
//     return accum;
//   }, {});
// };

export default ({ connector, endpoints, database }) => {
  const test = ({ token }) => ({ name: 'Ville', id: 4 });
  /**
   * @function searchStationByName
   * @param {String} name
   */

  //////////////////////////////////////////////////
  /**
   * SEARCH STATION BY NAME FROM TRAFIC-LAB API
   */
  //////////////////////////////////////////////////
  const searchStationByName = ({ name }) =>
    connector
      .getRequest({ path: endpoints.searchStationByName(name) })
      .then(response => view(lensPath(['ResponseData']), response));

  //////////////////////////////////////////////////
  /**
   * SEARCH STATION(S) BY COORDINATES FROM TRAFIC-LAB API
   */
  //////////////////////////////////////////////////
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

  //////////////////////////////////////////////////
  /**
   * GET DEPARTURES BY SITE ID FROM TRAFIC-LAB API
   */
  //////////////////////////////////////////////////
  const getDeparturesByStationId = ({ siteId }) =>
    connector
      .getRequest({ path: endpoints.getDeparturesByStationId(siteId) })
      .then(response => view(lensPath(['ResponseData']), response));

  //////////////////////////////////////////////////
  /**
   * GET ALL FAVORITE STATIONS FROM MONGO DB
   */
  //////////////////////////////////////////////////
  const myFavoriteStations = () => {
    return new Promise((resolve, reject) => {
      database
        .collection(FAVORITE_STATIONS_COLLECTION)
        .find({})
        .toArray(function(err, data) {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        });
    });
  };

  //////////////////////////////////////////////////
  /**
   * ADD FAVORITE STATION TO MONGODB
   */
  //////////////////////////////////////////////////
  const saveStationAsFavorite = ({ siteId, name }) => {
    const newStation = Object.assign({}, DB_STATION_MODEL, {
      siteId,
      name
    });

    return new Promise((resolve, reject) => {
      database
        .collection(FAVORITE_STATIONS_COLLECTION)
        .insertOne(newStation, (err, doc) => {
          if (err) {
            return reject(err);
          }
          // const returnStatement = view(lensIndex(0), doc.ops);
          // return resolve(returnStatement);
          return resolve({ SiteId: siteId, Name: name }); // <-- Respond with the original data if succesful
        });
    });
  };
  //////////////////////////////////////////////////
  /**
   * REMOVE FAVORITE STATION TO MONGODB
   */
  //////////////////////////////////////////////////
  const removeStationFromFavorites = ({ siteId, name }) => {
    return new Promise((resolve, reject) => {
      database.collection(FAVORITE_STATIONS_COLLECTION).remove(
        {
          siteId: siteId
        },
        (err, doc) => {
          if (err) {
            return reject(err);
          }
          return resolve({ SiteId: siteId, Name: name }); // <-- Respond with the original data if succesful
        }
      );
    });
  };

  return {
    test,
    searchStationByName,
    searchStationsByCoordinates,
    getDeparturesByStationId,
    saveStationAsFavorite,
    removeStationFromFavorites,
    myFavoriteStations
  };
};
