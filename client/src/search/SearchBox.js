import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { search } from './actions';

const SearchBox = (props) => (
  <div>
    <TextField {...props}/>
  </div>
);

function formatQuery(queryString) {
  return `
    query {
      getGenesByNames(names: ["${queryString}"], after: "-1") {
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
      }
    }
  `
}

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, newValue) => dispatch(search(newValue, formatQuery, event.target))
});

export default connect(null, mapDispatchToProps)(SearchBox);
