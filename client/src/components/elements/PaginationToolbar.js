import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const PageNumberButton = (props) => {
  return (
    <FlatButton
      backgroundColor={props.active || props.activeIndex === props.index ? 'rgba(0, 0, 0, 0.1)' : 'inherit'}
      onClick={() => props.onPageSelect(props.index)}
      {...props}
    >
    {props.index + 1}
    </FlatButton>
  )
};

PageNumberButton.propTypes = {
  index: PropTypes.number,
  activeIndex: PropTypes.number,
  active: PropTypes.bool,
  onPageSelect: PropTypes.func
};


class PaginationToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    }
  }
  updateCurrentPage = (pageIndex) => {
    this.setState({
      offset: pageIndex * this.props.pageSize
    }, () => this.props.onPageChange(this.state.offset));
  }

  render() {
    const {count, pageSize} = this.props;
    const {offset} = this.state;
    const totalPages = Math.ceil(count / pageSize);
    const currentPage = Math.floor(offset / pageSize);
    if (totalPages > 5) {
      const middle = [currentPage -1, currentPage, currentPage + 1].filter(
        (pageIndex) => pageIndex > 0 && pageIndex < totalPages - 1
      );

      return (
        <div>
          <span>
          {
            `showing ${offset + 1} to ${Math.min(offset + pageSize, count)} of ${count} rows`
          }
          </span>
          <PageNumberButton onPageSelect={(pageIndex) => this.updateCurrentPage(pageIndex)} index={0} activeIndex={currentPage} />
          {
            middle[0] > 1 ? <FlatButton disabled={true}>...</FlatButton> : null
          }
          {
            middle.map((pageIndex) => (<PageNumberButton onPageSelect={(pageIndex) => this.updateCurrentPage(pageIndex)} index={pageIndex} activeIndex={currentPage} />))
          }
          {
            middle[middle.length -1] < totalPages -2 ? <FlatButton disabled={true}>...</FlatButton> : null
          }
          <PageNumberButton onPageSelect={(pageIndex) => this.updateCurrentPage(pageIndex)} index={totalPages - 1} activeIndex={currentPage} />
        </div>
      )
    } else {
      return (
        <div>
        {
          [0,1,2,3,4].slice(0, totalPages).map((pageIndex) => (
            <PageNumberButton onPageSelect={(pageIndex) => this.updateCurrentPage(pageIndex)} index={pageIndex} activeIndex={currentPage} />
          ))
        }
        </div>
      )
    }
  }
}

PaginationToolbar.propTypes = {
  pageSize: PropTypes.number,
  count: PropTypes.count,
  onPageChange: PropTypes.func
};

export default PaginationToolbar;
