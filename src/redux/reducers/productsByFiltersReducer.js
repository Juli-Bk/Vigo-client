import Actions from '../constants/constants';

const reducer = (state = {}, action) => {
  if (action.type === Actions.GET_PRODUCTS_BY_FILTERS) {
    return {data: action.products, totalCount: action.totalCount};
  }
  return state;
};

export default reducer;