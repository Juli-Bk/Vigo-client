import {createMuiTheme} from '@material-ui/core';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      outlinedPrimary: {
        border: 'none',
        padding: 0,
        '&:hover': {
          border: 'none'
        }
      },
      root: {
        color: colors.fontOncard,
        backgroundColor: colors.fontSixth
      }
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: colors.fontFourth
      }
    },
    MuiTab: {
      wrapper: {
        fontFamily: fonts.f2,
        fontSize: '1.5rem',
        '&:hover': {
          color: colors.noticeColor
        }
      }
    },
    MuiDialogActions: {
      root: {
        display: 'contents'
      }
    },
    MuiGrid: {
      root: {
        maxWidth: '100%',
        flexBasis: '100%'
      }
    }
  }
});

export default theme;