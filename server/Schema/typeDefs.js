const gql = String.raw;

const typeDefs = gql`
  scalar Upload

  type Comic {
    _id: ID!
    title: String!
    issueNumber: Int!       
    series: Series
    releaseDate: String
    coverVariant: String
    isIncentiveCover: Boolean
  }

  type PullList {          
    _id: ID!
    customer: Customer
    comics: [Comic]
    series: [Series]
  }

  type Series {
    _id: ID!
    name: String!
    writer: String
    comics: [Comic]
  }

  type Customer {
    _id: ID
    name: String
    email: String          
    phoneNumber: String
    pullList: PullList
  }

  type Query {
    comics: [Comic]
    comic(id: ID!): Comic
    pullLists: [PullList]   
    pullList(id: ID!): PullList
    allSeries: [Series]
    series(id: ID!): Series
    customers: [Customer]
    customer(id: ID!): Customer
  }

  type Mutation {
    createComic(
      title: String!, 
      issueNumber: Int!,     
      series: ID, 
      releaseDate: String, 
      coverVariant: String, 
      isIncentiveCover: Boolean
    ): Comic
    
    updateComic(id: ID!, title: String!): Comic
  }
`;

module.exports = typeDefs;
