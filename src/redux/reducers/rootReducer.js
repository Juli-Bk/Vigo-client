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
import isAddressModalOpen from './isAddressModalOpenReducer';
import isPersDetailsModalOpen from './isPersDetailsModalOpenReducer';
import isLoading from './isLoadingReducer';
import shoppingCart from './shoppingCartReducer';
import categoryId from './categoryIdReducer';
import guestData from './guestReducer';
import isPopoverOpen from './isPopoverOpenReducer';

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
  isAddressModalOpen,
  isLoading,
  isPopoverOpen
});
