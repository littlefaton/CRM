import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { menu } from "./menu";
import { hasChildren } from "./utils";

export default function App() {
  return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  return (
    <ListItem button>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};


// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// // material
// import { alpha, useTheme, styled } from '@material-ui/core/styles';
// import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@material-ui/core';

// // ----------------------------------------------------------------------

// const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
//   ({ theme }) => ({
//     ...theme.typography.body2,
//     height: 48,
//     position: 'relative',
//     textTransform: 'capitalize',
//     paddingLeft: theme.spacing(5),
//     paddingRight: theme.spacing(2.5),
//     color: theme.palette.text.secondary,
//     '&:before': {
//       top: 0,
//       right: 0,
//       width: 3,
//       bottom: 0,
//       content: "''",
//       display: 'none',
//       position: 'absolute',
//       borderTopLeftRadius: 4,
//       borderBottomLeftRadius: 4,
//       backgroundColor: theme.palette.primary.main
//     }
//   })
// );

// const ListItemIconStyle = styled(ListItemIcon)({
//   width: 22,
//   height: 22,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// });

// // ----------------------------------------------------------------------

// NavItem.propTypes = {
//   item: PropTypes.object,
//   active: PropTypes.func
// };

// function NavItem({ item, active }) {
//   const theme = useTheme();
//   const isActiveRoot = active(item.path);
//   const { title, path, icon, info, children } = item;
//   const [open, setOpen] = useState(isActiveRoot);

//   const handleOpen = () => {
//     setOpen((prev) => !prev);
//   };

//   const activeRootStyle = {
//     color: 'primary.main',
//     fontWeight: 'fontWeightMedium',
//     bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
//     '&:before': { display: 'block' }
//   };

//   const activeSubStyle = {
//     color: 'text.primary',
//     fontWeight: 'fontWeightMedium'
//   };

//   if (children) {
//     return (
//       <>
//         <ListItemStyle
//           onClick={handleOpen}
//           sx={{
//             ...(isActiveRoot && activeRootStyle)
//           }}
//         >
//           <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
//           <ListItemText disableTypography primary={title} />
//           {info && info}
//           <Box
//             component={Icon}
//             icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
//             sx={{ width: 16, height: 16, ml: 1 }}
//           />
//         </ListItemStyle>

//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {children.map((item) => {
//               const { title, path } = item;
//               const isActiveSub = active(path);

//               return (
//                 <ListItemStyle
//                   key={title}
//                   component={RouterLink}
//                   to={path}
//                   sx={{
//                     ...(isActiveSub && activeSubStyle)
//                   }}
//                 >
//                   <ListItemIconStyle>
//                     <Box
//                       component="span"
//                       sx={{
//                         width: 4,
//                         height: 4,
//                         display: 'flex',
//                         borderRadius: '50%',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         bgcolor: 'text.disabled',
//                         transition: (theme) => theme.transitions.create('transform'),
//                         ...(isActiveSub && {
//                           transform: 'scale(2)',
//                           bgcolor: 'primary.main'
//                         })
//                       }}
//                     />
//                   </ListItemIconStyle>
//                   <ListItemText disableTypography primary={title} />
//                 </ListItemStyle>
//               );
//             })}
//           </List>
//         </Collapse>
//       </>
//     );
//   }

//   return (
//     <ListItemStyle
//       component={RouterLink}
//       to={path}
//       sx={{
//         ...(isActiveRoot && activeRootStyle)
//       }}
//     >
//       <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
//       <ListItemText disableTypography primary={title} />
//       {info && info}
//     </ListItemStyle>
//   );
// }

// NavSection.propTypes = {
//   navConfig: PropTypes.array
// };

// export default function NavSection({ navConfig, ...other }) {
//   const { pathname } = useLocation();
//   const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

//   return (
//     <Box {...other}>
//       <List disablePadding>
//         {navConfig.map((item) => (
//           <NavItem key={item.title} item={item} active={match} />
//         ))}
//       </List>
//     </Box>
//   );
// }
