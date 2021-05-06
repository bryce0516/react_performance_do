import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  useScrollTrigger,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth } from "./Layout";
import { useLocation } from "react-router-dom";
import { traverseByLink } from "./SidebarNavigationConst";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  colorDefault: {
    backgroundColor: "#f5f5f5",
  },
  h4: {
    color: "#1e1e1e",
    fontWeight: "700",
  },
  gutters: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Appbar({ handleDrawerToggle }) {
  const classes = useStyles();

  const location = useLocation();

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="fixed"
          color="default"
          className={classes.appBar}
          classes={{ colorDefault: classes.colorDefault }}
        >
          <Toolbar classes={{ gutters: classes.gutters }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h4" noWrap classes={{ h4: classes.h4 }}>
              {traverseByLink(location.pathname)}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}
