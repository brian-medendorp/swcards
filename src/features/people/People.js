import React from 'react';
import { Card } from './Card';
import styles from './People.module.css';
import { useQuery, gql } from '@apollo/client';

const GET_PEOPLE = gql`
	query People($page: Int!) {
		people(page: $page) {
			name,
			height,
			mass,
			birth_year,
			origin {
				name
			}
		}
	}
`;

export const People = props => {
	let page = 1;
	const { loading, error, data, fetchMore } = useQuery(GET_PEOPLE, {
		variables: {
			page: page
		},
		fetchPolicy: "cache-and-network"
	});

	const onLoadMore = () => {
		fetchMore({
			variables: {
				page: Math.floor(data.people.length / 10)+1
			},
			//updateQuery: (prev, { fetchMoreResult }) => {
			//	if (!fetchMoreResult || data.people.length % 10 > 0) return prev;
			//	return { people: [...prev.people, ...fetchMoreResult.people] };
			//}
		});
	}

  return (
    <div>
			<header>
				{error && <p>Error</p>}
				{!loading && !data && <p>No results found.</p>}
			</header>
      <main className={styles.list}>
				{!error && data && data.people.length && data.people.map((person) => <Card key={person.name} person={person}/>)}
				{loading && <Card key="loading" person={{name: "Loading"}} />}
			</main>
			<footer>
				{!data || (data && data.people.length % 10 == 0) && <button onClick={() => { onLoadMore() } } disabled={loading}>Load More</button>}
			</footer>
    </div>
  )
}
