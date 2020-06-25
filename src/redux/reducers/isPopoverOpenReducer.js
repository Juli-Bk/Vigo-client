import Actions from '../constants/constants';
const initialState = {
  isOpen: false
};
const reducer = (state = initialState, action) => {
  if (action.type === Actions.SET_POPOVER_OPEN) {
    return {isOpen: action.isOpen};
  }
  return state;
};

export default reducer;