import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import WBTable, { WBTableRow } from './Table';
import {
  Table,
  TableBody
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StaticRouter } from 'react-router';


class ControlledTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      pageSize: 10,
      filterString: 'a',
      rowHtmls: []
    };
  }

  matchFilter = (rowIndex) => {
    if (this.state.rowHtmls.length > 0) {
      return this.state.rowHtmls[rowIndex].match(new RegExp(this.state.filterString));
    } else {
      // for initial render and render without DOM
      return true;
    }
  }

  updateRowHtml = (props) => {
    // super Hacks to get the rendered text of each row for text filter
    const rowHtmls = new Array((props.data || []).length);
    const domNode = document.createElement('div');
    ReactDOM.render(
      <StaticRouter context={{}}>
        <MuiThemeProvider>
          <Table>
            <TableBody>
              {
                (props.data || []).map(
                  (rowData, index) => {
                    return (
                      <WBTableRow
                        key={index}
                        ref={(rowNode) => rowHtmls[index] = (ReactDOM.findDOMNode(rowNode).innerHTML || '').replace(/<\/?[^>]+(>|$)/g, " ")}
                        data={rowData}
                        columns={props.columns} />
                    )
                  }
                )
              }
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </StaticRouter>,
      domNode
    );

    this.setState({
      rowHtmls: rowHtmls
    });
  }

  componentDidMount = () => {
    this.updateRowHtml(this.props);
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.props.data || nextProps.columns !== this.props.columns) {
      this.updateRowHtml(nextProps);
    }
  }

  render() {
    const {data, ...rest} = this.props;
    const {offset, pageSize} = this.state;
    const subsetData = (data || []).filter(
      (rowData, index) => this.matchFilter(index)
    ).slice(offset, pageSize);
    console.log(subsetData);
    return (
      <WBTable data={subsetData} {...rest}>
      </WBTable>
    );
  };
}

ControlledTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any)
};

export default ControlledTable;
