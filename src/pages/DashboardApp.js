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

          <Box 
           sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 1,
              gridTemplateRows: "auto",
              gridTemplateAreas: `"order order trade trade holding"
              "credit stock ipo sidebar holding"`
            }}
            container spacing={3}
          >

          <Box item  sx={{gridArea: "order"}} md={6} lg={2} >
            <AppOrder />
          </Box>

          <Box item sx={{gridArea: "trade"}} md={6} lg={2}>
            <AppTrade />
          </Box>

          <Box item xs={{gridArea: "holding"}} md={6} lg={3}>
            <AppHolding />
          </Box>

          <Box item xs={{gridArea: "credit"}} sm={6} md={2.7}>
            <AppCredit />
          </Box>

          <Box item xs={{gridArea: "stock"}} sm={6} md={2.7}>
            <AppStock />
          </Box>

          <Box item xs={{gridArea: "ipo"}} sm={6} md={2.7}>
            <AppIPO />
          </Box>
          
          </Box>

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
