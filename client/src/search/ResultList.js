import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover/Popover';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import { search } from './actions';

const ResultList = ({getGenesByNames, itemRender, loading}) => (
  loading ?
    <span>loading</span> :
    <List>
    {
      getGenesByNames ?
        getGenesByNames.edges.map((edge) => (
          <ListItem>{edge.node.public_name}</ListItem>
        )) :
        null
    }
    </List>
);

ResultList.propTypes = {
  getGenesByNames: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          public_name: PropTypes.string
        })
      })
    )
  }),
  loading: PropTypes.bool,
  //itemRender: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.search.loading,
  getGenesByNames: state.search.results.getGenesByNames
});

export default connect(mapStateToProps)(ResultList);
