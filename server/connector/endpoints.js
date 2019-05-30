export default {
  sl: {
    searchStationByName: stationNameQuery =>
      `http://api.sl.se/api2/typeahead.json?key=e1a91d0e65ab4ffbbc3fbd7425677d8c&searchstring=${stationNameQuery.replace(
        /\s/g,
        "%20"
      )}&stationsonly=true`,
    searchStationsByCoordinates: ({ lon, lat }) =>
      `http://api.sl.se/api2/nearbystops.json?key=89ba22155d944429b9b90feb2f3d3645&originCoordLat=${lat}&originCoordLong=${lon}`,
    getDeparturesByStationId: siteId =>
      `http://api.sl.se/api2/realtimedeparturesv4.json?key=152b19caf669418c88b48ce2c2ba0cee&siteid=${siteId}&timewindow=30`
  }
};
