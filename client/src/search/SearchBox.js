import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from './actions';
import AutoCompleteList from './AutoCompleteList';

const SearchBox = (props) => {
  const {onChange, ...restProps} = props;
  return (
    <div style={{
      position: 'relative',
      width: '80%',
      margin: '0 auto'
    }}>
      <TextField id="bb" onChange={onChange}/>
      <Paper style={{
        position: 'absolute',
        width: '100%'
      }}>
        <AutoCompleteList {...restProps}/>
      </Paper>
    </div>
  )
};


SearchBox.propTypes = {
  ...AutoCompleteList.propTypes,
  onChange: PropTypes.func.isRequired
};

function formatQuery(queryString) {
  return `
    query {
      getGenesByNames(names: ["${queryString}"], after: "-1") {
        ${AutoCompleteList.fragment}
      }
    }
  `
}

const mapStateToProps = (state) => ({
  loading: state.search.loading,
  getGenesByNames: state.search.results.getGenesByNames
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, newValue) => dispatch(search(newValue, formatQuery, event.target))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
