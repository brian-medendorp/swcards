import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './peopleSlice';
import { fetchPlanets } from './../planet/planetSlice';
import Card from './Card';
import styles from './People.module.css';

class People extends React.Component {

  componentDidMount() {
    // kick off the data collection from the API
    this.props.dispatch(fetchPeople());
    this.props.dispatch(fetchPlanets());
  }

  render() {
    var loadingIndictor = '';
    if (this.props.loading) {
      loadingIndictor = (
        <Card key="loading" person={{name: "Loading"}} />
      );
    }
    const people = this.props.people;
    const peopleList = people.map((person) =>
      <Card key={person.name} person={person}/>
    );
    return (
      <div>
        <main className={styles.list}>{peopleList}{loadingIndictor}</main>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  people: state.people.items,
  loading: state.people.loading,
  error: state.people.error,
  planets: state.planet.items
});

export default connect(mapStateToProps)(People);
