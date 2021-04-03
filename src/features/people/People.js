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

export function People({ page }) {
	const { loading, error, data } = useQuery(GET_PEOPLE, {
		variables: { page }
	});

	// Error
	if (error) return <p>Error</p>;

	// Loading
  if (loading) {
  	return (
			<div>
	      <main className={styles.list}>
      		<Card key="loading" person={{name: "Loading"}} />
				</main>
			</div>
    );
  }

	// People
	const peopleList = data.people.map((person) =>
    <Card key={person.name} person={person}/>
  );

	// Display
  return (
    <div>
      <main className={styles.list}>{peopleList}</main>
    </div>
  )
}
