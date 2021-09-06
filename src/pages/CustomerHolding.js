import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { makeStyles } from '@material-ui/styles';
import { useTheme, styled } from '@material-ui/core/styles';
import { Stack, Typography, Container } from '@material-ui/core';
// utils
import { fNumber } from '../utils/formatNumber';
//
import { BaseOptionChart } from '../components/charts';
import Page from '../components/Page';
//mocks
import HOLDINGDATA from 'src/_mocks_/holdingData.json';

//-----------------------------------------------------------

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import React from 'react';
// material
import {
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user.json';

//-----------------------------------------------------------------------

import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 90;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(-1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    top: `calc(${(CHART_HEIGHT - LEGEND_HEIGHT)/3}px) !important`
  }
}));

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const CHART_DATA = [4344, 5435, 1443, 4443];

// filter ----------------------------------------------------------------------
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'market', label: 'Market', alignRight: false },
  { id: 'code', label: 'Instrument Code', alignRight: false },
  { id: 'name', label: 'Instrument Name', alignRight: false },
  { id: 'chinName', label: 'Instrument Chinese Name', alignRight: false },
  { id: 'cost', label: 'Cost', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'price', label: 'Market Price', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomerHolding() {

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - HOLDINGDATA.length) : 0;

  const filteredUsers = applySortFilter(HOLDINGDATA, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  const theme = useTheme();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.primary.main,
    ],
    labels: ['HKG', 'USA', 'SZA', 'Others'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center', position: 'left' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Page title="Customer Holding">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customer Holding
          </Typography>
        </Stack>

        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={350}/>
        </ChartWrapperStyle>

        <Card>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Stack>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={HOLDINGDATA.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, market, code, name, chinName, cost, quantity, price } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          alignItems= "center"
                          style={{ textDecoration: 'none' }}
                        >
                          <TableCell align="left">{market}</TableCell>
                          <TableCell align="left">{code}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{chinName}</TableCell>
                          <TableCell align="left">{cost}</TableCell>
                          <TableCell align="left">{quantity}</TableCell>
                          <TableCell align="left">{price}</TableCell>

                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={HOLDINGDATA.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

    </Container>
    </Page>
  );
}