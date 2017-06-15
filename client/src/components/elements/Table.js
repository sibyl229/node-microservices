import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
    //console.log(ReactDOMServer.renderToStaticMarkup(<span>aaaR</span>))
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DefaultCell from './DefaultCell';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StaticRouter } from 'react-router';


class WBTableRow extends Component {
  render() {
    const props = this.props;
    return (
      <TableRow>
      {
        Object.keys(props.data).map(
          (columnKey) => {
            const columnConfig = (props.columns || []).filter((column) => (
              column.key === columnKey
            ))[0];
            const CustomCell = columnConfig && columnConfig.render;
            return CustomCell ?
              <CustomCell key={columnKey} data={props.data} /> :
              <TableRowColumn key={columnKey}
                style={{whiteSpace: 'normal'}}>
                <DefaultCell data={props.data[columnKey]} />
              </TableRowColumn>
          }
        )
      }
      </TableRow>
    )
  }
}

WBTableRow.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    render: PropTypes.func,
    headerRender: PropTypes.func
  }))
}

class WBTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterString: 'Transcripts',
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
    const rowsHtmls = (props.data || []).map(
      (rowData) => {
        const domNode = document.createElement('div');
        ReactDOM.render(
          <StaticRouter context={{}}>
            <MuiThemeProvider>
              <Table>
                <TableBody>
                  <WBTableRow data={rowData} columns={props.columns} />
                </TableBody>
              </Table>
            </MuiThemeProvider>
          </StaticRouter>,
          domNode
        );
        return (domNode.innerHTML || '').replace(/<\/?[^>]+(>|$)/g, " ");
      }
    );
    this.setState({
      rowHtmls: rowsHtmls
    });
  }

  componentDidMount = () => {
    this.updateRowHtml(this.props);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateRowHtml(nextProps);
  }

  render() {
    const props = this.props;


    //console.log();
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
          {
            Object.keys(props.data[0]).map(
              (columnKey) => {
                const columnConfig = (props.columns || []).filter((column) => (
                  column.key === columnKey
                ))[0];
                const CustomHeaderCell = columnConfig && columnConfig.headerRender;
                return CustomHeaderCell ?
                  <CustomHeaderCell key={columnKey} /> :
                  <TableHeaderColumn key={columnKey}>{columnKey}</TableHeaderColumn>
              }
            )
          }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
          props.data.filter(
            (rowData, index) => this.matchFilter(index)
          ).map(
            (rowData, index) => {
              return (
                <WBTableRow key={index} data={rowData} columns={props.columns} />
              )
            }
          )
        }
        </TableBody>
      </Table>
    );
  };
}

WBTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    render: PropTypes.func,
    headerRender: PropTypes.func
  }))
};

export default WBTable;
