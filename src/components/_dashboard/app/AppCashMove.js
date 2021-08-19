// material
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Stack} from '@material-ui/core';
  import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// mocks
import CashMove from 'src/_mocks_/AppCashMove.json';

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

export default function AppCashMove() {
  return (
    <RootStyle>
      <Stack direction="row" spacing={2}>
        <Typography variant="h5" align="left" paddingLeft={2}>Cash Movement</Typography>
        <Button color="info" endIcon={<ArrowRightIcon />}>View More</Button>
      </Stack>
      <Table size="medium" padding="normal" key="i" >
        <TableHead>
          <TableRow>
            <TableCell>CCY</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Completion Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {CashMove.map((item, i) => (
    <TableRow>
        <TableCell align="left">{item.ccy}</TableCell>
        <TableCell align="right">{item.amount}</TableCell>
        <TableCell align="right">{item.completion}</TableCell>
    </TableRow>
        ))}
    </TableBody>
</Table>

    </RootStyle>
  );
}
