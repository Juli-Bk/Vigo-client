import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Box, ThemeProvider, TableContainer} from '@material-ui/core';

import {toggleWishItems} from '../../helpers/helpers';
import {changeWishList} from '../../redux/actions/wishlist';
import {theme} from './WishListViewTheme';
import useStyles from './WishListViewStyles';
import WishListMobileView from './WishListMobileView';
import WishlistDesktopView from './WishListDesktopView';

const WishListView = (props) => {
  const {isMobile, products, wishList, changeWishList} = props;
  const classes = useStyles();

  const deleteFromWishList = (id) => {
    toggleWishItems(id);
    changeWishList();
  };

  const rows = products.map(product => {
    return {
      imgUrl: product.imageUrls[0],
      mainData: {name: product.name, color: product.color, size: product.size},
      productCode: product.productId,
      price: product.price,
      id: product._id,
      salePrice: product.salePrice,
      isOnSale: product.isOnSale
    };
  });

  return (
    <ThemeProvider theme={theme}>
      {wishList.length && products.length &&
                <TableContainer component={Box}>
                  { isMobile
                    ? <WishListMobileView
                      classes={classes}
                      productsLenght={products.length}
                      rows={rows}
                      deleteFromWishList={deleteFromWishList}
                    />
                    : <WishlistDesktopView
                      classes={classes}
                      rows={rows}
                      deleteFromWishList={deleteFromWishList}
                    /> }
                </TableContainer>
      }
    </ThemeProvider>
  );
};

WishListView.propTypes = {
  products: PropTypes.array.isRequired,
  wishlist: PropTypes.array,
  changeWishList: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    wishList: store.wishList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: () => dispatch(changeWishList())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(WishListView));