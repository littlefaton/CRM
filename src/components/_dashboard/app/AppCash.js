import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, Button, Stack, Typography } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
//mocks
import chartData from 'src/_mocks_/AppCash.json';
//react-router
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 247;
const LEGEND_HEIGHT = 47;

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
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------
// {chartData.map((array) => (
//   [{hkd}, {usd}, {others}]
// ))}

const CHART_DATA = [347138, 974792, 47192];

export default function AppCash() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.warning.main,
    ],
    labels: ['HKD', 'USD', 'Others'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
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
    <Card>
      <Stack paddingTop={2} direction="row" spacing={2}>
        <Typography variant="h5" align="left" paddingLeft={2}>Cash</Typography>
        <Button 
        component={Link} 
        to={`/dashboard/cash`} 
        color="info" 
        endIcon={<ArrowRightIcon />}>
        View More
        </Button>
      </Stack>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={220}/>
      </ChartWrapperStyle>
    </Card>
  );
}

console.log(chartData);
