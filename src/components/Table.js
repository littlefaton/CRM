import React from "react";
import {makeStyles} from "@material-ui/styles";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export const Table = ({
  headerMarker = "headers",
  emptyMessage = "No data",
  data,
  formatDataCells,
  formatHeaderCells,
  headerCellOptions = () => ({}),
  dataCellOptions = () => ({})
}) => {
  const classes = useStyles();

  const headersRow = data.filter((r) => r[headerMarker] === true)[0];
  const headers = Object.keys(headersRow).filter((c) => c !== headerMarker);
  const dataRows = data.filter((r) => !r[headerMarker]);

  const getDataRowKeys = (row) =>
    Object.keys(row).filter((c) => c !== headerMarker);

  return (
    <TableContainer>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow>
            {headers.map((c) => {
              return (
                <TableCell
                  key={JSON.stringify(headersRow[c])}
                  {...headerCellOptions(headersRow[c])}
                >
                  {formatHeaderCells(headersRow[c])}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row) => (
            <TableRow key={JSON.stringify(row)}>
              {getDataRowKeys(row).map((cell, i) => {
                return (
                  <TableCell
                    {...(i === 0 && {component: "th", scope: "row"})}
                    key={cell}
                    {...dataCellOptions(row[cell])}
                  >
                    {formatDataCells(row[cell])}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        {dataRows.length === 0 && (
          <TableFooter>
            <Typography>{emptyMessage}</Typography>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
};