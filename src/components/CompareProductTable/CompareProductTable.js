import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState/EmptyState';
import {Box, ThemeProvider, TableContainer} from '@material-ui/core';
import {theme} from '../WishListView/WishListViewTheme';
import useStyles from '../CompareProductTable/CompareListViewStyles';
import CompareListMobileView from './CompareListMobileView';
import CompareListDesktopView from './CompareListDesktopView';
import globalConfig from '../../globalConfig';
import { setStorageData, updateCompareList } from '../../helpers/helpers';

const CompareProductTable = (props) => {
  const {isMobile, products} = props;
  const classes = useStyles();

  const deleteFromCompareList = (id) => {
    setStorageData('compareList', updateCompareList(id));
  };

  const rows = products.data && products.data.map(product => {
    return {
      imgUrl: product.imageUrls[0],
      name: product.name,
      productCode: product.productId,
      price: product.price,
      id: product._id,
      salePrice: product.salePrice,
      brand: product.brand,
      isOnSale: product.isOnSale,
      description: product.description
    };
  });
  console.log(rows);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Box}>
        {products.data && products.data.length
          ? isMobile
            ? <CompareListMobileView
              classes={classes}
              productsLenght={products.length}
              rows={rows}
              deleteFromComparehList={deleteFromCompareList}
            />
            : <CompareListDesktopView
              classes={classes}
              rows={rows}
              deleteFromCompareList={deleteFromCompareList}
            />
          : <EmptyState text={globalConfig.compareMessages.EMPTY}/>}
      </TableContainer>
    </ThemeProvider>
  );
};

CompareProductTable.propTypes = {
  products: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    products: store.products
  };
};

export default React.memo(connect(mapStateToProps)(CompareProductTable));