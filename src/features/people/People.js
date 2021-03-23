import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './peopleSlice';
import { Card } from './Card';
import styles from './People.module.css';

class People extends React.Component {

  componentDidMount() {
    //console.log('props:', this.props);
    this.props.dispatch(fetchPeople());
    //console.log('component mounted');
  }

  render() {
    var loadingIndictor = '';
    if (this.props.loading) {
      loadingIndictor = (
        <Card key="loading" person={{name: "Loading"}} />
      );
    }
    const people = this.props.items;
    const peopleList = people.map((person) =>
      <Card key={person.name} person={person} />
    );
    return (
      <div>
        <main className={styles.list}>{peopleList}{loadingIndictor}</main>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  items: state.people.items,
  loading: state.people.loading,
  error: state.people.error
});

export default connect(mapStateToProps)(People);
