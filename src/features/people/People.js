import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './peopleSlice';
//import styles from './Counter.module.css';

class People extends React.Component {
  //constructor(props) {
  //  super(props);
  //  console.log('props:', props);
  //  this.state = {};
  //}

  componentDidMount() {
    console.log('props:', this.props);
    this.props.dispatch(fetchPeople());
    //fetchPeople();
    console.log('component mounted');
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }

}

//const mapStateToProps = state => ({
//  items: state.people.items,
//  loading: state.people.loading,
//  error: state.people.error
//});

export default connect()(People);
