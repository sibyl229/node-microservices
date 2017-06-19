import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { amberA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { postBookmark, getBookmarkByUrl } from './actions';



class BookmarkButton extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetch();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.props.onFetch();
    }
  }

  render() {
    const props = this.props;
    return (
      <IconButton
        onClick={props.onClick}
        iconClassName="material-icons"
        tooltip="Save bookmark"
        tooltipPosition="bottom-right"
        tooltipStyles={{
          fontSize: 12
        }}
        iconStyle={{
          color: props.bookmarked ? amberA400 : "black"
        }}
      >
        bookmark_border
      </IconButton>
    );
  }
}

BookmarkButton.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onFetch: PropTypes.func,
  bookmarked: PropTypes.bool,
  jwt: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  jwt: state.user.jwt,
  bookmarked: state.user.bookmarks.filter(
    (bookmark) => bookmark.url === ownProps.url
  ).length > 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(postBookmark(ownProps.url, ownProps.jwt))
  },
  onFetch: () => {
    if (ownProps.jwt) {
      dispatch(getBookmarkByUrl(ownProps.url, ownProps.jwt, {ignoreError: true}))
    }
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(BookmarkButton);
