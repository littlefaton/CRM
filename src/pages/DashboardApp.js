import React from 'react';
// material
import { Grid, Container, Typography, Avatar, Stack, outlinedInputClasses } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GetAppIcon from '@material-ui/icons/GetApp';
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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.info.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: theme.palette.info,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
    color: theme.palette.info.contrastText,
    backgroundColor: theme.palette.info.main,
    height: 30,
    borderRadius: 25,
    boxShadow: '0 3px 5px 0px lightGrey',

    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },

}));

export default function DashboardApp() {

  const classes = useStyles();
  const [risk, setRisk] = React.useState('');
  const [suit, setSuit] = React.useState('');

  const handleChange = (event) => {
    setRisk(event.target.value);
  };

  const handleChangeSuit = (event) => {
    setSuit(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <Page title="Overview">
      <Container maxWidth="xl">
        {USERINFO.map(props => {
          return (
          <Stack direction="row" spacing={2}>
            <Avatar alt={props.name} src={props.avatarUrl} />
            <Typography variant="h4">{props.name}</Typography>
          </Stack>        
          );
        })}
    <Stack direction="row" spacing={2} sx={{ pb: 1 }} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={2} sx={{ pb: 1 }} alignItems='center'>

        <FormControl className={classes.formControl} color='info'>
        <FormHelperText>Profile Risk</FormHelperText>
          <Select
            value={risk}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Profile Risk
            </MenuItem>
            <MenuItem  value={10}>High</MenuItem>
            <MenuItem  value={20}>Middle</MenuItem>
            <MenuItem  value={30}>Low</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl} color='info'>
        <FormHelperText>Product Suitability</FormHelperText>
          <Select
            value={suit}
            onChange={handleChangeSuit}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
            Product Suitability
            </MenuItem>
            <MenuItem  value={10}>Secure</MenuItem>
            <MenuItem  value={20}>Cautious</MenuItem>
            <MenuItem  value={30}>Balanced</MenuItem>
            <MenuItem  value={40}>Adventurus</MenuItem>
          </Select>
        </FormControl>


      </Stack>

      <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="info"
              onClick={handleClick}
            >
              Download E-Statment
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <GetAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Apr 20 Monthly Stmt" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <GetAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Investment Advice" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <GetAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="24-Apr 20 Daily Stmt" />
              </StyledMenuItem>
            </StyledMenu>

            </Stack>

      
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
