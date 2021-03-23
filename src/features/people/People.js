import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './peopleSlice';
//import styles from './People.module.css';

class People extends React.Component {

  componentDidMount() {
    //console.log('props:', this.props);
    this.props.dispatch(fetchPeople());
    //console.log('component mounted');
  }

  render() {
    if (this.props.loading) {
      return (
        <div>Loading...</div>
      );
    }
    const people = this.props.items;
    const peopleList = people.map((person) =>
      <div>{person.name}</div>
    );
    return (
      <div>{peopleList}</div>
    )
  }

}

const mapStateToProps = state => ({
  items: state.people.items,
  loading: state.people.loading,
  error: state.people.error
});

export default connect(mapStateToProps)(People);
