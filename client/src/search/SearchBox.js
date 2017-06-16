import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, suggest } from './actions';
import AutoCompleteList from './AutoCompleteList';
import SearchPage from './SearchPage';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    }, () => {
      this.props.onChange(event, newValue);
    })
  }

  handleSubmit = (event) => {
    this.props.onSubmit(event, this.state.value);
    this.props.onChange(event, '');
    // this.setState({
    //   value: ''
    // });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  render () {
    const {onChange, onSubmit, ...restProps} = this.props;
    return (
      <div style={{
        position: 'relative',
        width: '80%',
        margin: '0 auto',
        zIndex: 10
      }}>
        <TextField
          value={this.state.value}
          floatingLabelText={'Search for a gene'}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress} />
        <RaisedButton
          label="Search"
          onClick={this.handleSubmit} />
        <Paper style={{
          position: 'absolute',
          width: '100%'
        }}>
          <AutoCompleteList
            onSelect={(event) => this.props.onChange(event, '')}
            {...restProps} />
        </Paper>
      </div>
    )
  };
}


SearchBox.propTypes = {
  ...AutoCompleteList.propTypes,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function formatSuggestQuery(queryString) {
  return `
    query {
      getGenesByNames(names: ["${queryString}"], after: "-1") {
        ${AutoCompleteList.fragment}
      }
    }
  `
}

function formatFullQuery(queryString) {
  return `
    query {
      getGenesByNames(names: ["${queryString}"], after: "-1") {
        ${SearchPage.fragment}
      }
    }
  `
}

const mapStateToProps = (state) => ({
  loading: state.search.suggest.loading,
  getGenesByNames: state.search.suggest.results.getGenesByNames
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, newValue) => dispatch(suggest(newValue, formatSuggestQuery, event.target)),
  onSubmit: (event, newValue) => dispatch(search(newValue, formatFullQuery, event.target)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
