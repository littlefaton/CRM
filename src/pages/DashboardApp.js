// material
import { Grid, Container, Typography, Avatar, Stack } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
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

        <Grid container wrap="nowrap" spacing={3}>

          <Grid container spacing={3} paddingLeft={9}>

            <Grid container spacing={3} alignItems="flex-end">

              <Grid item  sx={12} md={6} lg={6}>
                <AppOrder />
              </Grid>

              <Grid item sx={12} md={6} lg={6}>
                <AppTrade />
              </Grid>
              
            </Grid> 

            <Grid container spacing={3} alignItems="center">

              <Grid item xs={12} sm={6} md={4}>
                <AppCredit />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppStock />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppIPO />
              </Grid>

            </Grid>

          </Grid>

            <Grid item xs={12} md={6} lg={3.8}>
              <AppHolding />
            </Grid>

          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
