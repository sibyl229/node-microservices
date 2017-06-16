import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover/Popover';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { search } from './actions';

class AutoCompleteList extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     targetElement: null
  //   };
  // }
  // componentDidMount() {
  //   this.setState({
  //     targetElement: document.getElementById('aaa')
  //   });
  // }
  //
  // componentDidUpdate() {
  //   this.setState({
  //     targetElement: document.getElementById('aaa')
  //   });
  // }

  render() {
    const {getGenesByNames, itemRender, loading} =  this.props;
    return (
      !loading && getGenesByNames ?
        <List>
        {
            getGenesByNames.edges.map((edge) => (
              <Link key={edge.node.id} style={{color: 'black'}} to={`/gene/${edge.node.id}`}>
                <ListItem onClick={this.props.onSelect}>
                {edge.node.public_name}
                </ListItem>
              </Link>
            ))
        }
        </List> :
        null
    );
  }
}


AutoCompleteList.propTypes = {
  getGenesByNames: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          public_name: PropTypes.string
        })
      })
    )
  }),
  loading: PropTypes.bool,
  onSelect: PropTypes.func
//  targetElementId: PropTypes.string.isRequired
  //itemRender: PropTypes.func.isRequired
};

AutoCompleteList.fragment = `
hasNextPage
endCursor
  edges {
    cursor
    node {
      id
      public_name
    }
  }
`;

export default AutoCompleteList;
