import React, {Component} from 'react';
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
};

class WBTable extends Component {

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
          props.data.map(
            (rowData, index) => {
              return (
                <WBTableRow
                  key={index}
                  data={rowData}
                  columns={props.columns} />
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
  })),
  filterString: PropTypes.string
};



export default WBTable;
export {
  WBTableRow
};
