import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './peopleSlice';
import { fetchPlanets, selectPlanet, extractId } from './../planet/planetSlice';
import { Card } from './Card';
import styles from './People.module.css';

class People extends React.Component {

  componentDidMount() {
    //console.log('props:', this.props);
    this.props.dispatch(fetchPeople());
    this.props.dispatch(fetchPlanets());
    //console.log('component mounted');
  }

  render() {
    var loadingIndictor = '';
    if (this.props.loading) {
      loadingIndictor = (
        <Card key="loading" person={{name: "Loading"}} />
      );
    }
    const people = this.props.people;
    const planets = this.props.planets;
    //console.log('planets: ', JSON.stringify(planets));
    const peopleList = people.map((person) => {
      //console.log('person: ', person);
      const planet = planets[extractId(person.homeworld)]; // NOTE: ideally, we'd want to handle this inside Card
      //console.log('planet:', planet);
      return <Card key={person.name} person={person} homeworld={planet}/>
    });
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
