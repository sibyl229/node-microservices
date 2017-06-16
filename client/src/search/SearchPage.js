import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

class SearchPage extends Component {
  render() {
    const {getGenesByNames, loading} =  this.props;
    return (
      !loading && getGenesByNames ?
        <List  style={{zIndex: 9}}>
        {
            getGenesByNames.edges.map((edge) => (
              <ListItem
                key={edge.node.id}
                style={{
                  textAlign: 'left'
                }}>
                <h4>
                  <Link to={`/gene/${edge.node.id}`}>
                  {edge.node.public_name}
                  </Link>
                </h4>
                {edge.node.concise_description[0].text}
              </ListItem>
            ))
        }
        </List> :
        null
    );
  }
}

SearchPage.propTypes = {
  getGenesByNames: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          public_name: PropTypes.string,
          concise_description: PropTypes.shape({
            text: PropTypes.string
          })
        })
      })
    )
  }),
  loading: PropTypes.bool
};

SearchPage.fragment = `
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


const mapStateToProps = (state) => ({
  loading: state.search.full.loading,
  getGenesByNames: state.search.full.results.getGenesByNames
});


export default connect(mapStateToProps)(SearchPage);
