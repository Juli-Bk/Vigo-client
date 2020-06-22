import { combineReducers } from 'redux';
import currentPage from './paginationReducer';
import token from './tokenReducer';
import productsPerPage from './productsPerPageReducer';
import sortingOption from './sortReducer';
import priceRange from './priceRangeReducer';
import view from './viewAsReducer';
import categories from './categoriesReducer';
import isMenuOpen from './menuReducer';
import isSearchBarOpen from './searchBarreducer';
import size from './currentSizeReducer';
import quantity from './quantityReducer';
import wishList from './wishListReducer';
import user from './userReducer';
import colors from './colorReducer';
import isLoginModalOpen from './isLoginModalOpenReducer';
import isPersDetailsModalOpen from './isPersDetailsModalOpenReducer';
import shoppingCart from './shoppingCartReducer';
import categoryId from './categoryIdReducer';
import guestData from './guestReducer';
import isModalSizeOpen from './modalSizeReducer';
import productsByFilters from './productsByFiltersReducer';

export const rootReducer = combineReducers({
  currentPage,
  sortingOption,
  priceRange,
  productsPerPage,
  view,
  token,
  categories,
  isMenuOpen,
  size,
  quantity,
  isSearchBarOpen,
  wishList,
  user,
  colors,
  categoryId,
  isLoginModalOpen,
  isPersDetailsModalOpen,
  shoppingCart,
  guestData,
  isModalSizeOpen,
  productsByFilters
});
