import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';

export const getProductsByFilters = (filterArray, startPage, perPage, sort) => dispatch => {
  if (filterArray && filterArray.length) {
    AjaxUtils.Products.getProductsByFilters(filterArray, startPage, perPage, sort)
      .then(result => {
        if (result) {
          dispatch({
            type: Actions.GET_PRODUCTS_BY_FILTERS,
            products: result.products,
            totalCount: result.totalCount
          });
        }
      });
  }
};

export const getMaxPrice = () => dispatch => {
  AjaxUtils.Products.getMaxPrice()
    .then(result => {
      if (result.maxSalePrice) {
        dispatch({type: Actions.GET_MAX_PRICE, payload: result.maxSalePrice});
      }
    });
};

export const addFilters = (filtersObj) => {
  return {
    type: Actions.ADD_FILTERS,
    payload: filtersObj
  };
};