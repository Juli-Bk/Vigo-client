import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import CompareProductTable from '../../components/CompareProductTable/CompareProductTable';
import { getProductsByFilters } from '../../redux/actions/products';
import { useMediaQuery } from '@material-ui/core';
import { isIdInArray, setStorageData } from '../../helpers/helpers';
import { changeCompareList } from '../../redux/actions/actions';

const ProductCompare = (props) => {
  const {getProductsByFilters, compareList, products} = props;
  const isMobile = useMediaQuery('(max-width: 550px)');
  let rightId = true;
  if (compareList.length === 1) {
    rightId = isIdInArray(products.data, compareList[0]);
  }

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const filterArray = (compareList.length && [{_id: compareList}]) || [];
      if (filterArray.length) getProductsByFilters(filterArray, 1, 15, '');
      if (!rightId) {
        setStorageData('compareList', []);
        changeCompareList();
        getProductsByFilters(filterArray, 1, 15, '');
      }
    }
    return () => {
      isCanceled = true;
    };
  }, [compareList, getProductsByFilters, rightId]);
  return (
    <CompareProductTable isMobile={isMobile} compareList={compareList}/>
  );
};

const mapStateToProps = store => {
  return {
    compareList: store.compareList,
    products: store.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    }
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ProductCompare));