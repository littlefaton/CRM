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
import IPO from 'src/_mocks_/AppIPO.json';

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
        <Typography variant="h5" align="left" paddingLeft={2}>IPO Application</Typography>
        <Button color="info" endIcon={<ArrowRightIcon />}>View More</Button>
      </Stack>
      <Table size="small" padding="normal" key="i" >
        <TableHead>
          <TableRow>
            <TableCell>Market</TableCell>
            <TableCell align="right">StockNo.</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="left">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {IPO.map((item, i) => (
    <TableRow>
        <TableCell align="left">{item.market}</TableCell>
        <TableCell align="right">{item.stockNo}</TableCell>
        <TableCell align="right" style={{color: 'blue'}}>{item.qty}</TableCell>
        <TableCell align="left" style={{color: 'darkkhaki'}}>{item.price}</TableCell>
    </TableRow>
        ))}
    </TableBody>
</Table>

    </RootStyle>
  );
}
