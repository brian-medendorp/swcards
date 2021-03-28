import React from 'react';
import { connect } from 'react-redux';
import { extractId } from './../planet/planetSlice';
import loading from './loading.svg';
import styles from './Card.module.css';

class Card extends React.Component {

  render() {

    // Show loading indicator
    if(this.props.person.name === "Loading") {
      return (
        <article className={styles.loading}>
          <img src={loading} alt="Loading..." />
        </article>
      )
    }

    // get the homeworld from the planet store
    const planet = this.props.planets[extractId(this.props.person.homeworld)];
    const homeworld = planet ? planet.name : '';

    // Show person card
    return (
      <article className={styles.card}>
        <h1>{this.props.person.name}</h1>
        <div className={styles.attr}><label>Origin:</label> {homeworld}</div>
        <div className={styles.attr}><label>Height:</label> {this.props.person.height}</div>
        <div className={styles.attr}><label>Mass:</label> {this.props.person.mass}</div>
        <div className={styles.attr}><label>Birth date:</label> {this.props.person.birth_year}</div>
      </article>
    )
  }

}

const mapStateToProps = state => ({
  planets: state.planet.items
});

export default connect(mapStateToProps)(Card);
