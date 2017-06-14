import React from 'react';
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

const WBTable = (props) => {
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
        props.data.map((rowData, index) => {
          return (
            <TableRow key={index}>
            {
              Object.keys(rowData).map(
                (columnKey) => {
                  const columnConfig = (props.columns || []).filter((column) => (
                    column.key === columnKey
                  ))[0];
                  const CustomCell = columnConfig && columnConfig.render;
                  return CustomCell ?
                    <CustomCell key={columnKey} data={rowData} /> :
                    <TableRowColumn key={columnKey}
                      style={{whiteSpace: 'normal'}}>
                      <DefaultCell data={rowData[columnKey]} />
                    </TableRowColumn>
                }
              )
            }
            </TableRow>
          )
        })
      }
      </TableBody>
    </Table>
  );
};

WBTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    render: PropTypes.func,
    headerRender: PropTypes.func
  }))
};

export default WBTable;
