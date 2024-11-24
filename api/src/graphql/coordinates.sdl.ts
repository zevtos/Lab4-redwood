export const schema = gql`
  type Coordinate {
    id: Int!
    x: Float!
    y: Float!
    r: Float!
    hit: Boolean!
    createdAt: DateTime!
    user: User!
    userId: Int!
  }

  type Query {
    coordinates: [Coordinate!]! @requireAuth
    coordinate(id: Int!): Coordinate @requireAuth
  }

  input CreateCoordinateInput {
    x: Float!
    y: Float!
    r: Float!
    hit: Boolean!
    userId: Int!
  }

  input UpdateCoordinateInput {
    x: Float
    y: Float
    r: Float
    hit: Boolean
    userId: Int
  }

  input CheckPointInput {
    x: Float!
    y: Float!
    r: Float!
  }

  type Mutation {
    createCoordinate(input: CreateCoordinateInput!): Coordinate! @requireAuth
    updateCoordinate(id: Int!, input: UpdateCoordinateInput!): Coordinate!
      @requireAuth
    deleteCoordinate(id: Int!): Coordinate! @requireAuth
    checkPoint(input: CheckPointInput!): Coordinate! @requireAuth
  }
`
