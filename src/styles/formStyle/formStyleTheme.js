import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../fonts/fontsKit';

const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          textTransform: 'capitalize'
        }
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1rem',
        '@media  (max-width: 400px)': {
          fontSize: '0.7rem'
        }
      }
    },
    MuiFormGroup: {
      root: {
        padding: 10
      }
    },
    MuiOutlinedInput: {
      root: {
        Mui: {
          error: {
            color: colors.noticeColor,
            borderColor: 'colors.noticeColor !important'
          }
        }
      }
    },
    MuiFormLabel: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        },
        fontSize: 11,
        '@media  (min-width: 320px)': {
          fontSize: 9
        },
        '@media  (max-width: 375px)': {
          fontSize: 5
        }
      }
    },
    MuiButton: {
      outlinedPrimary: {
        border: 'none',
        padding: 0,
        '&:hover': {
          border: 'none'
        }
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
    }
  }
});

export default theme;