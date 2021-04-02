const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

// NOTE: copied this over from src/app/http.js because it won't import or require properly
const extractId = url => {
  // url should be of form: http://swapi.dev/api/planets/2/
  var tokens = String(url).split('/');
  return Number.parseInt(tokens[tokens.length-2]);
}

const injectId = obj => {
	obj.id = extractId(obj.url);
	return obj;
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Person {
		id: String,
		url: String,
	  name: String,
	  height: String,
	  mass: String,
	  birth_year: String,
	  homeworld: String,
	  origin: Planet
  }

  type Planet {
		id: String,
		url: String,
	  name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
		person(id: Int): Person,
		planet(id: Int): Planet,
		people(page: Int): [Person],
  }
`;

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getPerson(id) {
    return this.get(`people/${id}`).then(injectId);
  }

  async getPlanet(id) {
    return this.get(`planets/${id}`).then(injectId);
  }

  async getPeople(page = 1) {
		return this.get(`people/`, { page: page }).then(data => data.results.map(injectId));
  }
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
		person: async (_source, { id }, { dataSources }) => dataSources.starwarsAPI.getPerson(id),
		planet: async (_source, { id }, { dataSources }) => dataSources.starwarsAPI.getPlanet(id),
		people: async (_source, { page }, { dataSources }) => dataSources.starwarsAPI.getPeople(page)
  },
  Person: {
  	origin: async (_source, {  }, { dataSources }) => dataSources.starwarsAPI.getPlanet(extractId(_source.homeworld))
  }
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
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
