// material
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Table,
  TableRow,
  TableCell,
  Typography,
  Button,
  Stack} from '@material-ui/core';
  import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// mocks
import FinInfo from 'src/_mocks_/AppFinInfo.json';

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

export default function AppFinancialInfo() {
  return (
    <RootStyle>
      <Stack direction="row" spacing={2}>
        <Typography variant="h5" align="left" paddingLeft={2}>Financial Info</Typography>
        <Button color="info" endIcon={<ArrowRightIcon />}>View More</Button>
      </Stack>
      {FinInfo.map((item, i) => (
      <Table size="small" padding="normal" key="i" >
    <TableRow>
        <TableCell variant="head">{item.header}</TableCell>
        <TableCell align="right">{item.content}</TableCell>
    </TableRow>
</Table>
    ))}

    </RootStyle>
  );
}
