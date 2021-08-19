import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// mocks
import userInfo from '../_mocks_/userInfo.json';

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

const TOTAL = 714000;

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  { id: 'nationality', label: 'Nationality', alignRight: false },
  { id: 'contact', label: 'Contact', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false }
];

export default function AppClientInfo() {
  // {USERINFO.map(props => {
  return (
    <RootStyle>

      <Typography variant="h5" align="left" paddingLeft={2}>Client Info</Typography>
      <Table size="small" padding="checkbox">
    <TableRow>
        <TableCell variant="head">Name</TableCell>
        <TableCell>Cell 1</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Gender</TableCell>
        <TableCell>Cell 2</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Age</TableCell>
        <TableCell>Cell 2</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Nationality</TableCell>
        <TableCell>Cell 2</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Contact</TableCell>
        <TableCell>Cell 2</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Address</TableCell>
        <TableCell>Cell 2</TableCell>
    </TableRow>
</Table>

    </RootStyle>
  );
//})}
}
