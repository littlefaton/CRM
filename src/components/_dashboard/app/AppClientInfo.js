// material
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Table,
  TableRow,
  TableCell,
  Typography} from '@material-ui/core';
// mocks
import AppUserInfo from 'src/_mocks_/AppUserInfo.json';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'primary',
  textAlign: 'start',
  verticalAlign: 'top',
  padding: theme.spacing(2, 0),
  color: theme.palette.paper,
  backgroundColor: theme.palette.paper
}));

// ----------------------------------------------------------------------

export default function AppClientInfo() {
  return (
    <RootStyle>

      <Typography variant="h5" align="left" paddingLeft={2}>Client Info</Typography>
      {AppUserInfo.map((item, i) => (
      <Table size="small" padding="checkbox" key="i" >
    <TableRow>
        <TableCell variant="head">{item.header}</TableCell>
        <TableCell align="right">{item.content}</TableCell>
    </TableRow>
</Table>
    ))}

    </RootStyle>
  );
}
