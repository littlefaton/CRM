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
import HOLDINGDATA from 'src/_mocks_/holdingData.json'

import React, {useEffect, useState} from "react";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import MuiButton from "@material-ui/core/Button";

import {Table} from "src/components/Table";

import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import {spacing} from "@material-ui/system";


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

// Table ----------------------------------------------------------------------

const Button = styled(MuiButton)(spacing);

const getMax = (data, field) => {
  return Math.max(...data.map((row) => row[field]));
};

const getMin = (data, field) => {
  return Math.min(...data.map((row) => row[field]));
};

const Range = ({
  value,
  setter,
  field,
  onChange,
  max,
  min,
  label,
  valueLabelFormatter
}) => (
  <>
    <Typography id={`${field}-range-slider`} gutterBottom>
      {label}: {value[0]} - {value[1]}
    </Typography>
    <Slider
      value={value}
      onChange={(e, v) => {
        setter(v);
        if (onChange) onChange(e);
      }}
      valueLabelDisplay="auto"
      aria-labelledby={`${field}-range-slider`}
      max={max}
      min={min}
      getAriaValueText={valueLabelFormatter}
    />
  </>
);

const Dropdown = ({id, value, onChange, label, options}) => {
  const forwardID = id ?? `${JSON.stringify(options)}-select`;
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id={`${forwardID}-label`}>{label}</InputLabel>
      <Select
        labelId={`${forwardID}-label`}
        fullWidth
        multiple
        id={forwardID}
        value={value}
        onChange={onChange}
        label={label}
        variant="filled"
      >
        {options.map((option) => {
          const {label: optionLabel, value} = option;
          return (
            <MenuItem key={value} value={value}>
              {optionLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const categories = {
  iceCream: {
    name: "ice cream",
    class: "blue"
  },
  doughnut: {
    name: "doughnut",
    class: "pink"
  },
  cake: {
    name: "cake",
    class: "green"
  },
  cookie: {
    name: "cookie",
    class: "purple"
  }
};

function createData(name, calories, fat, carbs, protein, category, headers) {
  return {name, calories, fat, carbs, protein, category, headers};
}

const rows = [
  createData(
    {label: "Name"},
    {label: "Calories", numeric: true},
    {label: "Fat (g)", numeric: true},
    {label: "Carbs (g)", numeric: true},
    {label: "Protein (g)", numeric: true},
    {label: "Category"},
    true
  ),
  createData("Frozen yogurt", 159, 6.0, 24, 4.0, categories.iceCream),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, categories.iceCream),
  createData("Eclair", 262, 16.0, 24, 6.0, categories.doughnut),
  createData("Cupcake", 305, 3.7, 67, 4.3, categories.cake),
  createData("Gingerbread", 356, 16.0, 49, 3.9, categories.cookie)
];

const tupleEquals = (a, b) => a[0] === b[0] && a[1] === b[1];

const dataRows = rows.filter((r) => r.headers !== true);

const categoryOptions = Array.from(
  new Set(dataRows.map((r) => r.category.name))
).map((c) => ({label: c, value: c}));

const maxCalories = getMax(dataRows, "calories");
const minCalories = getMin(dataRows, "calories");
const maxCarbs = getMax(dataRows, "carbs");
const minCarbs = getMin(dataRows, "carbs");
const maxFat = getMax(dataRows, "fat");
const minFat = getMin(dataRows, "fat");
const maxProtein = getMax(dataRows, "protein");
const minProtein = getMin(dataRows, "protein");

const initialName = "";
const initialCalories = [minCalories, maxCalories];
const initialFat = [minFat, maxFat];
const initialCarbs = [minCarbs, maxCarbs];
const initialProtein = [minProtein, maxProtein];

// Chart ----------------------------------------------------

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  blue: {
    background: "#caeff7"
  },
  pink: {
    background: "#fce0e7"
  },
  green: {
    background: "#d9fce4"
  },
  purple: {
    background: "#f3edff"
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
});

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function Cash() {

  const classes = useStyles();
  const [data, setData] = useState(rows);

  const [showFilters, setShowFilters] = useState(false);

  const [filterName, setFilterName] = useState(initialName);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterCalories, setFilterCalories] = useState(initialCalories);
  const [filterFat, setFilterFat] = useState(initialFat);
  const [filterCarbs, setFilterCarbs] = useState(initialCarbs);
  const [filterProtein, setFilterProtein] = useState(initialProtein);

  const [appliedFilters, setAppliedFilters] = useState([]);

  const addAppliedFilter = (filter) =>
    setAppliedFilters((current) => {
      if (current.includes(filter)) return current;
      return [...current, filter];
    });

  const removeAppliedFilter = (filter) =>
    setAppliedFilters((current) => current.filter((e) => e !== filter));

  const filtersCount = appliedFilters.length;

  const toggleShowFilters = () => setShowFilters((s) => !s);
  const resetFilters = () => {
    setAppliedFilters([]);
    setData(rows);
    setFilterName(initialName);
    setFilterCategories([]);
    setFilterCalories(initialCalories);
    setFilterFat(initialFat);
    setFilterCarbs(initialCarbs);
    setFilterProtein(initialProtein);
  };

  useEffect(() => {
    const updatedRows = rows
      .filter((r) => {
        if (r.headers) return true;
        if (initialName !== filterName) {
          addAppliedFilter("name");
          try {
            const filterNameRegEx = new RegExp(filterName, "gi");
            return r.name.match(filterNameRegEx);
          } catch {
            return r.name.indexOf(filterName) !== -1;
          }
        }
        removeAppliedFilter("name");
        return true;
      })
      .filter((r) => {
        if (r.headers) return true;
        if (filterCategories.length > 0) {
          addAppliedFilter("category");
          return filterCategories.includes(r.category.name);
        }
        removeAppliedFilter("category");
        return true;
      })
      .filter((r) => {
        if (r.headers) return true;
        if (!tupleEquals(initialCalories, filterCalories)) {
          addAppliedFilter("calories");
          const [min, max] = filterCalories;
          return r.calories >= min && r.calories <= max;
        }
        removeAppliedFilter("calories");
        return true;
      })
      .filter((r) => {
        if (r.headers) return true;
        if (!tupleEquals(initialFat, filterFat)) {
          addAppliedFilter("fat");
          const [min, max] = filterFat;
          return r.fat >= min && r.fat <= max;
        }
        removeAppliedFilter("fat");
        return true;
      })
      .filter((r) => {
        if (r.headers) return true;
        if (!tupleEquals(initialCarbs, filterCarbs)) {
          addAppliedFilter("carbs");
          const [min, max] = filterCarbs;
          return r.carbs >= min && r.carbs <= max;
        }
        removeAppliedFilter("carbs");
        return true;
      })
      .filter((r) => {
        if (r.headers) return true;
        if (!tupleEquals(initialProtein, filterProtein)) {
          addAppliedFilter("protein");
          const [min, max] = filterProtein;
          return r.protein >= min && r.protein <= max;
        }
        removeAppliedFilter("protein");
        return true;
      });
    setData(updatedRows);
  }, [
    filterCalories,
    filterCategories,
    filterCarbs,
    filterFat,
    filterName,
    filterProtein
  ]);


  const theme = useTheme();
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
        <Box m={2}>
      <Button
        onClick={toggleShowFilters}
        variant="contained"
        disableElevation
        endIcon={showFilters ? <ArrowDropUp /> : <ArrowDropDown />}
      >
        {showFilters ? "Hide filters" : "Filter"}
        {filtersCount > 0 ? ` (${filtersCount})` : ""}
      </Button>
      {filtersCount > 0 && (
        <Button ml={2} onClick={resetFilters}>
          Reset filters
        </Button>
      )}
      {showFilters && (
        <Box py={1}>
          <Card variant="outlined">
            <CardHeader
              titleTypographyProps={{variant: "h6"}}
              title="Filter options"
            />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item container spacing={4}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <TextField
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                      label="Name"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Dropdown
                      id="category"
                      value={filterCategories}
                      onChange={(e) => setFilterCategories(e.target.value)}
                      label="Categories"
                      options={categoryOptions}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Range
                    label="Calories"
                    value={filterCalories}
                    setter={setFilterCalories}
                    field="calories"
                    valueLabelFormatter={(v) => `${v} calories`}
                    max={maxCalories}
                    min={minCalories}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Range
                    label="Fat"
                    value={filterFat}
                    setter={setFilterFat}
                    field="fat"
                    valueLabelFormatter={(v) => `${v} fat`}
                    max={maxFat}
                    min={minFat}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Range
                    label="Carbs"
                    value={filterCarbs}
                    setter={setFilterCarbs}
                    field="carbs"
                    valueLabelFormatter={(v) => `${v} carbs`}
                    max={maxCarbs}
                    min={minCarbs}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Range
                    label="Protein"
                    value={filterProtein}
                    setter={setFilterProtein}
                    field="protein"
                    valueLabelFormatter={(v) => `${v} protein`}
                    max={maxProtein}
                    min={minProtein}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={resetFilters} size="small">
                Reset
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
      <Table
        data={data}
        formatHeaderCells={(cell) => cell.label}
        headerCellOptions={(cell) => ({
          align: cell.numeric ? "right" : undefined
        })}
        formatDataCells={(cell) => {
          if (typeof cell === "object") {
            return <Chip className={classes[cell.class]} label={cell.name} />;
          }
          return cell;
        }}
        dataCellOptions={(cell) => {
          return {
            align: typeof cell === "number" ? "right" : undefined
          };
        }}
      />
    </Box>
    </Card>

    </Container>
    </Page>
  );
}