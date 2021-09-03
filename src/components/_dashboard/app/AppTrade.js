// material
import { styled } from '@material-ui/core/styles';
import { sentenceCase } from 'change-case';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Stack,} from '@material-ui/core';
  import Label from 'src/components/Label';
  import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// mocks
import Trade from 'src/_mocks_/AppTrade.json';

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

export default function AppTrade() {
  return (
    <RootStyle>
      <Stack direction="row" spacing={2}>
        <Typography variant="h5" align="left" paddingLeft={2}>Trade</Typography>
        <Button color="info" endIcon={<ArrowRightIcon />}>View More</Button>
      </Stack>
      <Table size="small" padding="normal" key="i" >
        <TableHead>
          <TableRow>
            <TableCell>Market</TableCell>
            <TableCell align="right">Stock No.</TableCell>
            <TableCell align="right">Buy/Sell</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Trade.map((item, i) => (
    <TableRow>
        <TableCell align="left">{item.market}</TableCell>
        <TableCell align="right">{item.stockNo}</TableCell>
        <TableCell align="right">
            <Label
              variant="ghost"
              color={(item.buySell === 'sell' && 'warning') || 'info'}
            >
            {sentenceCase(item.buySell)}
            </Label>
        </TableCell>
        <TableCell align="right">{item.amount}</TableCell>
    </TableRow>
        ))}
    </TableBody>
</Table>

    </RootStyle>
  );
}
