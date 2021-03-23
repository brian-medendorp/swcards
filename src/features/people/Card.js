import React from 'react';
import styles from './Card.module.css';

export function Card(props) {
  return (
    <article className={styles.card}>
      <h1>{props.person.name}</h1>
      <div className={styles.attr}><label>Origin:</label> {props.person.homeworld}</div>
      <div className={styles.attr}><label>Height:</label> {props.person.height}</div>
      <div className={styles.attr}><label>Mass:</label> {props.person.mass}</div>
      <div className={styles.attr}><label>Birth date:</label> {props.person.birth_year}</div>
    </article>
  )
}
