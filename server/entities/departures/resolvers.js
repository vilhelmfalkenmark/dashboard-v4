export default ({ model }) => ({
  /**
  |--------------------------------------------------
  | Querys
  |--------------------------------------------------
  */
  Query: {
    searchStationByName: (_, { params: { name } }) =>
      model.searchStationByName({ name }),

    searchStationsByCoordinates: (_, { params: { lon, lat } }) =>
      model.searchStationsByCoordinates({ lon, lat }),

    getDeparturesByStationId: (_, { params: { siteId, timeWindow } }) =>
      model.getDeparturesByStationId({ siteId, timeWindow }),

    myFavoriteStations: _ => model.myFavoriteStations()
  },
  /**
  |--------------------------------------------------
  | Mutations
  |--------------------------------------------------
  */
  Mutation: {
    saveStationAsFavorite: (_, { params: { siteId, name } }) =>
      model.saveStationAsFavorite({ siteId, name }),

    removeStationFromFavorites: (_, { params: { siteId, name } }) =>
      model.removeStationFromFavorites({ siteId, name })
  }
});
