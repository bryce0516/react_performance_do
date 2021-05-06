import React, { useContext } from "react";
import {
  makeStyles,
  useTheme,
  Divider,
  List,
  Hidden,
  Drawer,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { useCookies } from "react-cookie";

import { drawerWidth } from "./Layout";
import SidebarTopLogo from "../assets/images/sidebar_top_logo.png";
import MKAvatar from "../assets/images/mk_avatar.png";
import KitchenAvatar from "../assets/images/kitchen_avatar.png";
import { UserContext } from "../context/user-context";
import SidebarNavigation from "./SidebarNavigation";
import { MKSidebarList, KitchenSidebarList } from "./SidebarNavigationConst";
import { useHistory } from "react-router-dom";
import api from "../api/axios.utils";

const useStyles = makeStyles((theme) => ({
  weightLight: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.06,
    letterSpacing: "normal",
  },
  weightBold: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.06,
    letterSpacing: "normal",
  },
  sidebarTopSection: {
    cursor: "pointer",
    padding: "30px 15px 45px",
    "& img": {
      width: "61px",
    },
    display: "flex",
    alignItems: "center",
  },
  sidebarTopBrandText: {
    paddingLeft: "10px",
    textAlign: "center",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  sidebarStickBottom: {
    flex: "0 0 135px",
    backgroundColor: theme.palette.grey["100"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey["A222"],
    flexDirection: "column",
  },
  mkAdmin: {
    color: theme.palette.secondary["main"],
  },
  kitchenAdmin: {
    color: theme.palette.primary["main"],
  },
  bottomCenterContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  upper: {
    display: "flex",
  },
  userInfo: { maxWidth: "100px" },
  avatarImg: {
    display: "flex",
    paddingLeft: theme.spacing(2),
    alignItems: "flex-start",
  },
  user_id: { fontSize: "10px" },
  bottomBtnContainer: {
    paddingTop: theme.spacing(2),
    alignSelf: "flex-start",
  },
  resetPaddings: { padding: "0" },
}));

export default function Sidebar(props) {
  const { window, mobileOpen, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();

  const userContext = useContext(UserContext);
  const history = useHistory();

  const handleLogout = async () => {
    userContext.signOut();
    history.push("/login");
    let result = await api.get("/monthly/cms/logout", {});
  };

  const handleLogoClick = () => {
    history.push("/login");
  };

  const drawer = (
    <div className={classes.spaceBetween}>
      <div className={classes.sidebarStickTop}>
        <div className={classes.toolbar}>
          <div className={classes.sidebarTopSection} onClick={handleLogoClick}>
            <img src={SidebarTopLogo} />
            <div className={classes.sidebarTopBrandText}>
              <Typography
                variant="subtitle1"
                noWrap
                classes={{ subtitle1: classes.weightLight }}
              >
                MONTHLY
              </Typography>
              <Typography
                variant="subtitle1"
                noWrap
                classes={{ subtitle1: classes.weightBold }}
              >
                KITCHEN
              </Typography>
            </div>
          </div>
        </div>
        <Divider />
        <List disablePadding={true}>
          {userContext.user.admin_type === "AD_001" ? (
            <SidebarNavigation menuList={MKSidebarList} />
          ) : (
            <SidebarNavigation menuList={KitchenSidebarList} />
          )}
        </List>
        <Divider />
      </div>
      <div className={classes.sidebarStickBottom}>
        <div className={classes.bottomCenterContainer}>
          <div className={classes.upper}>
            <div className={classes.userInfo}>
              <Typography
                variant="subtitle2"
                classes={{
                  subtitle2:
                    userContext.user.admin_type === "AD_001"
                      ? classes.mkAdmin
                      : classes.kitchenAdmin,
                }}
              >
                <Box fontWeight={500}>
                  {userContext.user.kitchen_nm || "MK관리자"}
                </Box>
              </Typography>
              <Typography
                variant="subtitle2"
                classes={{
                  subtitle2: classes.user_name,
                }}
              >
                <Box component="span" fontWeight={500}>
                  {userContext.user.admin_nm}
                </Box>
                <Box component="span" fontWeight={300}>
                  님
                </Box>
              </Typography>
              <Typography
                variant="caption"
                classes={{
                  caption: classes.user_id,
                }}
                noWrap={true}
                component="div"
              >
                <Box fontWeight={300}>
                  {userContext.user.kitchen_id || userContext.user.admin_id}
                </Box>
              </Typography>
            </div>
            <div className={classes.avatarImg}>
              <img
                src={
                  userContext.user.admin_type === "AD_001"
                    ? MKAvatar
                    : KitchenAvatar
                }
                alt=""
              />
            </div>
          </div>
          <div className={classes.bottomBtnContainer}>
            <Button
              size="small"
              color={
                userContext.user.admin_type === "AD_001"
                  ? "secondary"
                  : "primary"
              }
              style={{ minWidth: "49px" }}
              classes={{ textSizeSmall: classes.resetPaddings }}
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefiend;

  return (
    <nav className={classes.drawer} aria-label="folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
