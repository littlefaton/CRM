// material
import { Box, Grid, Container, Typography, Avatar, Stack } from '@material-ui/core';
import { Contacts } from '@material-ui/icons';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppFinancialInfo,
  AppCashMove,
  AppCash,
  AppClientInfo,
  AppHolding,
  AppOrder,
  AppTrade,
  AppCredit,
  AppStock,
  AppIPO,
} from '../components/_dashboard/app';

import USERINFO from '../_mocks_/userInfo.json';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Overview">
      <Container maxWidth="xl">
      {USERINFO.map(props => {
        return (
        <Stack direction="row" spacing={2} sx={{ pb: 5 }}>
          <Avatar alt={props.name} src={props.avatarUrl} />
          <Typography variant="h4">{props.name}</Typography>
        </Stack>
        );
      })}
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={3}>
            <AppClientInfo />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppFinancialInfo />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppCash />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppCashMove />
          </Grid>

          <Grid item  sx={12} md={6} lg={4.5} >
            <AppOrder />
          </Grid>

          <Grid item sx={12} md={6} lg={4.5}>
            <AppTrade />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <AppHolding />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppCredit />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppStock />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppIPO />
          </Grid>
          

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
