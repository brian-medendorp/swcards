import React from 'react';
import loading from './loading.svg';
import styles from './Card.module.css';

export function Card(props) {

  // Show loading indicator
  if(props.person.name === "Loading") {
    return (
      <article className={styles.loading}>
        <img src={loading} alt="Loading..." />
      </article>
    )
  }

  // Show person card
  return (
    <article className={styles.card}>
      <h1>{props.person.name}</h1>
      <div className={styles.attr}><label>Origin:</label> {props.person.origin.name}</div>
      <div className={styles.attr}><label>Height:</label> {props.person.height}</div>
      <div className={styles.attr}><label>Mass:</label> {props.person.mass}</div>
      <div className={styles.attr}><label>Birth date:</label> {props.person.birth_year}</div>
    </article>
  )

}
