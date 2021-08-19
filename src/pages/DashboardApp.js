// material
import { Box, Grid, Container, Typography, Avatar, Stack } from '@material-ui/core';
import { Contacts } from '@material-ui/icons';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppClientInfo,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
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
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
