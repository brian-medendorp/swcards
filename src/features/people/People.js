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
	const { loading, error, data, fetchMore } = useQuery(GET_PEOPLE, {
		variables: {
			page: props.page
		},
		fetchPolicy: "cache-and-network"
	});

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
    </div>
  )
}
