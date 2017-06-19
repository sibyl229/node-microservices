import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { postBookmark } from './actions';


const BookmarkButton = (props) => {
  return (
    <IconButton
      onClick={props.onClick}
      iconClassName="material-icons"
      tooltip="Save bookmark"
      tooltipPosition="bottom-right"
      tooltipStyles={{
        fontSize: 12
      }}
      color="red"
    >
      bookmark_border
    </IconButton>
  );
}

BookmarkButton.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  jwt: PropTypes.string
};

const mapStateToProps = (state) => ({
  jwt: state.user.jwt
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => console.log('aaaa') || dispatch(postBookmark(ownProps.url, ownProps.jwt))
});



export default connect(mapStateToProps, mapDispatchToProps)(BookmarkButton);
