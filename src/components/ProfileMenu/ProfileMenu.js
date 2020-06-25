import React from 'react';
import {connect} from 'react-redux';
import { Box, Typography, Menu, MenuItem, Avatar, makeStyles, useMediaQuery } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {colors} from '../../styles/colorKit';
import { logout } from '../../redux/actions/user';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 150
    }
  },
  avatarBtn: {
    cursor: 'pointer'
  },
  link: {
    color: 'inherit'
  },
  menu: {
    boxShadow: 'none'
  },
  menuItem: {
    '&:hover': {
      color: colors.noticeColor
    }
  }
}));

const ProfileMenu = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 723px)');
  const {user, logout} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logout();
    handleClose();
  };

  return (
    <Box className={classes.container}>
      <Avatar
        className={classes.avatarBtn}
        aria-controls='profile-menu'
        aria-haspopup='true'
        onClick={handleClick}/>
      {!isMobile
        ? <Typography variant='caption'>
          {user.firstName} {user.lastName}
        </Typography>
        : null}
      <Menu
        className={classes.menu}
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItem}>
          <Link to='/account' className={classes.link}>My account</Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

const mapStateToProps = store => {
  return {user: store.user};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ProfileMenu));