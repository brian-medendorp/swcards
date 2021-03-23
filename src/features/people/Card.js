import React from 'react';
import styles from './Card.module.css';

export function Card(props) {
  return (
    <article className={styles.card}>
      <h1>{props.person.name}</h1>
      <div><label>Origin:</label> {props.person.homeworld}</div>
      <div><label>Height:</label> {props.person.height}</div>
      <div><label>Mass:</label> {props.person.mass}</div>
      <div><label>Birth date:</label> {props.person.birth_year}</div>
    </article>
  )
}
