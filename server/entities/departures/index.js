import Model from "./model";
import Resolvers from "./resolvers";

export default ({ connector, endpoints, database }) => {
  const model = Model({ connector, endpoints, database });

  return {
    resolvers: Resolvers({ model }),
    typeDefs: `type Person {
      id: Int!
      name: String
    }
    
    input personId {
      id: Int!
    }

    ##### TYPES #####
    type Departures {
      Metros: [Metro]
      Trains: [Train]
      Buses: [Bus]
    }

    type Metro {
      DisplayTime: String
      Destination: String
      LineNumber: String
      ExpectedDateTime: String
      TimeTabledDateTime: String
    }

    type Train {
      DisplayTime: String
      Destination: String
      LineNumber: String
      ExpectedDateTime: String
      TimeTabledDateTime: String
    }

    type Bus {
      DisplayTime: String
      Destination: String
      LineNumber: String
      ExpectedDateTime: String
      TimeTabledDateTime: String
    }

    type Station {
      Name: String
      SiteId: String
      Type: String
      X: String
      Y: String
    }

    type StationByCoordinate {
      idx: String
      name: String
      id: String
      siteId: String
      lat: String
      lon: String
      dist: String
    }
  
    type FavoriteStation {
      name: String
      siteId: String

    }

    ##### INPUT PARAMS ####

    input siteIdQuery {
      siteId: String
    }

    input stationNameQuery {
      name: String!
    }

    input stationCoordinateQuery {
      lon: Float!
      lat: Float!
    }

    input stationIdMutation {
      name: String!
      siteId: String!
    }

    extend type Mutation {
      saveStationAsFavorite(params: stationIdMutation): Station
      removeStationFromFavorites(params: stationIdMutation): Station
    }

    extend type Query {
      test(params: personId): Person
      searchStationByName(params: stationNameQuery): [Station]
      searchStationsByCoordinates(params: stationCoordinateQuery): [StationByCoordinate]
      getDeparturesByStationId(params: siteIdQuery): Departures
      myFavoriteStations: [FavoriteStation]
    }`
  };
};
