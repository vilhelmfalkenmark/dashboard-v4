export default ({ model }) => ({
  Query: {
    // TEST
    test: (context, { params: { id } }) => model.test(id),
    /**
     * @function searchStationByName
     *
     */
    searchStationByName: (context, { params: { name } }) =>
      model.searchStationByName({ name }),
    /**
     * @function searchStationsByCoordinates
     *
     */
    searchStationsByCoordinates: (context, { params: { lon, lat } }) =>
      model.searchStationsByCoordinates({ lon, lat }),

    /**
     * @function getDeparturesByStationId
     *
     */
    getDeparturesByStationId: (context, { params: { siteId } }) =>
      model.getDeparturesByStationId({ siteId }),

    /**
     * @function myFavoriteStations
     */
    myFavoriteStations: context => model.myFavoriteStations()
  },
  Mutation: {
    /**
     * @function saveStationAsFavorite
     *
     */
    saveStationAsFavorite: (context, { params: { siteId, name } }) =>
      model.saveStationAsFavorite({ siteId, name }),
    /**
     * @function removeStationFromFavorites
     *
     */
    removeStationFromFavorites: (context, { params: { siteId, name } }) =>
      model.removeStationFromFavorites({ siteId, name })
  }
});
