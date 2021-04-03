import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
//import { offsetLimitPagination } from "@apollo/client/utilities";

// add the connection to the graphQL server
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					people: {
						keyArgs: false,
						merge(existing = [], incoming) {
							// special case to prevent duplicates on the last page -- probably a better way to do this
							if (existing.length % 10) return [...existing];
							return [...existing, ...incoming];
						},
					},
				},
			},
			Person: {
				keyFields: ["name"],
			},
			Planet: {
				keyFields: ["name"],
			}
		}
	})
});

ReactDOM.render(
  <React.StrictMode>
		<ApolloProvider client={client}>
    	<App />
		</ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
