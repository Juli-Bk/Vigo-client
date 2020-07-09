import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { getUserOrders } from '../../../redux/actions/orders';
import { Link } from 'react-router-dom';
import { colors } from '../../../styles/colorKit';
import EmptyState from '../../EmptyState/EmptyState';
import OrderListDesktopView from './OrderListDesktopView';
import OrderListMobileView from './OrderListMobileView';

const OrdersList = (props) => {
  const {user, userOrders, getUserOrders} = props;
  const isMobile = useMediaQuery('(max-width: 724px)');

  const textWithLink = <span>Your orders list is empty. But you can <Link to='/products'
    style={{textDecoration: 'underline', color: colors.noticeColor}}>
      choose
  </Link> something right now</span>;

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const userId = user._id;
      if (userId) getUserOrders(userId);
    }
    return () => {
      isCanceled = true;
    };
  }, [getUserOrders, user._id]);

  return (<>
    {userOrders && userOrders.length
      ? isMobile ? <OrderListMobileView/>
        : <OrderListDesktopView/>
      : <EmptyState text={textWithLink}/>}
  </>);
};

OrdersList.propTypes = {
  userOrders: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getUserOrders: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    userOrders: store.userOrders,
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserOrders: userId => dispatch(getUserOrders(userId))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrdersList));