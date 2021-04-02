const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Person {
	  name: String,
	  height: String,
	  mass: String,
	  birth_year: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book],
	person(id: Int): Person
  }
`;

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getPerson(id) {
    return this.get(`people/${id}`);
  }

//  async getMostViewedMovies(limit = 10) {
//    const data = await this.get('movies', {
//      per_page: limit,
//      order_by: 'most_viewed',
//    });
//    return data.results;
//  }
}

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
	person: async (_source, { id }, { dataSources }) => {
  	  return dataSources.starwarsAPI.getPerson(id);
    }
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => {
		return {
			starwarsAPI: new StarWarsAPI()
		};
	},
	context: () => {
		return {
			token: 'foo',
		};
	},
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
