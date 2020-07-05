import React, { useEffect} from 'react';
import { Container, Typography, Grid, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getProductsByFilters } from '../../../redux/actions/products';
import { getProductsId } from '../../../pages/ShoppingCart/cartHelpers';
import { getProductsQuantity } from '../../../redux/actions/quantity';
import { getProductData, renderGuestAddress, renderUserAddress} from '../helper';
import ClientPersData from './ClientPersData';
import ProductsTableDesktop from './ProductsTableDesktop';
import { getStorageData } from '../../../helpers/helpers';
import useStyles from './OrderSummaryStyles';
import ProductsTableMobile from './ProductsTableMobile';

const OrderSummary = (props) => {
  const classes = useStyles();
  const {
    user, totalSum, shoppingCart, getProductsByFilters,
    guestData, products, productsQuantity, getProductsQuantity
  } = props;
  const isMobile = useMediaQuery('(max-width: 550px)');

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const productsId = getProductsId(shoppingCart);
      getProductsByFilters([{_id: productsId}], 1, 15, '');
      getProductsQuantity(productsId);
    }
    return () => {
      isCanceled = true;
    };
  }, [getProductsByFilters, getProductsQuantity, shoppingCart]);

  const productsData = getProductData(products, shoppingCart, productsQuantity);
  const guestInfo = guestData || getStorageData('guestData');
  const total = totalSum || getStorageData('totalSum');

  return (
    <Container>
      <Grid container>
        <Grid item container xs={12}>
          {productsData
            ? isMobile ? <ProductsTableMobile productsData={productsData}/>
              : <ProductsTableDesktop productsData={productsData}/>
            : null
          }
        </Grid>
        <Grid item xs={12} className={classes.total}>
          <Typography className={classes.totalTitle}>Total sum:
            <span className={classes.totalPrice}> ${total}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.data}>
          <Typography className={classes.title}>Personal Data: </Typography>
          {user && Object.keys(user).length > 0 ? <ClientPersData classes={classes} client={user}/>
            : Object.keys(guestInfo).length > 0 ? <ClientPersData classes={classes} client={guestData}/> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title}>Delivery Address: </Typography>
          {user && Object.keys(user).length > 0 ? renderUserAddress(user, classes)
            : guestInfo && Object.keys(guestInfo).length > 0 ? renderGuestAddress(guestData, classes) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

OrderSummary.propTypes = {
  user: PropTypes.object,
  guestData: PropTypes.object,
  totalSum: PropTypes.number.isRequired,
  shoppingCart: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  productsQuantity: PropTypes.array.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user,
    guestData: store.guestData,
    totalSum: store.totalSum,
    shoppingCart: store.shoppingCart,
    products: store.products,
    productsQuantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    },
    getProductsQuantity: idArray => dispatch(getProductsQuantity(idArray))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderSummary));