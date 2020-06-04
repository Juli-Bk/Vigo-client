import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import TreeView from '@material-ui/lab/TreeView';
import useStyles from './CategoryTreeStyle';
import StyledTreeItem from '../StyledTreeItem/StyledTreeItem';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const CategoryTree = ({categories}) => {
  const classes = useStyles();

  const getStyledTreeItem = useCallback((category) => {
    let children = [];
    if (category.children.length) {
      children = category.children.map(child => {
        return getStyledTreeItem(child);
      });
    }

    return <StyledTreeItem
      key={`${category.id}`}
      nodeId={`${category.id}`}
      className={classes[category.level.toString()]}
      label={`${category.name}`}
      onLabelClick={(event) => {
        // todo paste here logic for filtering
        console.log('category filter item click', event);
      }}
    >
      {children}
    </StyledTreeItem>;
  },
  [classes]);

  const elementsToExpand = useMemo(() => {
    const arr = categories
      .filter(category => category.level === 1)
      .map(item => item.id.toString());
    arr.push('categoriesRoot');
    return arr;
  }, [categories]);

  const categoriesTree = useMemo(() => categories.map(category => {
    return getStyledTreeItem(category);
  }), [categories, getStyledTreeItem]);

  const tree = elementsToExpand.length > 1
    ? <TreeView
      className={classes.root}
      defaultExpanded={elementsToExpand}
      defaultCollapseIcon={<RemoveIcon className={classes.iconHover}/>}
      defaultExpandIcon={<AddIcon className={classes.iconHover}/>}
    >
      <StyledTreeItem
        key={'categoriesRoot'}
        nodeId={'categoriesRoot'}
        className={classes['0']}
        label={'Categories'}>
        {categoriesTree}
      </StyledTreeItem>

    </TreeView>
    : <></>;

  return (
    tree
  );
};

const mapStoreToProps = store => {
  return {
    categories: store.categories
  };
};

export default connect(mapStoreToProps)(React.memo(CategoryTree));