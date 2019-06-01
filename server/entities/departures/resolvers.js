export default ({ model }) => ({
  /**
  |--------------------------------------------------
  | Querys
  |--------------------------------------------------
  */
  Query: {
    searchStationByName: (context, { params: { name } }) =>
      model.searchStationByName({ name }),

    searchStationsByCoordinates: (context, { params: { lon, lat } }) =>
      model.searchStationsByCoordinates({ lon, lat }),

    getDeparturesByStationId: (context, { params: { siteId } }) =>
      model.getDeparturesByStationId({ siteId }),

    myFavoriteStations: context => model.myFavoriteStations()
  },
  /**
  |--------------------------------------------------
  | Mutations
  |--------------------------------------------------
  */
  Mutation: {
    saveStationAsFavorite: (context, { params: { siteId, name } }) =>
      model.saveStationAsFavorite({ siteId, name }),

    removeStationFromFavorites: (context, { params: { siteId, name } }) =>
      model.removeStationFromFavorites({ siteId, name })
  }
});
