import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {capitalize} from '../../components/utils';


const Expandable = (props) => (
  <Card>
    <CardHeader
      title="Table of Content"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
    {
      props.children
    }
    </CardText>
  </Card>
);

class PageNav extends Component {

  render() {
    return (
      <List>
      {
        this.props.widgets.map((widget) => {
          const widgetId = widget.id;
          const widgetName = capitalize(widgetId.replace(/_+/g, ' '));
          return (
            <ListItem
              key={widgetId}
              primaryText={widgetName}
              isKeyboardFocused={widgetId === this.props.activeWidget}
              onClick={() => this.props.onChange(`${this.props.baseUrl}/${widgetId}`)}
              style={{minWidth: 200}}
            />
          )
        })
      }
      </List>
    );
  }
}

PageNav.propTypes = {
  baseUrl: PropTypes.string,
  activeWidget: PropTypes.string,
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (toUrl) => {
      dispatch(push(toUrl))
    }
  };
};

const ConnectedPageNav = connect(null, mapDispatchToProps)(PageNav);

export default ConnectedPageNav;

export const ExpandablePageNav = (props) => (
  <Expandable>
    <ConnectedPageNav {...props}/>
  </Expandable>
);
