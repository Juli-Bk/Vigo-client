import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardActions } from '@material-ui/core';
import ButtonAddToCart from './ButtonAddToCart/AddToCartButton';
import FavoriteIcon from './FavoriteIcon/FavoriteIcon';
import ButtonCompare from './ButtonCompare/ButtonCompare';
import globalConfig from '../../../globalConfig';
import { getStorageData, toggleWishItems } from '../../../helpers/helpers';
import { addToCart } from '../../../pages/ShoppingCart/cartHelpers';
import {
  changeShoppingCart,
  changeWishList,
  setCurrentProduct,
  toggleModalSize
} from '../../../redux/actions/actions';

const ActionButtons = (props) => {
  const {
    classes, product, width, disabledSpacing,
    isProductPage, changeWishList, changeShoppingCart,
    sizeId, quantity, toggleModalSize, setDisplayHelper, isModal, setCurrentProduct
  } = props;

  const addToShopCart = (productId, quantity, sizeId) => {
    setCurrentProduct(product);
    if (isProductPage && !sizeId) {
      setDisplayHelper(true);
    }
    if (!sizeId) {
      toggleModalSize(true);
    } else {
      addToCart(productId, quantity, sizeId);
      changeShoppingCart(getStorageData('shoppingCart'));
      toggleModalSize(false);
    }
  };

  const addToCompare = (productId) => {
    console.log(`product with id ${productId} added to compare`);
  };

  const toggleWishList = (productId) => {
    toggleWishItems(productId);
    changeWishList(getStorageData('wishList'));
  };

  const defineLabel = (width, isProductPage, label) => {
    return isProductPage ? label
      : ((width === 'lg' || width === 'xl') ? label : null);
  };

  return (
    <CardActions disableSpacing={disabledSpacing}>
      <ButtonAddToCart classes={classes.button}
        id={product._id}
        addToCart={addToShopCart}
        quantity={quantity}
        product={product}
        sizeId={sizeId}/>
      {!isModal
        ? <>
          <FavoriteIcon classes={classes}
            id={product._id}
            addToWishList={toggleWishList}
            label={defineLabel(width, isProductPage, globalConfig.iconsLabels.ADD_TO_WISHLIST)}/>
          <ButtonCompare classes={classes}
            id={product._id}
            addToCompare={addToCompare}
            label={defineLabel(width, isProductPage, globalConfig.iconsLabels.ADD_TO_COMPARE)}/>
        </>
        : null}
    </CardActions>
  );
};

ActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  labels: PropTypes.object,
  width: PropTypes.string,
  disabledSpacing: PropTypes.bool,
  isProductPage: PropTypes.bool,
  token: PropTypes.string,
  changeWishList: PropTypes.func.isRequired,
  changeShoppingCart: PropTypes.func.isRequired,
  toggleModalSize: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    token: store.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data)),
    changeShoppingCart: data => dispatch(changeShoppingCart(data)),
    toggleModalSize: flag => dispatch(toggleModalSize(flag)),
    setCurrentProduct: product => dispatch(setCurrentProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ActionButtons));