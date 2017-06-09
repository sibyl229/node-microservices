import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover/Popover';
import { connect } from 'react-redux';
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
              <ListItem key={edge.node.id}>{edge.node.public_name}</ListItem>
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
      concise_description {
        text
      }
    }
  }
`;

export default AutoCompleteList;
