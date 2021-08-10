import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import React from "react";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HelpIcon from '@material-ui/icons/Help';
import HistoryIcon from '@material-ui/icons/History';

export const menu = [
  {
    icon: <ListAltIcon />,
    title: "Customer List",
    items: []
  },
  {
    icon: <DashboardIcon />,
    title: "Overview",
    items: []
  },
  {
    icon: <AssignmentIndIcon />,
    title: "Profile",
    items: [
        {
            title: "Customer Info"
        },
        {
            title: "Customer Finanacial Info"
        },
        {
            title: "CPRQ"
        },
        {
            title: "Tax Info"
        },
    ]
  },
  {
    icon: <AttachMoneyIcon />,
    title: "Portfolio",
    items: [
        {
            title: "Cash"
        },
        {
            title: "Customer Holding"
        },
    ]
  },
  {
    icon: <SyncAltIcon />,
    title: "Cash Movement",
    items: [
        {
            title: "Deposit & Withdraw"
        },
    ]
  },
  {
    icon: <ShowChartIcon />,
    title: "Stock Movement",
    items: [
        {
            title: "Trade"
        },
        {
            title: "IPO Application"
        },
        {
            title: "Stock Transfer"
        },
    ]
  },
  {
    icon: <CreditCardIcon />,
    title: "Credit Control",
    items: [
        {
            title: "Credit Limit Application"
        },
    ]
  },
  {
    icon: <HelpIcon />,
    title: "Customer Enquiry",
    items: [
        {
            title: "System Message"
        },
        {
            title: "Order Message"
        },
        {
            title: "Inbox Message"
        },
    ]
  },
  {
    icon: <HistoryIcon />,
    title: "Logon Record",
    items: []
  },

 ];