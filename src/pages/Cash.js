import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { makeStyles } from '@material-ui/styles';
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, Grid, Stack, Typography, Container } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// utils
import { fNumber } from '../utils/formatNumber';
//
import { BaseOptionChart } from '../components/charts';
import Page from '../components/Page';
//mocks
import chartData from 'src/_mocks_/AppCash.json';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 67;

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
    //borderTop: `solid 1px ${theme.palette.divider}`,
    //top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    top: `calc(${(CHART_HEIGHT - LEGEND_HEIGHT)/3}px) !important`
  }
}));

// ----------------------------------------------------------------------
// {chartData.map((array) => (
//   [{hkd}, {usd}, {others}]
// ))}

const useStyles = makeStyles({
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

const CHART_DATA = [347138, 974792, 47192];

export default function Cash() {
  const theme = useTheme();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.warning.main,
    ],
    labels: ['HKD', 'USD', 'Others'],
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
    <Page title="Cash">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Cash
          </Typography>
        </Stack>

        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={350}/>
        </ChartWrapperStyle>

<Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <Card className={classes.root} style={{backgroundColor: "lightpink"}}>
      <CardContent>
        <Typography className={classes.title} gutterBottom color="white"> 
          HKD
        </Typography>
        <Typography variant="h3" component="h2" py={3}>
        34,7138
        </Typography>
        <Stack direction="row">
          <ArrowUpwardIcon color="primary" />
        <Typography variant="body2" component="p" color="primary">
          5%
        </Typography>
        </Stack>
      </CardContent>
    </Card>
    </Grid>


    <Grid item xs={12} lg={4}>
        <Card className={classes.root} style={{backgroundColor: "lightskyblue"}}>
      <CardContent>
        <Typography className={classes.title} gutterBottom color="white"> 
          USD
        </Typography>
        <Typography variant="h3" component="h2" py={3}>
        974,792
        </Typography>
        <Stack direction="row">
          <ArrowUpwardIcon color="primary" />
        <Typography variant="body2" component="p" color="primary">
          0.2%
        </Typography>
        </Stack>
      </CardContent>
    </Card>
    </Grid>


    <Grid item xs={12} lg={4}>
        <Card className={classes.root} style={{backgroundColor: "gold"}}>
      <CardContent>
        <Typography className={classes.title} gutterBottom color="white"> 
          Others
        </Typography>
        <Typography variant="h3" component="h2" py={3}>
        47,192
        </Typography>
        <Stack direction="row">
          <ArrowDownwardIcon color="error" />
        <Typography variant="body2" component="p" color="error">
          10%
        </Typography>
        </Stack>
      </CardContent>
    </Card>
    </Grid>

    </Grid>

    </Container>
    </Page>
  );
}