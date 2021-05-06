import React, { useState } from "react";
import {
  makeStyles,
  ListItem,
  ListItemText,
  Collapse,
  List,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .borderBox": {
      width: "4px",
      height: "48px",
      backgroundColor: "#999",
      // position: 'absolute',
      left: 0,
      top: 0,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collapseContainer: {
    backgroundColor: theme.palette.grey["100"],
  },

  mkBackground: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.secondary.opacity8,
      borderColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  kitchenBackground: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.primary.opacity8,
      borderColor: theme.palette.primary.main,
      color: "#fff",
    },
  },
  primaryTitle: {
    color: theme.palette.grey["A999"],
  },
  mkFontColor: {
    color: theme.palette.secondary.main,
  },
  kitchenFontColor: {
    color: theme.palette.primary.main,
  },
  selectedText: {
    fontWeight: 500,
  },
  notSelectedText: {
    fontWeight: 300,
    color: theme.palette.grey["A999"],
  },
  listGutter: {
    borderLeft: "4px solid #999",
  },
}));

const SidbarNavigation = ({ menuList }) => {
  const classes = useStyles();
  const [openState, setOpenState] = useState(
    menuList.map((d, idx) => (idx === 0 ? true : false))
  );

  let location = useLocation();

  const history = useHistory();

  const handleExpansionClick = (idx, target) => {
    const newOpenState = [...openState];
    newOpenState[idx] = !newOpenState[idx];
    setOpenState(newOpenState);
    if (target.subList.length === 0) {
      history.push(target.link);
    }
  };

  const handleSubMenuClick = (target) => {
    history.push(target.link);
  };

  return menuList.map((item, idx) => (
    <div key={item.link}>
      <ListItem
        button
        onClick={() => handleExpansionClick(idx, item)}
        to={item.link}
        selected={location.pathname.startsWith(item.link)}
        classes={{
          root: classes.root,
          selected: location.pathname.startsWith("/mk")
            ? classes.mkBackground
            : classes.kitchenBackground,
          gutters: classes.listGutter,
        }}
      >
        <ListItemText
          primary={item.displayValue}
          classes={{
            primary: location.pathname.startsWith(item.link)
              ? ""
              : classes.primaryTitle,
          }}
        />
        {item.subList.length > 0 && (
          <>{openState[idx] ? <ExpandLess /> : <ExpandMore />}</>
        )}
      </ListItem>
      {item.subList.length > 0 && (
        <Collapse
          in={openState[idx]}
          timeout="auto"
          unmountOnExit
          classes={{ container: classes.collapseContainer }}
        >
          <List component="div" disablePadding>
            {item.subList.map((subItem) => (
              <ListItem
                button
                className={classes.nested}
                key={subItem.link}
                to={subItem.link}
                onClick={() => handleSubMenuClick(subItem)}
                selected={location.pathname.startsWith(subItem.link)}
                classes={{
                  root: classes.root,
                  selected: location.pathname.startsWith("/mk")
                    ? classes.mkFontColor
                    : classes.kitchenFontColor,
                }}
              >
                <ListItemText
                  primary={subItem.displayValue}
                  classes={{
                    primary: location.pathname.startsWith(subItem.link)
                      ? classes.selectedText
                      : classes.notSelectedText,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  ));
};

export default SidbarNavigation;
