import {createMuiTheme} from '@material-ui/core';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const theme = createMuiTheme({
  overrides: {
    Component: {
      root: {
        backgroundColor: 'none',
        color: colors.fontThird,
        '&:hover > $content': {
          backgroundColor: 'none'
        }
      }
    },
    MuiTreeItem: {
      label: {
        margin: '10px 0',
        '&:hover': {
          backgroundColor: 'none !important'
        }
      }
    },
    MuiTypography: {
      body1: {
        fontFamily: fonts.f2,
        fontSize: 'inherit'
      }
    },
    MuiCollapse: {
      entered: {
        wrapperInner: {
          maxHeight: 500,
          display: 'flex !important',
          flexDirection: 'column',
          flexWrap: 'wrap'
        }
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '1.1rem'
      }
    }
  }
});

export default theme;