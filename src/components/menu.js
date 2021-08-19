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
    items: [],
    to: "/dashboard/user"
  },
  {
    icon: <DashboardIcon />,
    title: "Overview",
    items: [],
    to: "/app"
  },
  {
    icon: <AssignmentIndIcon />,
    title: "Profile",
    items: [
        {
            title: "Customer Info",
            to: "/dashboard",
        },
        {
            title: "Customer Finanacial Info",
            to: "/dashboard",
        },
        {
            title: "CPRQ",
            to: "/dashboard",
        },
        {
            title: "Tax Info",
            to: "/dashboard",
        },
    ]
  },
  {
    icon: <AttachMoneyIcon />,
    title: "Portfolio",
    items: [
        {
            title: "Cash",
            to: "/dashboard",
        },
        {
            title: "Customer Holding",
            to: "/dashboard",
        },
    ]
  },
  {
    icon: <SyncAltIcon />,
    title: "Cash Movement",
    items: [
        {
            title: "Deposit & Withdraw",
            to: "/dashboard",
        },
    ]
  },
  {
    icon: <ShowChartIcon />,
    title: "Stock Movement",
    items: [
        {
            title: "Trade",
            to: "/dashboard",
        },
        {
            title: "IPO Application",
            to: "/dashboard",
        },
        {
            title: "Stock Transfer",
            to: "/dashboard",
        },
    ]
  },
  {
    icon: <CreditCardIcon />,
    title: "Credit Control",
    items: [
        {
            title: "Credit Limit Application",
            to: "/dashboard",
        },
    ]
  },
  {
    icon: <HelpIcon />,
    title: "Customer Enquiry",
    items: [
        {
            title: "System Message",
            to: "/dashboard",
        },
        {
            title: "Order Message",
            to: "/dashboard",
        },
        {
            title: "Inbox Message",
            to: "/dashboard",
        },
    ]
  },
  {
    icon: <HistoryIcon />,
    title: "Logon Record",
    items: [],
    to: "test"
  },

 ];